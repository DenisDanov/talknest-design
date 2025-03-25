
import React from "react";
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === "user";
  
  return (
    <div 
      className={cn(
        "message-container animate-fade-in",
        isUser ? "message-user" : "message-ai"
      )}
    >
      <div className="flex items-start gap-2">
        {!isUser && (
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-primary text-primary-foreground">
            AI
          </div>
        )}
        <div className="flex-1 space-y-2">
          <p className="text-sm leading-relaxed">{message.content}</p>
          
          {message.files && message.files.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.files.map((file) => (
                <div 
                  key={file.id}
                  className="flex items-center gap-2 rounded-md bg-white/50 p-2 shadow-sm"
                >
                  <div className="rounded-md bg-primary/10 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="flex-1 truncate text-xs">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-gray-500">{Math.round(file.size / 1024)} KB</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {isUser && (
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gray-800 text-white">
            You
          </div>
        )}
      </div>
      <div className={cn(
        "text-xs mt-1 text-gray-500",
        isUser ? "text-right" : "text-left"
      )}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default ChatMessage;
