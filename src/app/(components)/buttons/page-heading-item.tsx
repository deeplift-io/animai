"use client"

import Link from "next/link";

export const PageHeadingItem = ({
    isActive,
    children,
    href,
  }: {
    isActive: boolean;
    children: any;
    href: string;
  }) => {
    return (
      <Link href={href}>
        <div
          className={`px-2 hover:bg-white rounded-xl p-1 cursor-pointer transition-all duration-200 ${
            isActive ? "bg-white" : ""
          }`}
        >
          {children}
        </div>
      </Link>
    );
  };