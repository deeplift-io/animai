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
  };

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
        <Button
          onClick={() => {
            resetAuthState();
          }}
          variant="link"
          size="link"
        >
          Back to login
        </Button>
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
        className="mb-6 leading-2 text-slate-700"
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
        <div>
        <svg width="18" height="18" viewBox="0 0 18 18"><g fill="none"><path fill="#4285F4" fill-rule="nonzero" d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 Z"></path><path fill="#34A853" fill-rule="nonzero" d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 Z"></path><path fill="#FBBC05" fill-rule="nonzero" d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 Z"></path><path fill="#EA4335" fill-rule="nonzero" d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 Z"></path><polygon points="0 0 18 0 18 18 0 18"></polygon></g></svg>
        </div>
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
