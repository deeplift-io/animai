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
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useGetVisitorHook } from "@/src/hooks/useGetVisitorHook";

export default function Page() {
  const [userProfile, setUserProfile] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [visitor, setVisitor] = useState(null);
  const [fingerPrintId, setFingerPrintId] = useState(null);
  const {data: visitorData} = useGetVisitorHook(fingerPrintId);

  console.log(visitorData);

  useEffect(() => {
    const getVisitorFingerprint = async () => {
      const FingerprintJS = await import("@fingerprintjs/fingerprintjs");
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerPrintId(result.visitorId);
    };
    getVisitorFingerprint();
  }, []);

  useEffect(() => {
    if (!fingerPrintId) return;
    if (visitorData) return;

    const addVisitor = async () => {
      const _visitor = new Visitor(fingerPrintId);
      const newVisitor = await _visitor.addVisitor({
        fingerprint_id: fingerPrintId,
      });

      console.log(newVisitor);
    }

    addVisitor();
  }, [fingerPrintId]);

  const supabase = createClientComponentClient();

  const handleInserts = (payload) => {
    setVisitor(payload.new);
  };

  supabase
    .channel("visitors")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "visitors" },
      handleInserts
    )
    .subscribe();

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

  if (!visitorData) {
    return (
      <>
        <div className="w-full flex flex-col items-center justify-center h-screen">
          <div className="text-2xl">
            <LoadingSpinner />
          </div>
        </div>
      </>
    );
  }

  if (!userProfile && visitorData) {
    return (
      <>
        <>
          <ChatCanvasGuest visitor={visitorData} />
        </>
      </>
    );
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
