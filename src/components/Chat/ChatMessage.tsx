
import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  id: string;
  type: 'user' | 'ai';
  content: string;
}

/**
 * Individual chat message component with proper styling and icons
 * Supports both user and AI message types with distinct visual styling
 */
const ChatMessage: React.FC<ChatMessageProps> = ({ id, type, content }) => {
  return (
    <div className={`flex gap-3 ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-3xl ${type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar with appropriate icon */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          type === 'user' 
            ? 'bg-slate-700/50 border border-slate-600/30' 
            : 'bg-slate-700/50 border border-slate-600/30'
        }`}>
          {type === 'user' ? (
            <User className="w-4 h-4 text-slate-300" />
          ) : (
            <Bot className="w-4 h-4 text-slate-300" />
          )}
        </div>
        
        {/* Message content with context-appropriate styling */}
        <div className={`p-4 rounded-2xl ${
          type === 'user'
            ? 'bg-slate-700/30 border border-slate-600/20 text-white'
            : 'bg-slate-800/40 border border-slate-700/20 text-slate-200'
        }`}>
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
