"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { read, utils as xlsxUtils, writeFileXLSX } from 'xlsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2, Search, Menu, BookOpen, Rocket, Award, Zap, Brain, Code } from "lucide-react";

interface LearningResource {
  topic: string;
  title: string;
  url: string;
}

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-700"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div 
          className="text-2xl font-bold text-teal-400"
          whileHover={{ scale: 1.05 }}
        >
          SkillForge
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-300 hover:text-white"
        >
          <Menu size={24} />
        </motion.button>
      </div>
    </motion.nav>
  );
};

const NavItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center space-x-1 text-gray-300 hover:text-teal-400 transition-colors duration-200"
  >
    {icon}
    <span className="hidden md:inline">{text}</span>
  </motion.button>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800 p-6 rounded-xl shadow-lg"
  >
    <div className="text-teal-400 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const LearningComponent: React.FC = () => {
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
      const csvData = await fetch('/onlyTitles.csv');
      const fileContent = await csvData.text();
    
      const dataWorkbook = read(fileContent, { type: 'string' });
      const dataSheet = dataWorkbook.Sheets[dataWorkbook.SheetNames[0]];
      const dataArray = xlsxUtils.sheet_to_json<LearningResource>(dataSheet, { header: 1 });
    
      const systemPrompt = "Analyze the provided CSV data to extract only the rows that are most relevant to the user's learning goal. Return the results formatted as 'topic', 'title'. Ensure the rows are in increasing order of skill requirement. Do not include any introductory text, explanations, or additional comments. Provide only the filtered data. Don't add any special characters to the output.";
      const userPrompt = `Learning Goal: ${learningGoal}\n\nCSV Data:\n${dataArray.map(row => row.join(',')).join('\n')}`;
    
      console.log(userPrompt);
      console.log(systemPrompt);
    
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: "llama3:8b",
        prompt: `${systemPrompt}\n\nUser: ${userPrompt}`,
        stream: false
      });
    
      const relevantLines = response.data.response.trim().split('\n');
    
      // Find the indices of the first and second empty lines
      let firstEmptyLineIndex = -1;
      let secondEmptyLineIndex = -1;
      for (let i = 0; i < relevantLines.length; i++) {
        if (relevantLines[i].trim() === '') {
          if (firstEmptyLineIndex === -1) {
            firstEmptyLineIndex = i;
          } else {
            secondEmptyLineIndex = i;
            break;
          }
        }
      }
    
      // Slice the array based on the empty line indices
      let filteredLines = relevantLines;
      if (firstEmptyLineIndex !== -1) {
        filteredLines = relevantLines.slice(firstEmptyLineIndex + 1);
      }
      if (secondEmptyLineIndex !== -1) {
        filteredLines = filteredLines.slice(0, secondEmptyLineIndex - firstEmptyLineIndex - 1);
      }
    
      const relevantData = filteredLines.map((line: string) => {
        const [topic, title] = line.split(',');
        return { topic, title } as LearningResource;
      });
    
      // Generate and download CSV using PapaParse
      const csv = Papa.unparse(relevantData, { header: true });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
    
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'output.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    
      setResult(relevantData);
    } catch (err) {
      setError("An error occurred while processing your request.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">Create Your Dream Course</h1>
          <p className="text-xl text-center mb-12 text-gray-400">Discover your own learning pathway.</p>
          
          <form onSubmit={handleSubmit} className="relative mb-16">
            <Input
              type="text"
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              placeholder="What do you want to learn today?"
              className="w-full text-lg p-6 pr-16 rounded-full bg-gray-800 border-2 border-gray-700 focus:border-teal-400 text-white placeholder-gray-500"
            />
            <Button
              type="submit" 
              disabled={isLoading}
              className="absolute right-[1rem] top-[1rem] flex items-center justify-center rounded-full w-12 h-12 bg-teal-500 text-white hover:bg-teal-600"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="flex items-center justify-center w-full h-full"
                >
                  <Loader2 className="h-6 w-6" />
                </motion.div>
              ) : (
                <Search className="h-6 w-6" />
              )}
            </Button>
          </form>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 mt-4 text-center"
              >
                {error}
              </motion.p>
            )}
            {!result && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-center mb-8 text-teal-400">How to craft a perfect course?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard 
                    icon={<Zap size={40} />}
                    title="Have a Clear Idea"
                    description="Have a crystal clear idea on what you want to learn and achieve."
                  />
                  <FeatureCard 
                    icon={<Brain size={40} />}
                    title="Be Self-Aware"
                    description="Let us know what you already know and what you want to learn next."
                  />
                  <FeatureCard 
                    icon={<Code size={40} />}
                    title="Be more Self-Aware"
                    description="Also let us know what you DO NOT know too, so that we cover them up to. ;)"
                  />
                  <FeatureCard 
                    icon={<BookOpen size={40} />}
                    title="Break Down the Learning"
                    description="Divide your learning goal into smaller, manageable topics."
                  />
                  <FeatureCard 
                    icon={<Rocket size={40} />}
                    title="Stay Consistent"
                    description="Consistency is key to achieving your learning goals."
                  />
                </div>
              </motion.div>
            )}
            {result && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-center mb-4 text-teal-400">Filtered Learning Resources</h2>
                <ul>
                  {result.map((item, index) => (
                    <li key={index} className="text-gray-300 mb-2">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default LearningComponent;
