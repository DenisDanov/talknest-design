
import React from "react";
import { Conversation } from "@/lib/types";
import ConversationItem from "./ConversationItem";

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onConversationSelect: (conversationId: string) => void;
  onNewConversation: () => void;
}

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  activeConversationId,
  onConversationSelect,
  onNewConversation,
}) => {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Header */}
      <div className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-sidebar-foreground">Conversations</h1>
          <button
            onClick={onNewConversation}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            aria-label="New conversation"
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <div className="relative">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sidebar-foreground/60"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search conversations"
              className="w-full rounded-md border border-sidebar-border bg-sidebar-accent py-2 pl-10 pr-4 text-sm text-sidebar-foreground outline-none placeholder:text-sidebar-foreground/60 focus:border-sidebar-ring focus:ring-1 focus:ring-sidebar-ring"
            />
          </div>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {conversations.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-sidebar-foreground/60">No conversations yet</p>
              <button
                onClick={onNewConversation}
                className="mt-2 rounded-md bg-primary/10 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary/20"
              >
                Start a new conversation
              </button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-sidebar-border">
            {conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={activeConversationId === conversation.id}
                onClick={() => onConversationSelect(conversation.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">User</p>
            <p className="text-xs text-sidebar-foreground/60">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationSidebar;
