import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import MainNav from "./components/main-nav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="font-sans h-screen w-full mb-24">
      <div className="mx-auto">
        <MainNav />
        <div className="pt-24">{children}</div>
      </div>
    </main>
  );
}
