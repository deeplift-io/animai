"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScrollToBottom from "react-scroll-to-bottom";
import GradientCard from "@/components/ui/gradient-card";

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

export default function Chat() {
  const [animals, setAnimals] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [initialPrompt, setInitialPrompt] = useState("");
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ initialInput: initialPrompt });
  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchAnimalProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: profileData, error: profileError } = await supabase
        .from("profiles") //table name
        .select("*") //columns to select from the database
        .eq("id", user?.id)
        .single();

      const { data: animals, error: latestAnimalError } = await supabase
        .from("animals") //table name
        .select("*") //columns to select from the database
        .eq("profile_id", user?.id)
        .order("created_at", { ascending: false });

      setProfile(profileData);
      setAnimals(animals);
    };

    fetchAnimalProfile();
  }, []);

  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(animal);
    // complete(animal.seed_prompt);
  };

  const handleStarterPrompt = (prompt) => {
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

  return (
    <div className="relative h-full w-full transition-width flex-1">
      <div className="flex h-full">
        <div className="flex-1 overflow-hidden">
          <ScrollToBottom className="h-full no-scrollbar">
            <div className="flex flex-col h-full">
              <div className="h-32 md:h-48 flex-shrink-0"></div>
              {messages.map((message) => (
                <ConversationMessage
                  key={message.id}
                  message={message}
                  profile={profile}
                />
              ))}
              <div className="h-32 md:h-48 flex-shrink-0"></div>
            </div>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center h-full"
              >
                <div className="flex flex-col items-center justify-center px-2 md:px-0 h-full">
                  <div className="text-2xl text-slate-500">
                    Welcome to{" "}
                    <span className="font-logo font-medium">Animai</span>
                  </div>
                  <div className="max-w-md text-center text-gray-400">
                    {`Greetings! If you're worried about your pet, you're in the right place. Describe the issue, and I'll provide guidance.`}
                  </div>
                  <div className="text-slate-400 pt-6 pb-4 self-start text-sm inline-flex items-center">
                    <div className="text-xl pr-1">❓</div>
                    <div>Here are some commonly asked questions:</div>
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
                          <GradientCard>
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
      <div className="absolute bottom-10 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2 md:pl-2 md:w-[calc(100%-.5rem)]">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ delay: 0.1 }}
          className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
        >
          <div className="relative flex h-full flex-1 items-stretch md:flex-col">
            <div className="w-full flex justify-end pb-2">
              <Badge variant="outline" className="text-sm border border-emerald-600 shadow-emerald-50 bg-white shadow text-gray-600">
                Free messages remaining: 3
              </Badge>
            </div>
            <div className="flex w-full items-center flex-col">
              <div className="flex flex-col w-full flex-grow relative border rounded-lg">
                <textarea
                  id="prompt-textarea"
                  className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 focus:shadow-indigo-50 resize-none w-full h-full"
                  autoFocus
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Ask your question here..."
                ></textarea>
                <Button
                  variant="link"
                  className="absolute right-0 bottom-0"
                  isLoading={isLoading}
                  onClick={(e) => handleSubmit(e)}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const ConversationMessage = ({
  message,
  profile,
}: {
  message: any;
  profile: any;
}) => {
  return (
    <div id="conversation" className="group w-full borders-b border-gray-300">
      <div className="p-4 justify-center text-base md:gap-6 md:py-6 m-auto">
        <div className={`${message.role === "user" ? 'md:flex-row-reverse' : "md:flex-row"} flex flex-1 flex-col gap-4 text-base mx-auto md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl`}>
          <div className="flex-shrink-0 flex flex-col relative items-start md:items-end">
            <div className="w-full">
              <div
                className={`relative flex flex-row ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "user" ? (
                  <Avatar>
                    <AvatarFallback name={profile?.name} />
                    <AvatarImage src={profile?.avatar_url} />
                  </Avatar>
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
                  {message.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
