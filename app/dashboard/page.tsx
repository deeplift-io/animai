import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import LogoutButton from "../(auth)/components/logout-button";
import { cookies } from "next/headers";
import ChatCanvas from "./components/chat-canvas";
import AnimalsSelector from "./components/animals-selector";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default async function Page() {
  return (
    <main className="px-6">
      <ChatCanvas />
      <div className="fixed bottom-2 right-2">
        <AnimalsSelector />
      </div>
    </main>
  );
}
