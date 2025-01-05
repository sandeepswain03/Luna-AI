import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  toggleTheme,
  isDarkMode,
}) => {
  return (
    <div
      className={`sticky top-0 border-b border-zinc-800 p-4 flex items-center justify-between backdrop-blur-sm ${
        isDarkMode ? "bg-zinc-900/50" : "bg-white"
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="w-8 h-8" />
      </Button>
      <button
        onClick={() => window.location.reload()}
        className="text-xl font-semibold"
      >
        Luna AI Assistant
      </button>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
};
