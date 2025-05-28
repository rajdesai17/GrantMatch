
import React from 'react';
import { Bot } from 'lucide-react';

/**
 * Loading indicator for AI responses with animated dots
 * Provides visual feedback during message processing
 */
const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-slate-700/50 border border-slate-600/30 flex items-center justify-center">
        <Bot className="w-4 h-4 text-slate-300" />
      </div>
      <div className="bg-slate-800/40 border border-slate-700/20 p-4 rounded-2xl">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
