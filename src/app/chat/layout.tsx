import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import MainNav from "../(components)/main-nav";
import { cookies } from "next/headers";
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
      <div className="absolute blur-3xl opacity-40 top-0 left-0 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-full w-full h-32"></div>
      <div className="overflow-hidden w-full h-full relative flex z-0">
        <div className="relative flex h-full max-w-full flex-1 overflow-hidden">
          <div className="flex h-full max-w-full flex-1 flex-col">
            <MainNav session={session} />
            <div className="flex flex-row h-full max-w-full flex-1 pt-12">
              <ConversationsSlideover session={session} />
              <div className="flex h-full max-w-full w-full">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
