import React, { useRef, useEffect, useState } from "react";
import { Message } from "./Chat";
import { MessageItem } from "./MessageItem";
import { AnimatePresence, motion } from "framer-motion";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loadingText, setLoadingText] = useState("Thinking");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingText((current) => {
          if (current === "Thinking...") return "Thinking";
          return current + ".";
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div className="flex-1 overflow-y-auto py-4 px-4 md:px-6 space-y-6">
      <AnimatePresence initial={false}>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MessageItem message={message} />
          </motion.div>
        ))}
      </AnimatePresence>
      {isLoading && (
        <motion.div
          className="flex items-start gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
            <div className="w-4 h-4 border-t-2 border-blue-400 rounded-full animate-spin"></div>
          </div>
          <div className="bg-zinc-800/80 backdrop-blur-sm rounded-2xl px-4 py-2.5 text-white">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-blue-400">
                {loadingText}
              </span>
              <motion.div
                className="w-1 h-1 bg-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
