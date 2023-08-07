"use client";

import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

export default function SignInForm() {
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
  return (
    <div className="flex flex-col space-y-2">
      {/* <Input className="w-full" placeholder="Email" />
      <Input placeholder="Password" /> */}
      <Button onClick={handleSignInGithub}>
        <div className="inline-flex items-center space-x-2">
          <div>
            <GitHubLogoIcon></GitHubLogoIcon>
          </div>
          <div>Login with Github</div>
        </div>
      </Button>
    </div>
  );
}
