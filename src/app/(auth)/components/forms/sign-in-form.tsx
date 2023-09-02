"use client";

import { Button } from "@/src/app/(components)/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

type Provider = "github" | "google";

export default function SignInForm() {
  const [loading, setLoading] = React.useState(false);
  const supabase = createClientComponentClient();
  const handleSignInOauth = async (provider: Provider) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_HOST}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) console.log(error);
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* <Input className="w-full" placeholder="Email" />
      <Input placeholder="Password" /> */}
      <GithubButton
        isLoading={loading}
        onClick={handleSignInOauth.bind(null, "github")}
      />
      <GoogleButton isLoading={loading} onClick={handleSignInOauth} />
    </div>
  );
}

const GithubButton = ({
  onClick,
  isLoading,
}: {
  onClick: (provider: Provider) => void;
  isLoading: boolean;
}) => {
  return (
    <Button isLoading={isLoading} onClick={() => onClick("github")}>
      <div className="inline-flex items-center space-x-2">
        <div>
          <GitHubLogoIcon></GitHubLogoIcon>
        </div>
        <div>Login with Github</div>
      </div>
    </Button>
  );
};

const GoogleButton = ({
  onClick,
  isLoading,
}: {
  onClick: (provider: Provider) => void;
  isLoading: boolean;
}) => {
  return (
    <Button isLoading={isLoading} onClick={() => onClick("google")}>
      <div className="inline-flex items-center space-x-2">
        <div>Login with Google</div>
      </div>
    </Button>
  );
};
