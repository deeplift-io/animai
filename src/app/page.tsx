"use client";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/chat");

  return (
    <div className="h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, translateY: 10 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute inset-x-0 top-0 z-50"
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a
              href="#"
              className="-m-1.5 p-1.5 text-2xl font-logo text-gray-950"
            >
              Animai
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <Link href="/sign-in">
              <Button variant="link">Sign In</Button>
            </Link>
          </div>
        </nav>
      </motion.div>
      <main className="overflow-hidden h-screen">
        <div className="relative isolate">
          <div
            className="absolute left-1/2 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            aria-hidden="true"
          >
            <div
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 opacity-40"
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-36 sm:pt-60 lg:px-8 lg:pt-24">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-md lg:shrink-0 xl:max-w-xl">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.8 }}
                    className="rounded-full border border-slate-900 inline-block px-2 mb-4"
                  >
                    We&apos;re in Beta
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.3, delay: 2 }}
                    className="text-4xl text-slate-700 sm:text-7xl tracking-tight"
                  >
                    Your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-700 to-blue-600">
                      always on
                    </span>{" "}
                    veterinarian virtuoso
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.3, delay: 2.5 }}
                    className="relative mt-6 text-2xl text-gray-600 sm:max-w-md lg:max-w-none"
                  >
                    We have taken the collective intelligence of hundreds of
                    vets with years of veterinary experience and put it in your
                    pocket.
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 2.2 }}
                    className="mt-6 space-x-2 text-xl inline-flex items-center cursor-pointer"
                  >
                    <div className="border-b hover:border-black transition-all duration-300">
                      Add me to the waitlist
                    </div>
                    <div>
                      <ArrowRightIcon className="w-5" />
                    </div>
                  </motion.div>
                </div>
                <ImageCarousel />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const ImageCarousel = () => {
  return (
    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80"
      >
        <motion.div className="relative">
          <video
            src="https://player.vimeo.com/external/512991476.hd.mp4?s=f0fd74ca4e9f1cec4301a339d658e3e8ea8a9627&profile_id=172&oauth2_token_id=57447761"
            autoPlay
            muted
            loop
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3, delay: 2.5 }}
        className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 2.3 }}
          className="relative"
        >
          <video
            src="https://player.vimeo.com/external/542105396.hd.mp4?s=94e653a2f543776f466a46fb2d691dbf588f7d46&profile_id=174&oauth2_token_id=57447761"
            autoPlay
            muted
            loop
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 3.5 }}
          className="relative"
        >
          <video
            src="https://player.vimeo.com/external/513851034.hd.mp4?s=6cffa3280578d4274e29aa5ffb9800261ae2f226&profile_id=170&oauth2_token_id=57447761"
            autoPlay
            muted
            loop
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 3 }}
        className="w-44 flex-none space-y-8 pt-32 sm:pt-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 3.2 }}
          className="relative"
        >
          <video
            src="https://player.vimeo.com/external/565800266.hd.mp4?s=7786dd6ef873a0208196fcfe22ba075605870001&profile_id=170&oauth2_token_id=57447761"
            autoPlay
            muted
            loop
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 2.4 }}
          className="relative"
        >
          <video
            src="https://player.vimeo.com/external/534342239.sd.mp4?s=be3760b678776981e240954397696c86c7cff5a9&profile_id=165&oauth2_token_id=57447761"
            autoPlay
            muted
            loop
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </motion.div>
      </motion.div>
    </div>
  );
};
