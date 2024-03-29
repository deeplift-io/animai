import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import MainNav from "../(components)/main-nav";
import { cookies } from "next/headers";
import { ConversationsSlideover } from "../(components)/slide-overs/conversations-slideover";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PageHeadingItem } from "../(components)/buttons/page-heading-item";
import { PageHeading } from "../(components)/layout/page-heading";

const MenuItems = [
  {
    name: "Account",
    href: "/settings/account",
  },
  {
    name: "Notifications",
    href: "/settings/notifications",
  },
  {
    name: "Billing",
    href: "/settings/billing",
  },
];

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
      <div className="absolute blur-3xl opacity-40 top-0 left-0 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full w-full h-32"></div>
      <div className="overflow-hidden w-full h-full relative flex z-0">
        <div className="relative flex h-full max-w-full flex-1 overflow-hidden">
          <div className="flex h-full max-w-full flex-1 flex-col">
            <MainNav session={session} />
            <div className="flex flex-col h-full max-w-full flex-1 pt-12 overflow-auto">
              <PageHeading items={MenuItems}>Settings</PageHeading>
              <div className="w-full border-b border-gray-200"></div>
              <div className="flex h-full max-w-screen-md mx-auto w-full py-12">
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
