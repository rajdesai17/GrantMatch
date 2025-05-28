
import React, { useState } from 'react';
import Header from '@/components/Header';
import GrantCard from '@/components/GrantCard';
import ChatMessage from '@/components/Chat/ChatMessage';
import ChatInput from '@/components/Chat/ChatInput';
import LoadingIndicator from '@/components/Chat/LoadingIndicator';
import { useGrantDiscovery } from '@/hooks/useGrantDiscovery';
import { processGrantApplication } from '@/utils/grantUtils';

/**
 * Discovery page component for AI-powered grant matching
 * Integrates chat interface with grant recommendation system
 */
const Discovery = () => {
  const [inputValue, setInputValue] = useState('');
  const { messages, isLoading, sendMessage } = useGrantDiscovery();

  /**
   * Handles message sending with input clearing
   */
  const handleSendMessage = async () => {
    const messageContent = inputValue.trim();
    if (!messageContent) return;

    setInputValue(''); // Clear input immediately for better UX
    await sendMessage(messageContent);
  };

  /**
   * Processes grant application with enhanced logging
   */
  const handleApply = (grantId: string) => {
    processGrantApplication(grantId);
  };

  return (
    <div className="min-h-screen rich-gradient-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold elegant-text mb-4">
              AI Grant <span className="text-white">Discovery</span>
            </h1>
            <p className="text-slate-300 text-lg">
              Describe your project and let AI find the perfect funding opportunities from our database of 2,847+ active grants
            </p>
          </div>

          {/* Chat Interface Container */}
          <div className="elegant-card h-96 mb-6 flex flex-col">
            {/* Chat Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto chat-container space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  {/* Individual Chat Message */}
                  <ChatMessage
                    id={message.id}
                    type={message.type}
                    content={message.content}
                  />

                  {/* Grant Recommendations (when available) */}
                  {message.grants && (
                    <div className="ml-11 grid gap-4 md:grid-cols-2">
                      {message.grants.slice(0, 4).map((grant) => (
                        <GrantCard
                          key={grant.id}
                          grant={grant}
                          onApply={handleApply}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading State */}
              {isLoading && <LoadingIndicator />}
            </div>

            {/* Chat Input Area */}
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendMessage}
              isLoading={isLoading}
              placeholder="Describe your project, mission, or funding needs..."
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Discovery;
