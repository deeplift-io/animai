"use client"

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useChat } from "ai/react";
import { useState } from "react";
import { motion } from "framer-motion";
import ScrollToBottom from "react-scroll-to-bottom";
import GradientCard from "@/components/ui/gradient-card";
import { SendIcon } from "lucide-react";
import { Conversation } from "@/src/lib/types";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ConversationMessage from "./conversation-message";
import { useGetAuthProfileHook } from "@/src/hooks/useGetAuthProfileHook";

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

export default function Chat({
  conversation,
}: {
  conversation: Conversation | null;
}) {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [initialPrompt, setInitialPrompt] = useState("");
  const supabase = createClientComponentClient();
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } =
    useChat({
      initialInput: initialPrompt,
      body: { conversationId: conversation?.id },
    });

  const {data: profile} = useGetAuthProfileHook(supabase.auth.getUser()?.id);
  console.log(profile);

  const handleStarterPrompt = (prompt) => {
    const promptContent = `${prompt.title} ${prompt.text}`;
    setInitialPrompt(prompt.agent_instruction);
    append({
      role: "user",
      content: promptContent,
    });
  };

  const activeMessages = [
    ...(conversation?.messages || []),
    ...(messages || []),
  ];

  return (
    <div className="h-full w-full overflow-auto transition-width flex-1">
      <div className="flex h-full">
        <div className="flex-1 overflow-hidden">
          <ScrollToBottom className="h-full no-scrollbar">
            {activeMessages.length > 0 && (
              <div className="flex flex-col">
                {activeMessages.map((message) => (
                  <ConversationMessage
                    key={message.id}
                    message={message}
                    profile={profile}
                  />
                ))}
                <div className="h-[10rem] md:h-48 flex-shrink-0"></div>
              </div>
            )}
            {activeMessages.length === 0 && !initialPrompt && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center h-full"
              >
                <div className="flex flex-col items-center justify-center px-2 md:px-0 h-full">
                  <div className="text-lg md:text-2xl text-slate-700">
                    Welcome back {profile?.name}!
                  </div>
                  <div className="max-w-md text-center text-gray-400 pb-8">
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
                          <GradientCard
                            colors={["bg-gray-50", "bg-white", "bg-gray-50"]}
                          >
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
              <div className="flex flex-col w-full flex-grow shadow relative border bg-white border-gray-300 focus:border-indigo-700 p-4 rounded-lg">
                <textarea
                  id="prompt-textarea"
                  className="ring-0 outline-none w-full h-full resize-none rounded-lg border-white bg-transparent"
                  autoFocus
                  value={input}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Ask Animai anything you want about your pet."
                ></textarea>
                {isLoading ? (
                  <div className="absolute right-0 bottom-0 py-4 px-2">
                    <LoadingSpinner color="text-gray-600" />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 bottom-0 m-2 group"
                    isLoading={isLoading}
                    onClick={(e) => handleSubmit(e)}
                  >
                    <SendIcon className="text-gray-600 group-hover:text-indigo-500" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
