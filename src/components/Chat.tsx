"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MessageList } from "./MessageList";
import { InputForm } from "./InputForm";
import { WelcomeScreen } from "./WelcomeScreen";
import { TooltipProvider } from "@/components/ui/tooltip";
import LangflowClient from "@/utils/LangFlowClient";
import { v4 as uuidv4 } from "uuid";

const flowIdOrName =
  process.env.NEXT_PUBLIC_FLOW_ID_OR_NAME || "defaultFlowIdOrName";
const langflowId = process.env.NEXT_PUBLIC_LANGFLOW_ID || "defaultLangflowId";
const applicationToken =
  process.env.NEXT_PUBLIC_APPLICATION_TOKEN || "defaultApplicationToken";

const langflowClient = new LangflowClient("", applicationToken);

export interface Message {
  role: string;
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
}

export default function Chat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedChats = localStorage.getItem("chats");
    if (storedChats) {
      setChats(JSON.parse(storedChats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      name: `${new Date().toLocaleString()}`,
      messages: [
        {
          role: "assistant",
          content: "Hello! How can I help you today? 👋",
          timestamp: new Date(),
        },
      ],
    };
    setChats([...chats, newChat]);
    setCurrentChatId(newChat.id);
    if (isMobileView) {
      setIsSidebarOpen(false);
    }
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter((chat) => chat.id !== chatId);
    setChats(updatedChats);
    if (currentChatId === chatId) {
      setCurrentChatId(updatedChats[0]?.id || null);
    }
  };

  const sendMessage = async (input: string) => {
    if (!input.trim() || isLoading || !currentChatId) return;

    const currentChat = chats.find((chat) => chat.id === currentChatId);
    if (!currentChat) return;

    const newMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const updatedMessages = [...currentChat.messages, newMessage];
    const updatedChats = chats.map((chat) =>
      chat.id === currentChatId ? { ...chat, messages: updatedMessages } : chat
    );

    setChats(updatedChats);
    setIsLoading(true);

    try {
      const tweaks = {
        "ChatInput-Uwwvb": {},
        "ParseData-4Sb3V": {},
        "Prompt-ZgxaM": {},
        "SplitText-nOYZS": {},
        "ChatOutput-5quGo": {},
        "AstraDB-uQPjR": {},
        "AstraDB-0uLmd": {},
        "File-7PLSY": {},
        "AzureOpenAIEmbeddings-Lp3gW": {},
        "AzureOpenAIEmbeddings-7xuTF": {},
        "GoogleGenerativeAIModel-Sf9GG": {},
        "DuckDuckGoSearch-j8oGC": {},
        "Agent-0fISA": {},
      };
      const response = await langflowClient.runFlow(
        flowIdOrName,
        langflowId,
        input,
        "chat",
        "chat",
        tweaks,
        false
      );

      if (response && response.outputs) {
        const flowOutputs = response.outputs[0];
        const firstComponentOutputs = flowOutputs.outputs[0];
        const output = firstComponentOutputs.outputs.message;

        const assistantMessage: Message = {
          role: "assistant",
          content: output.message.text,
          timestamp: new Date(),
        };

        const finalUpdatedChats = chats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...updatedMessages, assistantMessage] }
            : chat
        );

        setChats(finalUpdatedChats);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, an error occurred. Please try again.",
        timestamp: new Date(),
      };

      const finalUpdatedChats = chats.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...updatedMessages, errorMessage] }
          : chat
      );

      setChats(finalUpdatedChats);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  return (
    <TooltipProvider>
      <div
        className={`flex h-screen ${
          isDarkMode
            ? "bg-gradient-to-b from-zinc-900 to-black text-white"
            : "bg-gradient-to-b from-gray-100 to-white text-black"
        }`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          isMobileView={isMobileView}
          onClose={closeSidebar}
          isdarkMode={isDarkMode}
          chats={chats}
          currentChatId={currentChatId}
          onChatSelect={(chatId) => {
            setCurrentChatId(chatId);
            if (isMobileView) {
              setIsSidebarOpen(false);
            }
          }}
          onNewChat={createNewChat}
          onDeleteChat={deleteChat}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-1 flex flex-col relative">
          <Header
            toggleSidebar={toggleSidebar}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />
          {currentChatId ? (
            <>
              <MessageList
                messages={currentChat?.messages || []}
                isLoading={isLoading}
              />
              <InputForm
                onSendMessage={sendMessage}
                isLoading={isLoading}
                isDarkMode={isDarkMode}
              />
            </>
          ) : (
            <WelcomeScreen onNewChat={createNewChat} isDarkMode={isDarkMode} />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
