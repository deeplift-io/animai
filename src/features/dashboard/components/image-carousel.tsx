import { createClient } from "pexels";
import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ImageCarousel() {
  return (
    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
      <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
        <div className="relative">
          <video
            src="https://player.vimeo.com/external/512991476.hd.mp4?s=f0fd74ca4e9f1cec4301a339d658e3e8ea8a9627&profile_id=172&oauth2_token_id=57447761"
            autoPlay
            muted
            loop
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      </div>
      <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
        <div className="relative">
          <video
            src="https://player.vimeo.com/external/542105396.hd.mp4?s=94e653a2f543776f466a46fb2d691dbf588f7d46&profile_id=174&oauth2_token_id=57447761"
            autoPlay
            muted
            loop
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div className="relative">
          <video
            src="https://player.vimeo.com/external/513851034.hd.mp4?s=6cffa3280578d4274e29aa5ffb9800261ae2f226&profile_id=170&oauth2_token_id=57447761"
            autoPlay
            muted
            loop
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      </div>
      <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
        <div className="relative">
          <video
            src="https://player.vimeo.com/external/565800266.hd.mp4?s=7786dd6ef873a0208196fcfe22ba075605870001&profile_id=170&oauth2_token_id=57447761"
            autoPlay
            muted
            loop
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div className="relative">
          <video
            src="https://player.vimeo.com/external/534342239.sd.mp4?s=be3760b678776981e240954397696c86c7cff5a9&profile_id=165&oauth2_token_id=57447761"
            autoPlay
            muted
            loop
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      </div>
    </div>
  );
}
