"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { read, utils, writeFileXLSX } from 'xlsx';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";

interface LearningResource {
  topic: string;
  title: string;
  url: string;
}

const Navbar = () => {
  return (
    <nav className="bg-background p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://placehold.co/50" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="font-semibold text-lg">SkillForge</span>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-primary transition duration-200">Home</a>
          <a href="#" className="hover:text-primary transition duration-200">Profile</a>
          <a href="#" className="hover:text-primary transition duration-200">Courses</a>
        </div>
        <div className="flex space-x-4">
          <Button variant="ghost">Profile</Button>
          <Button variant="ghost">Settings</Button>
          <Button variant="outline">Logout</Button>
        </div>
      </div>
    </nav>
  );
};

const LearningComponent: React.FC<{ username: string }> = ({ username }) => {
  const [learningGoal, setLearningGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LearningResource[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Fetch data.csv from the public directory
      const csvData = await fetch('/onlyTitles.csv');
      const fileContent = await csvData.text();

      // Parse CSV content
      const dataWorkbook = read(fileContent, { type: 'string' });
      const dataSheet = dataWorkbook.Sheets[dataWorkbook.SheetNames[0]];
      const dataArray = utils.sheet_to_json<LearningResource>(dataSheet, { header: ['topic', 'title'] });

      // Prepare the prompt for Ollama
      const systemPrompt = "Analyze the provided CSV data to extract only the rows that are most relevant to the user's learning goal. Return the results formatted as 'topic', 'title'. Ensure the rows are in increasing order of skill requirement. Do not include any introductory text, explanations, or additional comments. Provide only the filtered data.";
      const userPrompt = `Learning Goal: ${learningGoal}\n\nCSV Data:\n${dataArray.map(row => `${row.topic},${row.title}`).join('\n')}`;
      console.log(userPrompt);
      console.log(systemPrompt);

      //Send request to Ollama
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: "llama3:8b",
        prompt: `${systemPrompt}\n\nUser: ${userPrompt}`,
        stream: false
      });

      //Parse Ollama's response
      const relevantLines = response.data.response.trim().split('\n');
      const relevantData = relevantLines.map((line: string) => {
        const [topic, title] = line.split(',');
        return { topic, title } as LearningResource;
      });

      //Write to output.csv
      const outputWorkbook = utils.book_new();
      const outputSheet = utils.json_to_sheet(relevantData);
      utils.book_append_sheet(outputWorkbook, outputSheet, "RelevantData");
      writeFileXLSX(outputWorkbook, 'output.csv');

      console.log("Data written to output.csv");
      setResult(relevantData);
    } catch (err) {
      setError("An error occurred while processing your request.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Hey, what do you want to learn?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                placeholder="Enter your learning goal here..."
                className="w-full"
                style={{ color: 'black', backgroundColor: 'white' }}
              />
              <Button
                variant="ghost" 
                type="submit" 
                disabled={isLoading}
                className='w-full bg-white text-black'
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </form>
            {error && (
              <p className="text-red-500 mt-4 text-center">{error}</p>
            )}
            {result && (
              <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Relevant Resources:</h2>
                <ul className="space-y-2">
                  {result.map((item, index) => (
                    <li key={index}>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:underline"
                      >
                        {item.title} <span className="text-gray-500">({item.topic})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LearningComponent;
