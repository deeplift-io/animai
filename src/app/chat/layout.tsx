import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import MainNav from "../(components)/main-nav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { HistoryIcon } from "lucide-react";
import { ConversationsSlideover } from "../(components)/slide-overs/conversations-slideover";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  login: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div id="__next">
      <div className="overflow-hidden w-full h-full relative flex z-0">
        <div className="relative flex h-full max-w-full flex-1 overflow-hidden">
          <div className="flex h-full max-w-full flex-1 flex-col">
            <MainNav session={session} />
            <div className="flex flex-row h-full max-w-full flex-1">
              <ConversationsSlideover session={session} />
              <div className="flex h-full max-w-full w-full">{props.children}{props.login}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const GradientBackground = () => (
  <div
    className="absolute top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl"
    aria-hidden="true"
  >
    <div
      className="aspect-[801/1036] w-screen bg-gradient-to-r from-green-500 via-teal-500 to-sky-600 opacity-10 overflow-hidden"
      styles={{
        clipPath:
          "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
      }}
    />
  </div>
);
