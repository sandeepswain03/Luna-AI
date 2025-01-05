import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, X, Menu, Trash2 } from "lucide-react";
import { Chat } from "./Chat";

interface SidebarProps {
  isOpen: boolean;
  isMobileView: boolean;
  onClose: () => void;
  chats: Chat[];
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  toggleSidebar: () => void;
  isdarkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isMobileView,
  chats,
  currentChatId,
  isdarkMode,
  onChatSelect,
  onNewChat,
  onDeleteChat,
  toggleSidebar,
}) => {
  return (
    <div
      className={`${isMobileView ? "fixed" : "relative"} ${
        isdarkMode ? "bg-zinc-900" : "bg-white"
      } transition-all duration-300 ease-in-out border-r border-zinc-800 h-full z-20 overflow-hidden ${
        isMobileView
          ? isOpen
            ? "w-64 translate-x-0"
            : "w-0 -translate-x-full"
          : isOpen
          ? "w-64"
          : "w-16"
      }`}
    >
      <div className={`${isOpen ? "p-4" : "p-2"} h-full flex flex-col`}>
        <div className="flex items-center justify-between mb-4">
          {isOpen && <h2 className="text-xl font-semibold">Chat History</h2>}
          <Button
            variant="ghost"
            size="icon"
            className={`${isMobileView && !isOpen ? "hidden" : ""}`}
            onClick={toggleSidebar}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        {isOpen && (
          <div className="flex-1 overflow-hidden flex flex-col">
            <Button
              variant="outline"
              className="w-full justify-start text-white mb-4"
              onClick={onNewChat}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              New Chat
            </Button>
            <div className="space-y-2 overflow-y-auto flex-1">
              {chats.map((chat) => (
                <div key={chat.id} className="flex items-center">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left truncate ${
                      chat.id === currentChatId
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }`}
                    onClick={() => onChatSelect(chat.id)}
                  >
                    {chat.name}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
                    onClick={() => onDeleteChat(chat.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
