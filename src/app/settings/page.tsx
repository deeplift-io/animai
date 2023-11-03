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
import LoadingPulse from "@/components/ui/loading-pulse";

export default function Page() {
  return (
    <>
    Here are the settings
    </>
  );
}
