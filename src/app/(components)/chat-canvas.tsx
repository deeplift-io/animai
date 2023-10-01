"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Chat() {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, complete } =
    useChat({ initialInput: selectedAnimal?.seed_prompt });
  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchAnimalProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      const { data: animals, error: latestAnimalError } = await supabase
        .from("animals") //table name
        .select("*") //columns to select from the database
        .eq("profile_id", user?.id)
        .order("created_at", { ascending: false });

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
          <div className="flex flex-col text-sm dark:bg-gray-800 overflow-scroll h-full no-scrollbar">
            {messages.map((message) => (
              <ConversationMessage key={message.id} message={message} />
            ))}
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0 }}
               className="flex flex-col items-center h-full">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-2xl text-gray-400">
                    No messages yet
                  </div>
                  <div className="text-sm text-gray-400">
                    Select an animal to talk about or ask any question you like
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2 md:pl-2 md:w-[calc(100%-.5rem)]">
        <div className="lg:max-w-2xl xl:max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, transform: "translateY(-10px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-500 pb-2"
          >
            Select an animal to talk about
          </motion.div>
          <div className="flex items-center justify-center flex-row space-x-2 pb-4">
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
        </div>
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
                  placeholder="Ask your question here..."
                  // className="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 gizmo:md:py-3.5 pl-3 md:pl-4"
                  styles="max-height: 200px; height: 56px; overflow-y: hidden;"
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

const ConversationMessage = ({ message }: { message: any }) => {
  return (
    <div id="conversation" className="group w-full">
      <div className="p-4 justify-center text-base md:gap-6 md:py-6 m-auto">
        <div className="flex flex-1 gap-4 text-base mx-auto md:gap-6 gizmo:gap-3 gizmo:md:px-5 gizmo:lg:px-1 gizmo:xl:px-5 md:max-w-2xl lg:max-w-[38rem] gizmo:md:max-w-3xl gizmo:lg:max-w-[40rem] gizmo:xl:max-w-[48rem] xl:max-w-3xl }">
          <div className="flex-shrink-0 flex flex-col relative items-end">
            <div>
              <div className="relative flex">
                {message.role === "user" ? (
                  <Badge className="mr-2" variant="default">
                    Tom
                  </Badge>
                ) : (
                  <Badge className="mr-2" variant="secondary">
                    Animai
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full gizmo:top-1 gizmo:-ml-6 invisible">
              <button className="dark:text-white disabled:text-gray-300 dark:disabled:text-gray-400">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon-xs"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <span className="flex-grow flex-shrink-0 tabular-nums">
                1 / 1
              </span>
              <button
                disabled=""
                className="dark:text-white disabled:text-gray-300 dark:disabled:text-gray-400"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon-xs"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 gizmo:w-full md:gap-3 lg:w-[calc(100%-115px)] gizmo:text-gizmo-gray-600 gizmo:dark:text-gray-300">
            <div className="flex flex-grow flex-col gap-3 max-w-full">
              <div className="min-h-[20px] flex flex-col items-start gap-3 overflow-x-auto whitespace-pre-wrap break-words">
                <div className="">{message.content}</div>
              </div>
            </div>
            <div className="text-gray-400 flex self-end lg:self-center justify-center gizmo:lg:justify-start mt-2 gizmo:mt-0 visible lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 gap-2 md:gap-3 gizmo:absolute gizmo:right-0 gizmo:top-1/2 gizmo:-translate-y-1/2 gizmo:transform">
              <button className="p-1 gizmo:pl-0 rounded-md disabled:dark:hover:text-gray-400 dark:hover:text-gray-200 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 md:invisible md:group-hover:visible">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon-sm"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </div>
            <div className="flex justify-between empty:hidden lg:block"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
