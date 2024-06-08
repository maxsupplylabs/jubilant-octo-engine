// api.js
'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateResponse(prompt, modelType) {
  try {
    const model = genAI.getGenerativeModel({ model: modelType });
    const result = await model.generateContentStream(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    throw new Error("Error generating response: " + error.message);
  }
}
