"use client"
import React, { useState } from 'react';
import { createReadStream } from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

const dataPath = '/path/to/your/csvfile.csv';
const outputPath = '/path/to/data/output.csv';

interface CsvRow {
  Category: string;
  Description: string;
  Link: string;
}

const MyComponent: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<CsvRow[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt) return;

    const csvData: CsvRow[] = [];

    // Read the CSV file
    createReadStream(dataPath)
      .pipe(csv())
      .on('data', (row: CsvRow) => {
        csvData.push(row);
      })
      .on('end', async () => {
        // Process the prompt with Llama3 model
        const relevantEntries = await processWithLlama3(prompt, csvData);

        // Output to new CSV file
        const csvWriter = createObjectCsvWriter({
          path: outputPath,
          header: [
            { id: 'Category', title: 'Category' },
            { id: 'Description', title: 'Description' },
            { id: 'Link', title: 'Link' }
          ]
        });

        await csvWriter.writeRecords(relevantEntries);
        setResult(relevantEntries);
      });
  };

  const processWithLlama3 = async (prompt: string, csvData: CsvRow[]) => {
    const systemPrompt = `
      You are given a list of educational resources in CSV format. 
      Each entry consists of a Category, a Description, and a Link.
      The user's prompt is about a specific topic they want to learn.
      Respond with the relevant entries from the CSV in the format:
      Category, Description, Link
      Ensure the response includes only entries related to the user's query.
    `;

    const input = `${systemPrompt}\n\nUser's prompt: ${prompt}\n\n${csvData.map(row => `${row.Category}, ${row.Description}, ${row.Link}`).join('\n')}`;

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama2:8b',
          prompt: input,
        }),
      });

      const responseText = await response.text();

      // Extract relevant entries from the response
      const responseLines = responseText.split('\n');
      const relevantEntries = csvData.filter(row => 
        responseLines.some((line: string) => line.includes(row.Description) && line.includes(row.Link))
      );

      return relevantEntries;
    } catch (error) {
      console.error('Error processing with Llama3:', error);
      return [];
    }
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={handleInputChange}
        placeholder="Enter a topic you want to learn about"
      />
      <button onClick={handleSubmit}>Submit</button>
      {result.length > 0 && (
        <div>
          <h3>Relevant Entries:</h3>
          <ul>
            {result.map((entry, index) => (
              <li key={index}>{entry.Description} - <a href={entry.Link}>Link</a></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
