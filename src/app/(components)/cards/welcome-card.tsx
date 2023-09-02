"use client";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/app/(components)/ui/avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as React from "react";
import { Button } from "../ui/button";

const WelcomeCard = () => {
  const supabase = createClientComponentClient();
  const [userProfile, setUserProfile] = React.useState(null);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();
      if (error) {
        console.error("Error fetching user profile: ", error);
      } else {
        setUserProfile(data);
      }
    };

    fetchUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userProfile) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      className="max-w-xl w-full rounded bg-zinc-50 shadow border border-gray-300"
    >
        <div className="p-4 flex justify-center flex-col items-center">
      <div className="mb-6">
        <Avatar>
          <AvatarImage src={userProfile?.avatar_url} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-gray-600 text-sm">Welcome {userProfile?.name}</p>
      <p className="text-lg font-medium text-gray-700">
        To get started, let&apos;s add your first pet.
      </p>
      </div>
      <div className="w-full rounded-b border-t cursor-pointer hover:bg-gradient-to-br from-fuchsia-50 via-purple-50 to-indigo-50">
        <div className="py-2 w-full text-center font-medium text-gray-700 hover:text-gray-800">
            Add my animal
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
