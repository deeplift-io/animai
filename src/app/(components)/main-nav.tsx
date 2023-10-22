"use client";
import { motion } from "framer-motion";
import LogoutButton from "../(auth)/components/logout-button";
import UserMenu from "./user-menu";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

export default function MainNav({ session }: { session: Session | null }) {
  if (!session)
    return (
      <motion.div
        initial={{ opacity: 0, transform: "translateY(-10px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        className="sticky top-0 z-10 border-b border-gray-300 backdrop-blur bg-white/50"
      >
        <nav className="flex flex-row justify-between px-2 py-2 md:px-4">
          <div className="font-logo text-slate-700 text-xl align-middle pt-1.5 font-medium">
            Animai
          </div>
          <div className="inline-flex space-x-2 items-center">
            <Button variant="special">Add my animal</Button>
          </div>
        </nav>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(-10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      className="sticky top-0 z-10 border-b border-gray-300 backdrop-blur bg-white/50"
    >
      <nav className="flex flex-row justify-between px-2 py-2 md:px-4">
        <div className="font-logo text-slate-700 text-xl align-middle pt-1.5 font-medium">
          Animai
        </div>
        <div className="inline-flex space-x-2 items-center">
          <LogoutButton />
          <UserMenu />
        </div>
      </nav>
    </motion.div>
  );
}
