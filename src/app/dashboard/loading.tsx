"use client";

import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loader.json";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="h-14 w-14">
        <Lottie animationData={loadingAnimation} />
      </div>
    </div>
  );
}
