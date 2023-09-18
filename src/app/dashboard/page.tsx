import ChatCanvas from "../(components)/chat-canvas";
import AnimalMenu from "../(components)/animals-menu";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import OnboardingCard from "../(components)/cards/onboarding-card";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default async function Page() {
  return (
    <main className="px-6">
      <div className="w-full flex justify-center">
        <OnboardingCard />
      </div>
      {/* <ChatCanvas /> */}
      {/* <AnimalMenu /> */}
    </main>
  );
}
