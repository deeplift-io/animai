"use client";

import { CatIcon, MessageSquareDashed } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className="text-center flex flex-col items-center">
        <CatIcon className="w-8 h-8 text-center text-gray-900" />
        <h3 className="mt-2 font-semibold text-gray-900">
          Save your animals profiles
        </h3>
        <p className="mt-1 text-gray-500">
            This feature is coming soon. We are still building out the ability to save your animals profiles.
        </p>
      </div>
    </div>
  );
}
