
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Conversation, Message } from "@/lib/types";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { cn } from "@/lib/utils";

interface ChatContainerProps {
  conversation: Conversation | null;
  onUpdateConversation: (updatedConversation: Conversation) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  conversation,
  onUpdateConversation,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation?.messages]);

  const handleSendMessage = async (content: string, files?: File[]) => {
    if (!conversation) return;

    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: "user",
      timestamp: new Date(),
      files: files?.map((file) => ({
        id: uuidv4(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      })),
    };

    // Update conversation with user message
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, userMessage],
      updatedAt: new Date(),
    };

    onUpdateConversation(updatedConversation);

    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI reply after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: uuidv4(),
        content:
          "This is a simulated AI response. In a real application, this would come from your backend API.",
        sender: "ai",
        timestamp: new Date(),
      };

      const conversationWithAiReply = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiMessage],
        updatedAt: new Date(),
      };

      setIsTyping(false);
      onUpdateConversation(conversationWithAiReply);
    }, 1500);
  };

  if (!conversation) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-semibold text-primary">Welcome to the Chat</h2>
          <p className="mt-2 text-gray-600">
            Select a conversation from the sidebar or start a new one to begin chatting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Chat header */}
      <div className="glass-effect flex items-center justify-between border-b border-gray-100 px-6 py-4 shadow-sm">
        <h2 className="text-lg font-medium">{conversation.title}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4 scrollbar-thin">
        <div className="mx-auto max-w-4xl space-y-6">
          {conversation.messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-6">
              <div className="text-center">
                <p className="text-gray-500">
                  No messages yet. Start a conversation by typing below.
                </p>
              </div>
            </div>
          ) : (
            <>
              {conversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </>
          )}

          {isTyping && (
            <div className="message-container message-ai w-24 animate-pulse-light">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat input */}
      <div className="border-t border-gray-100 bg-white p-4">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatContainer;
