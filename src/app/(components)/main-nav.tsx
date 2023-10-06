"use client";
import { motion } from "framer-motion";
import LogoutButton from "../(auth)/components/logout-button";
import UserMenu from "./user-menu";

export default function MainNav() {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(-10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      className="fixed top-0 w-full p-4 z-10"
    >
      <nav className="flex flex-row justify-between">
        <div className="font-logo text-slate-700 text-xl align-middle pt-1.5 font-medium">Animai</div>
        <div className="inline-flex space-x-2 items-center">
          <LogoutButton />
          <UserMenu />
        </div>
      </nav>
    </motion.div>
  );
}
