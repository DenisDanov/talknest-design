
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, sidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar wrapper with transition */}
      <div
        className={cn(
          "sidebar-transition h-full",
          isSidebarOpen ? "w-80" : "w-0"
        )}
      >
        <div className="h-full w-80">{sidebar}</div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Sidebar toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute left-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-md transition-all hover:bg-gray-100"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
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
            className="transition-transform duration-300"
            style={{
              transform: isSidebarOpen ? "rotate(0deg)" : "rotate(180deg)",
            }}
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
};

export default MainLayout;
