export async function POST(request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: 'OPENAI_API_KEY not configured' }, { status: 500 });
    }
    const { action, payload } = await request.json();
    const { title = '', description = '', content = '', question = '' } = payload || {};

    const map = {
      summarize: `Summarize the following article into 2-3 concise sentences. No markdown, no labels.\nTitle: ${title}\nDescription: ${description}\nContent: ${content}`,
      tags: `Extract 3-5 short, relevant tags (comma-separated) for the article. Only output tags.\nTitle: ${title}\nDescription: ${description}`,
      insight: `Provide a brief insight (1-2 sentences) about the headline's context or trend. No fluff.\nTitle: ${title}\nDescription: ${description}`,
      ask: `Answer the user's question briefly based on AI/tech news context: ${question}`,
    };

    const prompt = map[action];
    if (!prompt) return Response.json({ error: 'Invalid action' }, { status: 400 });

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 320,
        temperature: 0.5,
      })
    });
    if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim() || '';
    return Response.json({ result: text });
  } catch (e) {
    console.error('AI tools error:', e);
    return Response.json({ error: 'AI request failed' }, { status: 500 });
  }
}


