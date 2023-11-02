"use client";

import { useConversationHook } from "@/src/hooks/useConversationsHook";
import { Conversation } from "@/src/lib/types";
import { History, HistoryIcon, MoveLeftIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { formatRelative } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { Pencil2Icon, TriangleDownIcon } from "@radix-ui/react-icons";

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

export const ConversationsSlideover = ({
  session,
}: {
  session: Session | null;
}) => {
  const slideoverWidth = 300;
  const { data: conversations, isLoading } = useConversationHook();
  const [slideoverOpen, setSlideoverOpen] = useState(false);

  return (
    <div className="fixed z-10 md:relative h-full">
      {!slideoverOpen && (
        <motion.div
          initial={{ opacity: 0, transform: "translateX(-10px)" }}
          animate={{ opacity: 1, transform: "translateX(0px)" }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <Button
            variant="ghost"
            className="m-2 z-10 pointer-events-all absolute"
            onClick={() => setSlideoverOpen(!slideoverOpen)}
          >
            <div className="text-2xl">💬</div>
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {slideoverOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: slideoverWidth }}
            className="w-full h-full overflow-y-auto"
          >
            <div>
              <Button
                variant="ghost"
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
              className="z-10 h-full rounded-lg relative p-2"
            >
              <div className="bg-white rounded-xl shadow-lg h-[90%] border border-gray-300">
                {/* <div className="absolute blur-3xl opacity-40 -top-6 left-0 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full w-full h-24"></div> */}
                {session ? (
                  <>
                    <div className="h-full overflow-auto">
                      <div className="inline-flex justify-between items-center w-full px-3 py-1 text-gray-900">
                        <div className="text-sm">Conversations</div>
                        <div>
                          <Link href="/chat">
                          <Button size="icon" variant="ghost">
                            <Pencil2Icon className="h-4 w-4" />
                          </Button>
                          </Link>
                        </div>
                      </div>
                      <ConversationsList conversations={conversations} />
                    </div>
                  </>
                ) : (
                  <div className="relative h-full">
                    <motion.div
                      initial={{ opacity: 0, transform: "translateX(-10px)" }}
                      animate={{ opacity: 1, transform: "translateX(0px)" }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className="absolute top-1/3"
                    >
                      <div className="px-8">
                        <div className="flex flex-col items-center">
                          <div className="text-2xl mb-2">👋</div>
                          <div className="text-center text-gray-700">
                            You&apos;ll need to make an account to see saved
                            conversations.
                          </div>
                          <div className="px-2 py-1 rounded-lg bg-gray-50 text-gray-800 text-sm mt-2 border border-gray-200 font-medium">
                            No credit card required
                          </div>
                          <div className="pt-6">
                            <Link href="/sign-in">
                              <Button variant="special">Get started</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConversationsList = ({
  conversations,
}: {
  conversations: Conversation[] | null;
}) => {
  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col items-center h-full justify-center">
        <div className="px-8">
          <div className="flex flex-col items-center">
            <div className="text-2xl mb-2">🪹</div>
            <div className="text-center text-gray-700">
              No saved conversations yet
            </div>
          </div>
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

  return Object.entries(groupedConversations).map(([date, conversations]) => (
    <div key={date}>
      <div className="text-xs upper text-black ml-2 my-2 sticky top-1 bg-gray-200 bg-opacity-40 backdrop-blur-lg py-2 px-2 rounded-lg m-2 border border-gray-300">
        <div className="inline-flex justify-between items-center w-full">
          <div>{date}</div>
          <div>
            <TriangleDownIcon />
          </div>
        </div>
      </div>
      {conversations.map((conversation) => (
        <Link
          href={`/chat/${conversation.id}`}
          className="flex flex-col overflow-auto mx-2 my-1"
          key={conversation.id}
        >
          <div className="flex flex-row items-center py-3 rounded-lg cursor-pointer bg-white hover:bg-slate-50 hover:border-slate-200 border border-gray-300">
            <div className="ml-2 text-sm text-gray-700">
              {conversation.title ? conversation.title : "New conversation"}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {/* {conversation.messages.length} */}
          </div>
        </Link>
      ))}
    </div>
  ));
};
