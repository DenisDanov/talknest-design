
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

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
        {/* Sidebar toggle with proper positioning */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute left-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-md transition-all hover:bg-gray-100"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <ChevronLeft
            className="transition-transform duration-300"
            style={{
              transform: isSidebarOpen ? "rotate(0deg)" : "rotate(180deg)",
            }}
            size={20}
          />
        </button>

        {/* Content with proper padding to avoid overlay with toggle button */}
        <div className="h-full w-full pt-4 pl-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
