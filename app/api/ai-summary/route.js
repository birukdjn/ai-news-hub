export async function POST(request) {
  try {
    const { article } = await request.json();
    const prompt = `Summarize the following article in exactly 3 short lines. Use plain sentences without bullet characters, markdown, or labels.\n\nTitle: ${article?.title || ''}\nDescription: ${article?.description || ''}`;

    let summaryText = '';

    // Prefer OpenAI if configured
    if (process.env.OPENAI_API_KEY) {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 220,
          temperature: 0.5
        })
      });
      if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
      const data = await res.json();
      summaryText = data.choices?.[0]?.message?.content || '';
    } else if (process.env.DEEPSEEK_API_KEY) {
      const res = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 220,
          temperature: 0.5
        })
      });
      if (!res.ok) throw new Error(`DeepSeek error: ${res.status}`);
      const data = await res.json();
      summaryText = data.choices?.[0]?.message?.content || '';
    } else {
      return Response.json({ error: 'No AI provider configured' }, { status: 500 });
    }

    const cleaned = summaryText
      .replace(/^[-*•\s]+/gm, '')
      .replace(/\n{2,}/g, '\n')
      .trim();

    return Response.json({ summary: cleaned });
  } catch (error) {
    console.error('AI Summary error:', error);
    return Response.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}