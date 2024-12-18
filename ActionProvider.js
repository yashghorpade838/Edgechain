import React from 'react';
import axios from 'axios';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleMessage = async (message) => {
    const botMessage = createChatBotMessage('Processing your request...');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const answer = response.data.choices[0].message.content.trim();
      const apiMessage = createChatBotMessage(answer);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, apiMessage],
      }));
    } catch (error) {
      const errorMessage = createChatBotMessage('Oops! Something went wrong. Please try again.');
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: { handleMessage },
        });
      })}
    </div>
  );
};

export default ActionProvider;