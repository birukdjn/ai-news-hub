export async function POST(request) {
  try {
    const { article } = await request.json();
    
    if (!process.env.DEEPSEEK_API_KEY) {
      return Response.json({ error: 'DeepSeek API key not configured' }, { status: 500 });
    }

    const prompt = `Summarize this news article in 3 concise bullet points:\n\nTitle: ${article.title}\nDescription: ${article.description || 'No description available'}`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const summary = data.choices[0].message.content;

    return Response.json({ summary });
  } catch (error) {
    console.error('AI Summary error:', error);
    return Response.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}