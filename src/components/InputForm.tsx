import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Paperclip, Send } from "lucide-react";

interface InputFormProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isDarkMode: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  onSendMessage,
  isLoading,
  isDarkMode,
}) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div
      className={`p-4 border-t ${
        isDarkMode ? "border-black" : "border-zinc-700"
      }`}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative max-w-3xl mx-auto"
      >
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          className="w-full pr-32 pl-12 py-3 bg-zinc-800 backdrop-blur-sm border-zinc-700 rounded-xl  text-zinc-200 min-h-[50px] max-h-[200px] overflow-y-auto"
          rows={1}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-3 top-3 w-6 h-6 text-zinc-400 hover:text-white"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Attach file</TooltipContent>
        </Tooltip>
        <div className="absolute right-3 top-2 flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                className="w-8 h-8 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
                disabled={!input.trim() || isLoading}
                onClick={handleSendMessage}
              >
                <Send className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </form>
    </div>
  );
};
