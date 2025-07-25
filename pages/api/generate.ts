import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const MODELS = [
  'deepseek/deepseek-chat-v3-0324',
  'mistralai/mistral-small-3.2-24b-instruct',
  'google/gemini-2.5-flash',
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  console.log('API Key:', process.env.OPENROUTER_API_KEY)

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  for (const model of MODELS) {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Phozzy Blogs',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Hello,World!' }],
        max_tokens: 512,
        temperature: 0.7,
      }),
      
    });
  

    const data = await response.json();
    console.log('Trying model:', model);
    console.log('Full OpenRouter response:\n', JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: 'No choices returned from OpenRouter' });
    }

    return res.status(200).json({ result: data.choices[0].message.content });

  } catch (error) {
    console.warn(`Error with model ${model}:`, error);
    console.error('Error generating response:', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}}
