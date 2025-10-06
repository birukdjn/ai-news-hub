'use client';
import { useState } from 'react';

// ⚠️ WARNING: This exposes your API key in client-side code
// USE ONLY FOR LOCAL DEVELOPMENT TESTING
export default function DevAISummary({ article }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY}` // ⚠️ INSECURE
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{
            role: 'user',
            content: `Summarize this news article in 3 bullet points:\nTitle: ${article.title}\nDescription: ${article.description}`
          }],
          max_tokens: 300
        })
      });

      const data = await response.json();
      setSummary(data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={generateSummary}
        disabled={loading}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? 'Generating...' : 'Generate Summary (DEV - INSECURE)'}
      </button>
      {summary && (
        <div className="p-4 bg-yellow-100 border border-yellow-400">
          <strong>⚠️ DEVELOPMENT MODE:</strong>
          <p className="mt-2">{summary}</p>
        </div>
      )}
    </div>
  );
}