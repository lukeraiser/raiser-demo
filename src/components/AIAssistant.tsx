'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  onSuggestionSelect: (suggestion: string) => void;
}

export default function AIAssistant({ onSuggestionSelect }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m here to help you craft your mission and vision statements. What would you like to focus on first?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response - replace with actual API call
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Here are some suggestions to help craft your statement:\n\n1. Start with your core purpose\n2. Focus on the impact you want to make\n3. Keep it concise and memorable\n4. Use active language\n5. Make it aspirational but achievable'
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 h-full flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for help crafting your statement..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
        >
          Send
        </button>
      </form>
    </div>
  );
} 