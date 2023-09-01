import ChatCanvas from "../(components)/chat-canvas";
import AnimalMenu from "../(components)/animals-menu";
import { Avatar } from "@/src/app/(components)/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import WelcomeCard from "../(components)/cards/welcome-card";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default async function Page() {
  return (
    <main className="px-6">
      <div className="w-full flex justify-center">
        <WelcomeCard />
      </div>
      {/* <ChatCanvas /> */}
      {/* <AnimalMenu /> */}
    </main>
  );
}
