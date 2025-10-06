import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  const completion = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Summarize the given news title in 3 lines." },
      { role: "user", content: title },
    ],
  });

  const summary = completion.choices[0].message.content;
  return Response.json({ summary });
}
