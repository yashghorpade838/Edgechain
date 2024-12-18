import React from 'react';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const config = {
  botName: 'ChatGPT-like Bot',
  initialMessages: [
    {
      text: 'Hi there! Ask me anything.',
      user: 'bot',
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#4CAF50',
    },
    chatButton: {
      backgroundColor: '#4CAF50',
    },
  },
};

function ChatbotComponent() {
  return (
    <div
      style={{
        width: '400px',
        height: '500px',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '8px',
      }}
    >
      <Chatbot 
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
    </div>
  );
}

export default ChatbotComponent;