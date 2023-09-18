"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

type Provider = "github" | "google";

export default function SignInForm() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

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

  const handleSignInEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_HOST}/auth/callback`,
      },
    });
  };

  return (
    <div>
        <OAuthForm
          isLoading={loading}
          onClick={handleSignInOauth}
        />
        <hr className="my-8" />
        <EmailForm onChange={(event) => setEmail(event.target.value)} isLoading={loading} onClick={handleSignInEmail} />
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
    <Button onClick={() => onClick("github")}>
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
    <Button onClick={() => onClick("google")}>
      <div className="inline-flex items-center space-x-2">
        <div>Login with Google</div>
      </div>
    </Button>
  );
};

const OAuthForm = ({
  onClick,
  isLoading,
}: {
  onClick: (provider: Provider) => void;
  isLoading: boolean;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <GithubButton isLoading={isLoading} onClick={() => onClick("github")} />
      <GoogleButton isLoading={isLoading} onClick={() => onClick("google")} />
    </div>
  );
};

const EmailForm = ({
  onClick,
  isLoading,
  onChange
}: {
  onClick: () => void;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <Input onChange={onChange} className="w-full" placeholder="Email" />
      <Button variant="inverse" onClick={onClick}>
        <div className="inline-flex items-center space-x-2">
          <div>Continue with email</div>
        </div>
      </Button>
    </div>
  );
};
