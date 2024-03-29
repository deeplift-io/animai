"use client";

import { CreditCardIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className="text-center flex flex-col items-center">
        <CreditCardIcon className="w-8 h-8 text-center text-gray-900" />
        <h3 className="mt-2 font-semibold text-gray-900">
          Pro plans coming soon
        </h3>
        <p className="mt-1 text-gray-500">
          Given we are still in beta, we are not charging for the service yet. 
        </p>
      </div>
    </div>
  );
}
