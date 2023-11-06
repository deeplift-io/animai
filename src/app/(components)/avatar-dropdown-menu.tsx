"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAuthProfileHook } from "@/src/hooks/useGetAuthProfileHook";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = [
  { name: "Changelog", href: "/changelog", divider: true },
  { name: "Account Settings", href: "/settings/account" },
  { name: "Sign out", href: "/auth/logout" },
];

const AvatarDropdownMenu = ({ session }: { session: Session }) => {
  const { data: profile, isLoading } = useGetAuthProfileHook(session.user.id);

  if (isLoading) {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  if (!profile?.name) {
    return (
      <Dropdown profile={profile}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-200 to-lime-200 border border-emerald-200" />
      </Dropdown>
    );
  }

  return (
    <Dropdown profile={profile}>
      <Avatar>
        <AvatarImage src={profile?.avatar_url} />
        <AvatarFallback>
          <div className="uppercase">{profile?.name?.substring(0, 2)}</div>
        </AvatarFallback>
      </Avatar>
    </Dropdown>
  );
};

export default AvatarDropdownMenu;

const Dropdown = ({ profile, children }: { profile: any; children: any }) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="mr-4 mt-4 w-64">
        <div className="flex flex-col">
          <div className="px-4 py-2 inline-flex space-x-4 border-b border-gray-200">
            <div className="w-8 h-8">{children}</div>
            <div>
              <div>{profile?.name ? profile?.name : "--"}</div>
              <div className="text-sm text-gray-800">
                Basic Plan{" "}
                <Link
                  className="text-xs p-1 border-gray-200 rounded bg-gray-100 ml-2 hover:text-gray-700"
                  href="/settings/billing"
                >
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
          {Menu.map((item) => (
            <Link href={item.href} key={item.name}>
              <DropdownItem divider={item.divider}>{item.name}</DropdownItem>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const DropdownItem = ({
  children,
  divider,
}: {
  children: any;
  divider: boolean | null | undefined;
}) => {
  return (
    <>
    <div
      className="mx-1 my-1 py-1 px-3 hover:bg-gray-100 rounded-lg text-sm"
    >
      {children}
    </div>
    {divider && <div className="w-full border-b border-gray-200"></div>}
    </>
  );
};
