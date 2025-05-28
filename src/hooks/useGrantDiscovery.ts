
import { useState, useCallback } from 'react';
import grantsData from '@/data/grants.json';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  grants?: typeof grantsData;
}

/**
 * Custom hook for managing grant discovery chat functionality
 * Handles message state, AI responses, and grant recommendations
 */
export const useGrantDiscovery = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI grant discovery assistant. I have access to 2,847 active grants across 45+ countries with over $2.3B in available funding. Tell me about your project, mission, or the type of funding you're looking for, and I'll help you find the perfect grants!",
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Generates contextual AI responses based on user input keywords
   * Returns tailored messaging for different grant categories
   */
  const generateAIResponse = useCallback((userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Keyword-based response mapping for realistic AI behavior
    const responseMap = {
      women: "Great! I found 127 grants specifically supporting women-led initiatives and female founders. Many of these offer additional mentorship and networking opportunities. Here are the top matches based on your profile:",
      tech: "Excellent! I discovered 89 technology-focused grants currently accepting applications. These range from early-stage seed funding to scale-up grants. Here are the most relevant opportunities:",
      climate: "Perfect timing! Climate action is a major funding priority right now. I found 156 grants focused on environmental and sustainability projects, totaling over $450M in available funding. Here are your best matches:",
      education: "Education is always well-funded! I located 203 grants supporting educational initiatives, from K-12 programs to higher education and adult learning. Here are the top opportunities:",
      community: "Community impact projects are in high demand! I found 178 grants for social initiatives and community development projects. Many offer flexible funding terms. Here are your best matches:",
    };

    // Check for keyword matches
    for (const [keyword, response] of Object.entries(responseMap)) {
      if (input.includes(keyword)) {
        return response;
      }
    }

    // Default response for unmatched queries
    return "Based on your description, I analyzed our database of 2,847 active grants and found several excellent matches. I've prioritized grants with higher acceptance rates and those currently in active review cycles. Here are your top recommendations:";
  }, []);

  /**
   * Processes user message and generates AI response with grant recommendations
   * Includes realistic delay simulation for better UX
   */
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate realistic AI processing time
    const processingDelay = 1500 + Math.random() * 1000;
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(content),
        grants: grantsData, // Include grant recommendations
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, processingDelay);
  }, [generateAIResponse]);

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
