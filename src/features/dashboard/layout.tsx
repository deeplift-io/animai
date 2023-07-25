import React from "react";
import { useClerk } from "@clerk/clerk-react";
import SideBarNav from "./components/side-bar-nav";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { signOut } = useClerk();
  return (
    <>
      <div className="absolute top-0 w-full">
        <div className="w-full py-3 px-4 justify-between inline-flex items-center font-sans">
          <div className="text-xl">Animai</div>
          <div className="inline-flex items-center space-x-2">
            <div>
              <button className="font-sans text-sm" onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="inline-flex w-full">
        <div className="pt-32 w-full">{children}</div>
        <SideBarNav />
      </main>
    </>
  );
}
