"use client";
import ChatCanvas from "../(components)/chat-canvas";
import AnimalMenu from "../(components)/animals-menu";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import OnboardingCard from "../(components)/cards/onboarding-card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  const [userProfile, setUserProfile] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const supabase = createClientComponentClient();

  useEffect(() => {
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
  }, [onboardingComplete]);

  if (!userProfile) {
    return null;
  }

  return (
    <main className="w-full">
      {userProfile?.onboarded_at ? (
        <>
        {/* <div className="text-2xl">Welcome {userProfile.name}, </div> */}
        <div className="h-full">
          <ChatCanvas />
        </div>
        </>
      ) : (
        <OnboardingCard onComplete={() => setOnboardingComplete(true)} />
      )}
      {/* <AnimalMenu /> */}
    </main>
  );
}