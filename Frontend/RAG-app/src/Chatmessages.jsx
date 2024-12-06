import React from 'react';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';


const ChatMessage = ({ message }) => {
    const isAssistant = message.role === 'assistant';

  return (
    <motion.div 
      initial={{ opacity: 0, x: isAssistant ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 w-8/12 mb-8 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md
          ${isAssistant ? 'bg-blue-500' : 'bg-green-500'}`}
      >
        {isAssistant ? (
          <Bot className="w-6 h-6 bg-transparent" />
        ) : (
          <User className="w-6 h-6 bg-transparent" />
        )}
      </motion.div>
      
      <div className={`max-w-[80%] rounded-2xl p-3 ${
        isAssistant 
          ? 'bg-blue-50 text-left' 
          : 'bg-green-50 text-right self-end'
      }`}>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-sm font-medium bg-transparent ${
            isAssistant ? 'text-blue-800' : 'text-green-800'
          }`}
        >
          {isAssistant ? 'Assistant' : 'You'}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mt-1 text-sm bg-transparent ${
            isAssistant ? 'text-gray-700' : 'text-gray-800'
          }`}
        >
          {message.content}
        </motion.p>
      </div>
    </motion.div>
  );
  }

  export default ChatMessage