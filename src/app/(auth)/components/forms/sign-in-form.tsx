"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import React from "react";

type Provider = "github" | "google";

export default function SignInForm() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [magicLinkSent, setMagicLinkSent] = React.useState(false);

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

    if (error) {
      return null;
    }

    setMagicLinkSent(true);
  };

  const resetAuthState = () => {
    setEmail("");
    setMagicLinkSent(false);
    setLoading(false);
  }

  if (magicLinkSent) {
    return (
      <motion.div
        initial={{ opacity: 0, transform: "translateY(-10px)" }}
        animate={{
          opacity: 1,
          transform: "translateY(0px)",
          transition: { delay: 0.5 },
        }}
      >
        <div className="text-xl mb-4">Check your email</div>
        <div className="mb-4 text-gray-500">
          We sent a magic link to <span className="font-medium">{email}</span>.
          Please click on it to continue to your account.
        </div>
        <div className="py-2"></div>
        <Button onClick={() => { resetAuthState() }} variant="link" size="link">Back to login</Button>
      </motion.div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, transform: "translateY(-10px)" }}
        animate={{
          opacity: 1,
          transform: "translateY(0px)",
          transition: { delay: 0.5 },
        }}
        className="text-xl mb-4"
      >
        Sign in to your account
      </motion.div>
      <motion.div
        initial={{ opacity: 0, transform: "translateY(-10px)" }}
        animate={{
          opacity: 1,
          transform: "translateY(0px)",
          transition: { delay: 0.7 },
        }}
        className="mb-6 leading-2 text-slate-700 font-light"
      >
        Please sign in to your account to access your dashboard.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, transform: "translateY(-10px)" }}
        animate={{
          opacity: 1,
          transform: "translateY(0px)",
          transition: { delay: 0.9 },
        }}
      >
        <OAuthForm isLoading={loading} onClick={handleSignInOauth} />
        <hr className="my-8" />
        <EmailForm
          onChange={(event) => setEmail(event.target.value)}
          isLoading={loading}
          onClick={handleSignInEmail}
        />
      </motion.div>
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
    <Button
      className="shadow-sm"
      isLoading={isLoading}
      disabled={isLoading}
      onClick={() => onClick("github")}
    >
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
    <Button
      className="shadow-sm"
      isLoading={isLoading}
      disabled={isLoading}
      onClick={() => onClick("google")}
    >
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
  onChange,
}: {
  onClick: () => void;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <Input
        onChange={onChange}
        disabled={isLoading}
        className="w-full"
        placeholder="Email"
      />
      <Button
        className="shadow-sm"
        isLoading={isLoading}
        disabled={isLoading}
        variant="inverse"
        onClick={onClick}
      >
        <div className="inline-flex items-center space-x-2">
          <div>Continue with email</div>
        </div>
      </Button>
    </div>
  );
};
