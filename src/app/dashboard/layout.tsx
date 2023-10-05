import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import MainNav from "../(components)/main-nav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from 'react-hot-toast';

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore
  })
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="font-sans w-full mb-24 overflow-hidden">
      <div className="mx-auto">
        <GradientBackground />
        <MainNav />
        <div>{children}</div>
      </div>
      <Toaster />
    </main>
  );
}

const GradientBackground = () => (
  <div
    className="absolute top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl"
    aria-hidden="true"
  >
    <div
      className="aspect-[801/1036] w-screen bg-gradient-to-r from-green-500 via-teal-500 to-sky-600 opacity-10 overflow-hidden"
      style={{
        clipPath:
          "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
      }}
    />
  </div>
);
