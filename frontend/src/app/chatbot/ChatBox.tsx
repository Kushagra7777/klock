'use client';

import { useState } from 'react';

type Message = { sender: 'user' | 'bot'; text: string };

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/chat/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: "user_123",
          message: input,
          history: [],
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error(" API error:", error);
        setMessages((prev) => [...prev, { sender: 'bot', text: ' Server error: ' + (error.detail || 'Unknown error') }]);
        return;
      }

      const data = await res.json();
      const botMessage: Message = { sender: 'bot', text: data.response };
      setMessages((prev) => [...prev, botMessage]);
      setInput('');
    } catch (err) {
      console.error(" Network error:", err);
      setMessages((prev) => [...prev, { sender: 'bot', text: ' Network error. Check console.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{ border: '1px solid #ccc', padding: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', marginBottom: '0.5rem' }}>
            <b>{msg.sender === 'user' ? 'You' : 'Bot'}:</b> {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: 'left', fontStyle: 'italic', color: '#888' }}>
            Bot is typing...
          </div>
        )}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}