import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Chatbot.module.css';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function saveGoalToStorage(goalDescription, goalAmount, targetDate) {
    try {
      const goals = JSON.parse(localStorage.getItem('goals') || '[]');
      const newGoal = {
        id: Date.now(),
        description: goalDescription,
        amount: goalAmount,
        target_date: targetDate,
        created_at: new Date().toISOString(),
      };
      goals.push(newGoal);
      localStorage.setItem('goals', JSON.stringify(goals));
      return { success: true, data: newGoal };
    } catch (err) {
      console.error('Error saving goal:', err);
      return { success: false, error: err };
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages(prev => [...prev, botMessage]);

      if (input.toLowerCase().includes('save')) {
        const goalDescription = 'Save for school fees';
        const goalAmount = 5000;
        const targetDate = new Date(new Date().setMonth(new Date().getMonth() + 3));
        handleSaveGoal(goalDescription, goalAmount, targetDate);
      }
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'Oops! Something went wrong. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveGoal = (goalDescription, goalAmount, targetDate) => {
    const result = saveGoalToStorage(goalDescription, goalAmount, targetDate);
    if (result.success) {
      console.log('Goal saved successfully:', result.data);
    } else {
      console.error('Failed to save goal:', result.error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>OldMoney Bot</h1>
        <p className={styles.headerSubtitle}>Your personal savings assistant</p>
      </header>

      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>N$</div>
            <h2 className={styles.emptyTitle}>Welcome to OldMoney Bot</h2>
            <p className={styles.emptyText}>
              Start a conversation to get personalized savings advice and set your financial goals.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.messageWrapper} ${
                  msg.sender === 'user' ? styles.userWrapper : styles.botWrapper
                }`}
              >
                <div className={`${styles.avatar} ${
                  msg.sender === 'user' ? styles.userAvatar : styles.botAvatar
                }`}>
                  {msg.sender === 'user' ? 'U' : 'O'}
                </div>
                <div
                  className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
                <div className={`${styles.avatar} ${styles.botAvatar}`}>O</div>
                <div className={styles.botMessage}>
                  <div className={styles.typing}>
                    <span className={styles.typingDot}></span>
                    <span className={styles.typingDot}></span>
                    <span className={styles.typingDot}></span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className={styles.input}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className={styles.button}
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
