"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const supabase = createClientComponentClient();
  const handleSignInGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3100/auth/callback",
      },
    });
    if (error) console.log(error);
  };

  const handleSignInOTP = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "https://localhost:3100/auth/callback",
      },
    });
    if (error) console.log(error);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 p-24">
      <button
        onClick={handleSignInGithub}
        className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
      <button
        onClick={handleLogout}
        className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <div className="w-full border-b border border-gray-800" />
      <input
        type="text"
        placeholder="Email"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSignInOTP();
          }
        }}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-900 p-2 rounded-lg w-full"
      />
    </main>
  );
}
