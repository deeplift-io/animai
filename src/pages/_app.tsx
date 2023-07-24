import "@/styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ClerkProvider } from "@clerk/nextjs";

const epilogue = localFont({
  src: [
    {
      path: "../assets/fonts/Epilogue/Epilogue-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Epilogue/Epilogue-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Epilogue/Epilogue-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-epilogue",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <main className={`${epilogue.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
}

export default function AppWrapper(props: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={props.pageProps.initialSession}
    >
      <App {...props} />
    </SessionContextProvider>
  );
}
