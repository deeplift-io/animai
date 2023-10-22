"use client";

import { useConversationHook } from "@/src/hooks/useConversationsHook";
import { Conversation } from "@/src/lib/types";
import { History, HistoryIcon, MoveLeftIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { formatRelative } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/supabase-js";

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

export const ConversationsSlideover = ({ session }: { session: Session | null }) => {
  const slideoverWidth = 200;
  const { data: conversations, isLoading } = useConversationHook();
  const [slideoverOpen, setSlideoverOpen] = useState(false);

  return (
    <div className="fixed z-10 md:relative h-full">
      <motion.div
        initial={{ opacity: 0, transform: "translateX(-10px)" }}
        animate={{ opacity: 1, transform: "translateX(0px)" }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <Button
          variant="outline"
          className="m-2 z-10 pointer-events-all absolute"
          onClick={() => setSlideoverOpen(!slideoverOpen)}
        >
          <div className="text-2xl">💬</div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {slideoverOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: slideoverWidth }}
            className="w-full h-full overflow-y-auto"
          >
            <div>
              <Button
                variant="outline"
                className="px-2 mt-2 z-10 pointer-events-all absolute -right-20"
                onClick={() => setSlideoverOpen(!slideoverOpen)}
              >
                <div className="text-2xl inline-flex items-center space-x-2">
                  <div>
                    <MoveLeftIcon />
                  </div>{" "}
                  <div>💬</div>
                </div>
              </Button>
            </div>
            <motion.div
              variants={sideVariants}
              initial="closed"
              animate={{ width: slideoverWidth }}
              exit="closed"
              className="border-r border-gray-300 p-2 absolute z-10 h-full bg-white"
            >
              {session ? (
                <>
                  {conversations && (
                    <div className="h-full overflow-auto">
                      <ConversationsList conversations={conversations} />
                    </div>
                  )}
                </>
              ) : (
                <div className="relative h-full">
                  <motion.div
                    initial={{ opacity: 0, transform: "translateX(-10px)" }}
                    animate={{ opacity: 1, transform: "translateX(0px)" }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                    className="absolute top-1/3"
                  >
                    <div className="p-2 border border-gray-300 shadow bg-slate-50 rounded-lg">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl mb-2">👋</div>
                        <div className="text-center text-gray-700">
                          Sign in to see your saved conversations
                        </div>
                        <div className="pt-6">
                          <Button variant="special">Get started</Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConversationsList = ({ conversations }: Conversation[]) => {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center h-full">
        <div className="text-2xl text-slate-500">No conversations yet</div>
        <div className="text-sm text-slate-400">
          Select an animal to talk about or ask any question you like
        </div>
      </div>
    );
  }

  const groupedConversations = conversations.reduce((groups, conversation) => {
    const now = new Date();
    const date = new Date(conversation.created_at);
    const formatRelativeLocale = {
      lastWeek: "'Last' eeee",
      yesterday: "'Yesterday'",
      today: "'Today'",
      tomorrow: "'Tomorrow'",
      nextWeek: "'Next' eeee",
      other: "dd.MM.yyyy",
    };

    const locale = {
      ...enGB,
      formatRelative: (token) => formatRelativeLocale[token],
    };

    const formattedDate = formatRelative(date, now, { locale });
    if (!groups[formattedDate]) {
      groups[formattedDate] = [];
    }
    groups[formattedDate].push(conversation);
    return groups;
  }, {} as { [key: string]: Conversation[] });

  console.log("grouped conversations", groupedConversations);

  return Object.entries(groupedConversations).map(([date, conversations]) => (
    <div key={date}>
      <div className="text-xs upper text-gray-500 ml-2 my-2">{date}</div>
      {conversations.map((conversation) => (
        <div className="flex flex-col overflow-auto" key={conversation.id}>
          <div className="flex flex-row items-center py-3 rounded-lg cursor-pointer hover:bg-slate-200">
            <div className="ml-2 text-sm text-gray-700">
              {conversation.title ? conversation.title : "New conversation"}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {/* {conversation.messages.length} */}
          </div>
        </div>
      ))}
    </div>
  ));
};
