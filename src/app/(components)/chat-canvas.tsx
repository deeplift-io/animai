"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Chat() {
  const [animals, setAnimals] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, complete } =
    useChat({ initialInput: selectedAnimal?.seed_prompt });
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

  return (
    <div className="flex h-full">
      <div className="flex overflow-hidden w-full">
        <div className="flex flex-col h-screen overflow-hidden w-full pb-52">
          <ScrollToBottom className="flex flex-col text-sm dark:bg-gray-800 overflow-scroll h-full no-scrollbar">
            {messages.map((message) => (
              <ConversationMessage key={message.id} message={message} profile={profile} />
            ))}
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0 }}
               className="flex flex-col items-center h-full">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-2xl text-slate-500">
                    No messages yet
                  </div>
                  <div className="text-sm text-slate-400">
                    Select an animal to talk about or ask any question you like
                  </div>
                </div>
              </motion.div>
            )}
          </ScrollToBottom>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2 md:pl-2 md:w-[calc(100%-.5rem)]">
        {messages.length === 0 && <div className="lg:max-w-2xl xl:max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, transform: "translateY(-10px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-500 pb-2 px-2 md:px-0 "
          >
            Select an animal to talk about
          </motion.div>
          <div className="grid grid-cols-3 gap-4 pb-4 px-2 md:px-0">
            {animals.map((animal, i) => {
              return (
                <motion.div
                  onClick={() => { 
                    handleAnimalSelect(animal);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, transform: "translateY(-10px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{ delay: i * 0.3 }}
                  className="bg-white p-2 w-full rounded-lg shadow border border-gray-300 flex flex-col text-gray-800 cursor-pointer hover:bg-gray-50"
                  key={animal.id}
                >
                  <div className="text-sm">{animal.name}</div>
                  <div className="text-xs">
                    {animal.type} {animal.breed}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>}
        <motion.div
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ delay: 0.1 }}
          className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
        >
          <div className="relative flex h-full flex-1 items-stretch md:flex-col">
            <div className="flex w-full items-center flex-col">
              <div className="flex flex-col w-full flex-grow relative border border-black/10 gizmo:dark:border-gray-100/10 dark:border-gray-900/50 dark:text-white rounded-xl gizmo:rounded-2xl shadow-xs dark:shadow-xs dark:bg-gray-700 bg-white gizmo:bg-[#F5F5F5] gizmo:shadow-[0_0_0_2px_rgba(255,255,255,0.95)] gizmo:dark:shadow-[0_0_0_2px_rgba(52,53,65,0.95)]">
                <Textarea
                  id="prompt-textarea"
                  autoFocus
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Ask your question here..."
                ></Textarea>
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

const ConversationMessage = ({ message, profile }: { message: any; profile: any }) => {
  return (
    <div id="conversation" className="group w-full">
      <div className="p-4 justify-center text-base md:gap-6 md:py-6 m-auto">
        <div className="flex flex-1 flex-col md:flex-row gap-4 text-base mx-auto md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl">
          <div className="flex-shrink-0 flex flex-col relative items-end">
            <div>
              <div className="relative flex">
                {message.role === "user" ? (
                  <Avatar>
                    <AvatarFallback
                      name={profile?.name}
                      />
                      <AvatarImage
                      src={profile?.avatar_url}
                      />
                  </Avatar>
                ) : (
                  <Avatar>
                  <AvatarFallback
                    name={message.name}
                    />
                    <AvatarImage src="/logo/Favicon.svg" />
                </Avatar>
                )}
              </div>
            </div>
          </div>
          <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 gizmo:w-full md:gap-3 lg:w-[calc(100%-115px)] gizmo:text-gizmo-gray-600 gizmo:dark:text-gray-300">
            <div className="flex flex-grow flex-col gap-3 max-w-full">
              <div className="min-h-[20px] flex flex-col items-start gap-3 overflow-x-auto whitespace-pre-wrap break-words">
                <div className="">{message.content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
