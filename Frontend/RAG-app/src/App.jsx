import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Navbar'
import ChatMessage from './Chatmessages';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

function App() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check upload status on component mount
  useEffect(() => {
    const uploadStatus = localStorage.getItem('isUploaded');
    setIsUploaded(uploadStatus === 'true');
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: inputMessage };
    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call backend
      const response = await axios.get(`http://127.0.0.1:8000/chat`, {
        params: { msg: inputMessage }
      });

      // Add assistant response to chat
      const assistantMessage = { role: 'assistant', content: response.data };
      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'OpenAI credits exhausted.'
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading Indicator Component
  const LoadingIndicator = () => (
    <div className="flex justify-center items-center p-4">
      <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
    </div>
  );

  return (
    <div className="">
      <Navbar />
      <div className="h-[calc(100vh-200px)] w-full overflow-y-auto mt-1 flex items-center justify-center flex-col">
        {chatMessages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && <LoadingIndicator />}
      </div>
      <div className='Text-input fixed bottom-0 left-0 right-0 p-4 bg-white'>
        <div className='input-bar flex'>
          {!isUploaded ? (
            <input 
              type="text" 
              id="myDisabledInput" 
              placeholder='Send a message...' 
              disabled 
              className="w-full p-2 border rounded-l-lg opacity-50"
            />
          ) : (
            <>
              <input 
                type="text" 
                id="myInput" 
                placeholder='Send a message...' 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full p-2 border rounded-l-lg"
                disabled={isLoading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App