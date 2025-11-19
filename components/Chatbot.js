import { useState } from 'react';
import styles from '../styles/Chatbot.module.css';
import supabase from '../utils/supabaseClient';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  async function saveGoalToSupabase(goalDescription, goalAmount, targetDate) {
    try {
      const { data, error } = await supabase.from('goals').insert([
        {
          description: goalDescription,
          amount: goalAmount,
          target_date: targetDate,
          created_at: new Date(),
        },
      ]);

      if (error) {
        console.error('Error saving goal to Supabase:', error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (err) {
      console.error('Unexpected error:', err);
      return { success: false, error: err };
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages([...messages, userMessage, botMessage]);

      // Example: Parse goal from user message and save it
      if (input.includes('save')) {
        const goalDescription = 'Save for school fees'; // Example parsing logic
        const goalAmount = 5000; // Example parsing logic
        const targetDate = new Date(new Date().setMonth(new Date().getMonth() + 3));
        await handleSaveGoal(goalDescription, goalAmount, targetDate);
      }
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'Oops! Something went wrong. Please try again.' };
      setMessages([...messages, userMessage, errorMessage]);
    }
  };

  const handleSaveGoal = async (goalDescription, goalAmount, targetDate) => {
    const result = await saveGoalToSupabase(goalDescription, goalAmount, targetDate);
    if (result.success) {
      console.log('Goal saved successfully:', result.data);
    } else {
      console.error('Failed to save goal:', result.error);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}