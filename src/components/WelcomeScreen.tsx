import React, { useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onNewChat: () => void;
  isDarkMode: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNewChat,
  isDarkMode,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (question: string, index: number) => {
    navigator.clipboard.writeText(question).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    });
  };
  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center p-8 space-y-12">
        <div className="text-center space-y-4">
          <h1
            className={`text-5xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome to Luna
          </h1>
          <p
            className={`text-xl ${
              isDarkMode ? "text-zinc-400" : "text-zinc-800"
            } `}
          >
            Your AI-powered analytics companion
          </p>
        </div>

        <Button
          onClick={onNewChat}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Sparkles className="w-6 h-6" />
          <span>Start a New Conversation</span>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto pb-8">
          {[
            "Which type of content has the highest likes?",
            "How many total categories do we have?",
            "How many posts have average likes more than reels?",
            "Which category has more views but fewer likes compared to others?",
          ].map((question, index) => (
            <div
              key={index}
              className={`bg-zinc-800 p-6 rounded-lg cursor-pointer border border-zinc-700 flex gap-2`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-lg hover:bg-zinc-800"
                    onClick={() => {
                      handleCopy(question, index);
                    }}
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy</TooltipContent>
              </Tooltip>
              <p className="text-zinc-200">{question}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
