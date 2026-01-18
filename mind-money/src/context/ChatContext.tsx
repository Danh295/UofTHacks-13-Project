'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define Types
export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actionPlan?: any;
};

type AgentLog = {
  id: string;
  agentName: string;
  status: string;
  thought: string;
  output?: string;
};

type ChatContextType = {
  messages: Message[];
  addMessage: (msg: Message) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  agentLogs: AgentLog[];
  setAgentLogs: React.Dispatch<React.SetStateAction<AgentLog[]>>;
  isThinking: boolean;
  setIsThinking: React.Dispatch<React.SetStateAction<boolean>>;
  sessionId: string;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  // Use sessionStorage instead of localStorage so guest data clears on tab close
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('moneybird_session_id') || `sess-${Math.random().toString(36).substr(2, 9)}`;
    }
    return 'demo-session';
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // --- 1. SAVE SESSION ID TO SESSION STORAGE ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('moneybird_session_id', sessionId);
    }
  }, [sessionId]);

  const addMessage = (msg: Message) => {
    setMessages(prev => [...prev, msg]);
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      addMessage, 
      setMessages, 
      agentLogs, 
      setAgentLogs,
      isThinking, 
      setIsThinking,
      sessionId 
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};