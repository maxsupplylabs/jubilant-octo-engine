// components/story-generator.js

'use client';

import { useState } from 'react';
import { generateResponse } from '../api';

export default function StoryGenerator() {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modelType, setModelType] = useState("gemini-1.5-flash");

  async function handleGenerate() {
    if (!prompt) return;

    setLoading(true);
    setError("");
    setResponseText("");

    try {
      const response = await generateResponse(prompt, modelType);
      setResponseText(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-4">Generate a Story</h1>
      <input 
        type="text" 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Enter your prompt here..." 
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
      />
      <select 
        value={modelType}
        onChange={(e) => setModelType(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
      >
        <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
        <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
        <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
        <option value="gemini-1.0-pro-001">Gemini 1.0 Pro 001 (Tuning)</option>
        <option value="gemini-1.5-pro-001">Gemini 1.5 Pro 001 (Tuning)</option>
        <option value="gemini-1.0-pro-002">Gemini 1.0 Pro 002 (Tuning)</option>
        <option value="gemini-1.5-pro-002">Gemini 1.5 Pro 002 (Tuning)</option>
        {/* Add more model options as needed */}
      </select>
      <button 
        onClick={handleGenerate} 
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {responseText && (
        <p className="mt-4 bg-gray-100 p-4 rounded-md">{responseText}</p>
      )}
    </div>
  );
}
