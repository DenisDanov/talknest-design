
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import FileUpload from "../UI/FileUpload";

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const handleSendMessage = useCallback(() => {
    if (message.trim() || selectedFiles.length > 0) {
      onSendMessage(message, selectedFiles);
      setMessage("");
      setSelectedFiles([]);
    }
  }, [message, selectedFiles, onSendMessage]);
  
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );
  
  const handleFileSelection = useCallback((fileList: FileList) => {
    const newFiles = Array.from(fileList);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  }, []);
  
  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);
  
  return (
    <div className="glass-effect mx-auto w-full max-w-4xl animate-fade-in rounded-xl p-4 shadow-lg">
      {selectedFiles.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
            >
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary/30"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="relative flex items-end gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className={cn(
            "flex min-h-[60px] w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary",
            disabled ? "cursor-not-allowed opacity-50" : ""
          )}
          disabled={disabled}
        />
        
        <div className="flex gap-2">
          <FileUpload onFilesSelected={handleFileSelection} />
          
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={disabled || (!message.trim() && selectedFiles.length === 0)}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors",
              (!message.trim() && selectedFiles.length === 0) ? "opacity-50" : "hover:bg-primary/90",
              disabled ? "cursor-not-allowed opacity-50" : ""
            )}
          >
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
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
