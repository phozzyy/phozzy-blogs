import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  console.log('API Key:', process.env.OPENROUTER_API_KEY)

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

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
        model: 'deepseek/deepseek-chat-v3-0324',
        messages: [{ role: 'user', content: 'Hello,World!' }],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

   console.log('OpenRouter response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter error:', errorText);
      return res.status(500).json({ error: errorText });
    }

    const data = await response.json();
    console.log('Full OpenRouter response:\n', JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: 'No choices returned from OpenRouter' });
    }

    return res.status(200).json({ result: data.choices[0].message.content });

  } catch (error) {
    console.error('Error generating response:', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}
