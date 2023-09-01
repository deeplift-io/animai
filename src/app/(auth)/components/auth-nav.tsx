"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../../(components)/ui/button";

export default function AuthNav() {
  return (
    <div className="inline-flex w-full p-6 absolute z-10">
      <div>
        <Link href="/">
          <Button variant="outline" size="sm" className="w-full">
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
}
