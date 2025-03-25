
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MainLayout from "@/layout/MainLayout";
import ConversationSidebar from "@/components/Sidebar/ConversationSidebar";
import ChatContainer from "@/components/Chat/ChatContainer";
import { Conversation } from "@/lib/types";
import { toast } from "sonner";

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Getting Started",
      updatedAt: new Date(),
      messages: [
        {
          id: "msg1",
          content: "Hello! How can I assist you today?",
          sender: "ai",
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        },
      ],
    },
  ]);
  
  const [activeConversationId, setActiveConversationId] = useState<string | null>("1");
  
  const activeConversation = activeConversationId
    ? conversations.find((conv) => conv.id === activeConversationId) ?? null
    : null;
  
  const handleConversationSelect = useCallback((conversationId: string) => {
    setActiveConversationId(conversationId);
  }, []);
  
  const handleNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: "New Conversation",
      updatedAt: new Date(),
      messages: [],
    };
    
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    toast.success("New conversation created");
  }, []);
  
  const handleUpdateConversation = useCallback((updatedConversation: Conversation) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === updatedConversation.id ? updatedConversation : conv
      )
    );
    
    // Update title if it's still the default and we have messages
    if (
      updatedConversation.title === "New Conversation" &&
      updatedConversation.messages.length > 0
    ) {
      const firstUserMessage = updatedConversation.messages.find(
        (msg) => msg.sender === "user"
      );
      
      if (firstUserMessage) {
        const newTitle =
          firstUserMessage.content.slice(0, 30) +
          (firstUserMessage.content.length > 30 ? "..." : "");
        
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === updatedConversation.id
              ? { ...conv, title: newTitle }
              : conv
          )
        );
      }
    }
  }, []);
  
  return (
    <MainLayout
      sidebar={
        <ConversationSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onConversationSelect={handleConversationSelect}
          onNewConversation={handleNewConversation}
        />
      }
    >
      <ChatContainer
        conversation={activeConversation}
        onUpdateConversation={handleUpdateConversation}
      />
    </MainLayout>
  );
};

export default Index;
