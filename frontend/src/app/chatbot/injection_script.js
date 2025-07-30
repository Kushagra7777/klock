(function () {
  const chatContainer = document.createElement('div');
  chatContainer.id = 'chatbot-container';

  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'chatbot-toggle';
  toggleBtn.innerHTML = '🌀';

  const chatWindow = document.createElement('div');
  chatWindow.id = 'chatbot-window';

  chatContainer.appendChild(toggleBtn);
  chatContainer.appendChild(chatWindow);
  document.body.appendChild(chatContainer);

  const style = document.createElement('style');
  style.textContent = `
    #chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: Arial, sans-serif;
    }
    #chatbot-toggle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #667eea;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    #chatbot-toggle img {
      pointer-events: none;
    }
    #chatbot-window {
      width: 360px;
      height: 500px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      position: absolute;
      bottom: 80px;
      right: 0;
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    #chatbot-window.active {
      display: flex;
    }
    .chat-header {
      background: #667eea;
      color: white;
      padding: 10px;
      font-weight: bold;
    }
    .chat-messages {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #f5f5f5;
    }
    .chat-input-container {
      padding: 10px;
      display: flex;
      gap: 5px;
      border-top: 1px solid #ccc;
    }
    .chat-input {
      flex: 1;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    .send-button {
      padding: 8px 12px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .user-msg {
      align-self: flex-end;
      background: #667eea;
      color: white;
      padding: 8px;
      border-radius: 12px;
      max-width: 80%;
    }
    .bot-msg {
      align-self: flex-start;
      background: #e0e0e0;
      padding: 8px;
      border-radius: 12px;
      max-width: 80%;
    }
  `;
  document.head.appendChild(style);

  let isOpen = false;
  let messages = [];

  const toggleChat = () => {
    isOpen = !isOpen;
    chatWindow.classList.toggle('active', isOpen);
    toggleBtn.innerHTML = isOpen
      ? '<span style="font-size:18px;">Close</span>'
      : '<img src="/your-logo.png" alt="Chat" width="32" height="32" />';
  };

  toggleBtn.addEventListener('click', toggleChat);

  const renderMessages = () => {
    const msgBox = chatWindow.querySelector('.chat-messages');
    if (!msgBox) return;

    msgBox.innerHTML = '';
    messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = msg.sender === 'user' ? 'user-msg' : 'bot-msg';
      div.textContent = msg.text;
      msgBox.appendChild(div);
    });
    msgBox.scrollTop = msgBox.scrollHeight;
  };

  const createUI = () => {
    if (chatWindow.innerHTML.trim()) return;

    chatWindow.innerHTML = `
      <div class="chat-header">AI Assistant</div>
      <div class="chat-messages"></div>
      <div class="chat-input-container">
        <input class="chat-input" type="text" placeholder="Type a message..." />
        <button class="send-button">Send</button>
      </div>
    `;

    const input = chatWindow.querySelector('.chat-input');
    const sendBtn = chatWindow.querySelector('.send-button');

    const sendMessage = async () => {
      const text = input.value.trim();
      if (!text) return;

      messages.push({ sender: 'user', text });
      renderMessages();
      input.value = '';

      messages.push({ sender: 'bot', text: 'Typing...' });
      renderMessages();

      try {
        const res = await fetch('http://localhost:8000/chat/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user_123',
            message: text,
            history: [],
          })
        });

        const data = await res.json();
        messages.pop(); // remove "Typing..."
        messages.push({ sender: 'bot', text: data.response || '[No response]' });
        renderMessages();
      } catch (err) {
        messages.pop();
        messages.push({ sender: 'bot', text: 'Backend error. Please try again.' });
        console.error('Fetch error:', err);
        renderMessages();
      }
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    renderMessages();
  };

  createUI();
  console.log('Chatbot loaded');
})();
