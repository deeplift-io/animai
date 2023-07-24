import "@/styles/globals.css";
import { ReactElement, ReactNode, useState } from "react";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ClerkProvider } from "@clerk/nextjs";
import { NextPage } from "next";

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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <main className={`${epilogue.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}

export default function AppWrapper(props: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <>
      <style jsx global>{`
        :root {
          --epilogue-font: ${epilogue.style.fontFamily};
        }
      `}</style>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={props.pageProps.initialSession}
      >
        <ClerkProvider {...props}>
          <App {...props} />
        </ClerkProvider>
      </SessionContextProvider>
    </>
  );
}
