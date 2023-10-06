"use client";
import { motion } from "framer-motion";
import LogoutButton from "../(auth)/components/logout-button";
import UserMenu from "./user-menu";

export default function MainNav() {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(-10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      className="sticky top-0 z-10 border-b border-gray-300"
    >
      <nav className="flex flex-row justify-between px-2 py-2 md:px-4">
        <div className="font-logo text-slate-700 text-xl align-middle pt-1.5 font-medium">Animai</div>
        <div className="inline-flex space-x-2 items-center">
          <LogoutButton />
          <UserMenu />
        </div>
      </nav>
    </motion.div>
  );
}
