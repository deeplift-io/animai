"use client";

import { MessageSquareDashed } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className="text-center flex flex-col items-center">
        <MessageSquareDashed className="w-8 h-8 text-center text-gray-900" />
        <h3 className="mt-2 font-semibold text-gray-900">
          Notifications coming soon
        </h3>
        <p className="mt-1 text-gray-500">
          We are still building out notifications, come back soon to configure.
        </p>
      </div>
    </div>
  );
}
