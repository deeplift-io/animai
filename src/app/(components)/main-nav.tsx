"use client";
import { motion } from "framer-motion";
import LogoutButton from "../(auth)/components/logout-button";
import UserMenu from "./user-menu";

export default function MainNav() {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(-10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
    >
      <nav className="w-full py-2 inline-flex justify-between px-6 backdrop-blur bg-white/50 border-b border-slate-300">
        <div className="font-logo text-slate-700 text-xl align-middle pt-1.5 font-medium">Animai</div>
        <div>
          <UserMenu />
          {/* <LogoutButton /> */}
        </div>
      </nav>
    </motion.div>
  );
}
