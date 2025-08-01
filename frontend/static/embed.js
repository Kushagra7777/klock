// frontend/static/embed.js
(function() {
    // Check if config exists
    if (!window.KLOCK_CONFIG) {
        console.error('KLOCK_CONFIG is not defined. Please set userId and apiUrl.');
        return;
    }

    const { userId, apiUrl } = window.KLOCK_CONFIG;
    
    if (!userId || !apiUrl) {
        console.error('KLOCK_CONFIG must include userId and apiUrl');
        return;
    }

    // Create chatbot container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'klock-chat-container';
    chatContainer.innerHTML = `
        <div id="klock-chat-toggle">💬</div>
        <div id="klock-chat-window">
            <div id="klock-chat-header">
                <span>Klock Chat</span>
                <button id="klock-chat-close">×</button>
            </div>
            <div id="klock-chat-messages"></div>
            <div id="klock-chat-input-container">
                <input type="text" id="klock-chat-input" placeholder="Ask about your documents...">
                <button id="klock-chat-send">Send</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        #klock-chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            font-family: Arial, sans-serif;
        }

        #klock-chat-toggle {
            width: 60px;
            height: 60px;
            background-color: #007bff;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 24px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        #klock-chat-window {
            position: absolute;
            bottom: 70px;
            right: 0;
            width: 350px;
            height: 400px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
        }

        #klock-chat-header {
            background-color: #007bff;
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #klock-chat-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
        }

        #klock-chat-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background-color: #f9f9f9;
        }

        .klock-message {
            margin-bottom: 10px;
            padding: 8px 12px;
            border-radius: 15px;
            max-width: 80%;
        }

        .klock-user {
            background-color: #007bff;
            color: white;
            margin-left: auto;
            text-align: right;
        }

        .klock-bot {
            background-color: #e9ecef;
            color: #333;
        }

        #klock-chat-input-container {
            display: flex;
            padding: 10px;
            border-top: 1px solid #eee;
            background: white;
        }

        #klock-chat-input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
        }

        #klock-chat-send {
            margin-left: 10px;
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Chat functionality
    const chatToggle = document.getElementById('klock-chat-toggle');
    const chatWindow = document.getElementById('klock-chat-window');
    const chatClose = document.getElementById('klock-chat-close');
    const chatInput = document.getElementById('klock-chat-input');
    const chatSend = document.getElementById('klock-chat-send');
    const chatMessages = document.getElementById('klock-chat-messages');

    // Toggle chat window
    chatToggle.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close chat window
    chatClose.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Send to API
        fetch(`${apiUrl}/chat/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        })
        .then(response => response.json())
        .then(data => {
            addMessage(data.response, 'bot');
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage('Sorry, I encountered an error.', 'bot');
        });
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `klock-message klock-${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listeners
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add welcome message
    setTimeout(() => {
        addMessage('Hello! Ask me anything about your documents.', 'bot');
    }, 500);
})();