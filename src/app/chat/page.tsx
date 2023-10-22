"use client";
import ChatCanvas from "../(components)/chat-canvas";
import AnimalMenu from "../(components)/animals-menu";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import OnboardingCard from "../(components)/cards/onboarding-card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Visitor } from "@/src/services/visitor";
import { useVisitorStore } from "@/src/lib/stores/visitor-store";
import ChatCanvasGuest from "../(components)/chat-canvas-guest";

export default function Page() {
  const [userProfile, setUserProfile] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [visitor, setVisitor] = useState(null);

  useEffect(() => {
    const getVisitorData = async () => {
      const FingerprintJS = await import("@fingerprintjs/fingerprintjs");
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const visitorId = result.visitorId;
      const visitor = new Visitor(visitorId);
      const visitorData = await visitor.getVisitor();

      if (!visitorData || visitorData.length === 0) {
        const newVisitor = await visitor.addVisitor({
          fingerprint_id: visitorId,
        });
        useVisitorStore.getState().setActiveVisitor(newVisitor);
        setVisitor(newVisitor);
      } else {
        useVisitorStore.getState().setActiveVisitor(visitorData[0]);
        setVisitor(visitorData[0]);
        console.log('set visitor now');
      }
    };
    getVisitorData();
  }, []);

  const supabase = createClientComponentClient();

  const handleInserts = (payload) => {
    setVisitor(payload.new);
  }

  supabase
  .channel('visitors')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'visitors' }, handleInserts)
  .subscribe()

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
    return <ChatCanvasGuest visitor={visitor} />;
  }

  return (
    <>
      {userProfile?.onboarded_at ? (
        <>
          {/* <div className="text-2xl">Welcome {userProfile.name}, </div> */}
          <ChatCanvas />
        </>
      ) : (
        <OnboardingCard onComplete={() => setOnboardingComplete(true)} />
      )}
      {/* <AnimalMenu /> */}
    </>
  );
}
