"use client";

import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScrollToBottom from "react-scroll-to-bottom";
import Markdown from 'react-markdown'

import GradientCard from "@/components/ui/gradient-card";
import {  SendIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const starterPrompts = [
  {
    title: "My pet isn't eating or drinking",
    text: "How long can they go without food or water?",
    agent_instruction: "Ask about the type of pet, age, and weight.",
  },
  {
    title: "I want to improve my pet's health",
    text: "Can you create a health plan for my pet?",
    agent_instruction:
      "Ask about the type of pet, age, weight and what their current regime is.",
  },
  {
    title: "I think my pet ingested something toxic",
    text: "What are signs should I watch for?",
    agent_instruction:
      "Ask about the type of pet, age, weight and what they ingested.",
  },
  {
    title: "My pet is having trouble breathing",
    text: "What should I do?",
    agent_instruction:
      "Ask about the type of pet, age, weight and if they might have ingested something.",
  },
];

export default function ChatCanvasGuest({ visitor }: { visitor: string }) {
  const router = useRouter();
  const [initialPrompt, setInitialPrompt] = useState("");
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ initialInput: initialPrompt, api: "/api/chat-guest", body: { visitor: visitor } });

  const handleStarterPrompt = (prompt) => {
    if (visitor.message_allowance < 1) {
      router.push("/sign-in");
      return;
    }
    const promptContent = `${prompt.title} ${prompt.text}`;
    handleInputChange({ target: { value: promptContent } });
    setInitialPrompt(prompt.agent_instruction);

    const mockEvent: React.FormEvent<HTMLFormElement> = {
      nativeEvent: new Event("submit"),
      preventDefault: () => {},
      target: {
        value: promptContent,
      },
    } as any;

    setTimeout(() => {}, 500);

    // Call handleSubmit
    handleSubmit(mockEvent);
  };

  const userRestricted = visitor.message_allowance < 1;

  return (
    <div className="h-full w-full overflow-auto transition-width flex-1">
      <div className="flex h-full">
        <div className="flex-1 overflow-hidden">
          <ScrollToBottom className="h-full no-scrollbar">
            {messages.length > 0 && <div className="flex flex-col">
              {messages.map((message) => (
                <ConversationMessage
                  key={message.id}
                  message={message}
                />
              ))}
              <div className="h-[10rem] md:h-48 flex-shrink-0"></div>
            </div>}
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center h-full"
              >
                <div className="flex flex-col items-center px-2 md:px-0 h-full pt-12 md:pt-32">
                  <div className="text-3xl text-slate-700 pb-4">
                    Welcome to{" "}
                    <span className="font-logo font-medium">Animai</span>
                  </div>
                  <div className="max-w-md text-center text-slate-600 text-xl pb-12">
                    {`If you're worried about your pet, you're in the right place. Describe the issue, and I'll provide guidance.`}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 px-2 md:px-0 max-w-2xl w-full">
                    {starterPrompts.map((prompt, i) => {
                      return (
                        <motion.div
                          onClick={() => {
                            handleStarterPrompt(prompt);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{
                            opacity: 0,
                            transform: "translateY(-10px)",
                          }}
                          animate={{ opacity: 1, transform: "translateY(0px)" }}
                          transition={{ delay: i * 0.3 }}
                          key={i}
                        >
                          <GradientCard colors={[ 'bg-gray-50', 'bg-white', 'bg-gray-50' ]}>
                            <div className="font-medium text-sm text-gray-600">
                              {prompt.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {prompt.text}
                            </div>
                          </GradientCard>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </ScrollToBottom>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2 md:pl-2 md:w-[calc(100%-.5rem)]">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ delay: 0.1 }}
          className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
        >
          <div className="relative flex h-full flex-1 items-stretch md:flex-col">
            <div className="flex w-full items-center flex-col">
            <div className="mb-2 bg-gradient-to-bl from-indigo-800 via-indigo-700 to-indigo-800 px-2 text-indigo-50 rounded-full self-start shadow shadow-indigo-100 border border-indigo-500">{visitor?.message_allowance} messages remaining</div>
                {userRestricted ?
                <div className="flex flex-col w-full flex-grow relative border bg-slate-50 border-gray-300 focus:border-indigo-700 p-4 rounded-lg">
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="text-2xl font-bold text-gray-600">🔒</div>
                    <div className="text-gray-600 text-sm">Message limit reached</div>
                    <div>Please <Link className="underline" href="/sign-in">sign in</Link> to keep using our service. No credit card required.</div>
                  </div>
                </div> : 
                <div className="flex flex-col w-full flex-grow relative border bg-white border-gray-300 focus:border-indigo-700 p-4 rounded-lg">
                  <textarea
                    id="prompt-textarea"
                    className="ring-0 outline-none w-full h-full resize-none rounded-lg border-white bg-transparent"
                    autoFocus
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit(e);
                      }
                    }}
                    placeholder="Ask Animai anything you want about your pet."
                  ></textarea>
                  <Button
                    variant="ghost"
                    className="absolute right-0 bottom-0 m-2 group"
                    isLoading={isLoading}
                    onClick={(e) => handleSubmit(e)}
                  >
                    <SendIcon className="text-gray-600 group-hover:text-indigo-500" />
                  </Button>
                </div>}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const ConversationMessage = ({
  message,
}: {
  message: any;
}) => {
  return (
    <div id="conversation" className="group w-full border-b border-gray-200 transition-all">
      <div className="p-4 justify-center text-base md:gap-6 md:py-6 m-auto">
        <div
          className={`${
            message.role === "user" ? "md:flex-row-reverse" : "md:flex-row"
          } flex flex-1 flex-col gap-4 text-base mx-auto md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl`}
        >
          <div className="flex-shrink-0 flex flex-col relative items-start md:items-end">
            <div className="w-full">
              <div
                className={`flex flex-row sticky top-0 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "user" ? (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-200 to-lime-200 border border-emerald-200" />
                ) : (
                  <Avatar>
                    <AvatarFallback name={message.name} />
                    <AvatarImage src="/logo/Favicon.svg" />
                  </Avatar>
                )}
              </div>
            </div>
          </div>
          <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 gizmo:w-full md:gap-3 lg:w-[calc(100%-115px)] gizmo:text-gizmo-gray-600 gizmo:dark:text-gray-300">
            <div className="flex flex-grow flex-col gap-3 max-w-full">
              <div
                className={`min-h-[20px] flex flex-col gap-3 overflow-x-auto whitespace-pre-wrap break-words`}
              >
                <div
                  className={`${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
