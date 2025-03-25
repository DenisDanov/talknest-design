
import React from "react";
import { Conversation } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
}) => {
  const formattedDate = new Date(conversation.updatedAt).toLocaleDateString(
    undefined,
    { month: "short", day: "numeric" }
  );

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full px-3 py-2 text-left transition-all duration-200 ease-in-out",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
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
            className={cn(
              "transition-colors",
              isActive ? "text-primary-foreground" : "text-primary"
            )}
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        <div className="flex-1 truncate">
          <div className="flex items-center justify-between">
            <p
              className={cn(
                "truncate text-sm font-medium",
                isActive
                  ? "text-primary-foreground"
                  : "text-sidebar-foreground"
              )}
            >
              {conversation.title}
            </p>
            <p
              className={cn(
                "text-xs",
                isActive
                  ? "text-primary-foreground/80"
                  : "text-sidebar-foreground/60"
              )}
            >
              {formattedDate}
            </p>
          </div>
          <p
            className={cn(
              "truncate text-xs",
              isActive
                ? "text-primary-foreground/80"
                : "text-sidebar-foreground/60"
            )}
          >
            {conversation.messages[conversation.messages.length - 1]?.content.substring(0, 40) || "New conversation"}
            {conversation.messages[conversation.messages.length - 1]?.content.length > 40 ? "..." : ""}
          </p>
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;
