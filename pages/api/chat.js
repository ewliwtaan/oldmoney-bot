import { Configuration, OpenAIApi } from 'openai';
import supabase from '../../utils/supabaseClient';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are OldMoney Bot, a savings assistant.' },
        { role: 'user', content: message },
      ],
    });

    const reply = completion.data.choices[0].message.content;

    // Optionally save the user message and bot reply to Supabase
    await supabase.from('chat_history').insert([
      { user_message: message, bot_reply: reply, created_at: new Date() },
    ]);

    res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
}