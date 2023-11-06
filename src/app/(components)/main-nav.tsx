"use client";
import { motion } from "framer-motion";
import LogoutButton from "../(auth)/components/logout-button";
import UserMenu from "./user-menu";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar } from "@radix-ui/react-avatar";
import AvatarDropdownMenu from "./avatar-dropdown-menu";
import { ArrowRightIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { PlusCircle, SearchIcon } from "lucide-react";
import { CommandMenu } from "./command-menu";

export default function MainNav({ session }: { session: Session | null }) {
  if (!session)
    return (
      <motion.div
        initial={{ opacity: 0, transform: "translateY(-10px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        className="fixed w-full top-0 z-10 border-0 border-gray-300 backdrop-blur-sm"
      >
        <nav className="flex flex-row justify-between items-center px-2 py-2 md:px-4">
          <div className="font-logo text-slate-700 text-xl align-start pt-1.5 font-medium">
            Animai
          </div>
          <div>
            <Link href="/sign-in">
              <div className="font-medium inline-flex space-x-2 items-center py-1 px-2 rounded-full bg-white bg-opacity-60 hover:bg-opacity-80 transition-all duration-200 backdrop-blur-lg text-gray-700 hover:text-gray-800">
                <div>Get started</div>
                <div>
                  <ArrowRightIcon />
                </div>
              </div>
            </Link>
          </div>
        </nav>
      </motion.div>
    );

  return (
    <>
    <CommandMenu />
    <motion.div
      initial={{ opacity: 0, transform: "translateY(-10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      className="fixed w-full top-0 z-10 border-0 border-gray-300 backdrop-blur-sm"
    >
      <nav className="flex flex-row justify-between px-2 py-2 md:px-4">
        <Link href="/">
          <div className="font-logo text-slate-700 text-xl align-middle pt-1.5 font-medium">
            Animai
          </div>
        </Link>
        <div className="inline-flex space-x-2 items-center">
          <LinkItem href="/animals/create"><div><PlusCircle className="w-4 h-4" /></div><div>Add animal</div></LinkItem>
          {/* <LinkItem href="/animals/create"><div><SearchIcon className="w-4 h-4" /></div><div>Search</div></LinkItem> */}
          <AvatarDropdownMenu session={session} />
        </div>
      </nav>
    </motion.div>
    </>
  );
}

const LinkItem = ({ href, children }: { href: string; children: any }) => {
  return (
    <Link href={href}>
      <div className="font-medium inline-flex space-x-2 items-center py-1 px-2 rounded-full bg-white bg-opacity-0 hover:bg-opacity-80 transition-all duration-200 backdrop-blur-lg text-gray-700 hover:text-gray-800">
        {children}
      </div>
    </Link>
  );
};
