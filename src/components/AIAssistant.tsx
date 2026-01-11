import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Check if key exists before making request
    if (!process.env.API_KEY) {
      setResponse("⚠️ System Error: Gemini API Key is missing. Please create a .env file with your API_KEY.");
      return;
    }

    setLoading(true);
    setResponse('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: 'You are a world-class pet behaviorist and health expert for PetPlaza. Answer the following question briefly and warmly.',
        },
      });
      
      const aiText = result.text;
      setResponse(aiText || "I couldn't find an answer. Try asking about pet care, diet, or behavior.");
    } catch (error: any) {
      console.error("AI Error:", error);
      let errorMessage = "Oops! The AI is taking a quick nap. Please try asking again in a moment.";
      
      // Provide more specific feedback for common errors
      if (error.message?.includes('API key')) {
        errorMessage = "Error: Invalid API Key. Please check your .env file.";
      } else if (error.message?.includes('429')) {
        errorMessage = "Traffic High: The AI is busy. Please wait a minute.";
      }
      
      setResponse(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-5 mt-6 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <i className="fa-solid fa-sparkles text-4xl text-emerald-500"></i>
      </div>
      
      <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Haven AI Expert
      </h4>
      
      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
        Get instant advice on your pet's health, training, or happiness.
      </p>

      <form onSubmit={askAI} className="relative mb-3">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask about pet care..."
          className="w-full bg-emerald-50 border-none rounded-xl py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-emerald-300"
        />
        <button 
          disabled={loading || !prompt.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800 disabled:opacity-30 transition-colors"
          title="Send message"
        >
          {loading ? (
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          ) : (
            <i className="fa-solid fa-paper-plane"></i>
          )}
        </button>
      </form>

      {response && (
        <div className={`rounded-xl p-3 text-xs leading-relaxed border-l-4 animate-fade-in shadow-inner ${response.includes('Error') || response.includes('System') ? 'bg-red-50 text-red-700 border-red-400' : 'bg-gray-50 text-gray-700 border-emerald-400'}`}>
          {response}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;