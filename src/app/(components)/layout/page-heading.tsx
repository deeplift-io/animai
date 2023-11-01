"use client";

import { usePathname } from "next/navigation";
import { PageHeadingItem } from "../buttons/page-heading-item";

export const PageHeading = (props: { children: React.ReactNode; items: {
    name: string;
    href: string;
}[] }) => {
    const pathname = usePathname();
    const isActive = (href: string) => {
        return href === pathname;
    };
  return (
    <div className="w-full max-w-screen-md mx-auto py-8 flex flex-col">
      <h1 className="md:text-3xl text-xl font-medium text-gray-900">
        {props.children}
      </h1>
      <div className="pt-8">
        <div className="bg-gray-400 bg-opacity-10 backdrop-blur-lg rounded-xl p-0.5 inline-flex items-center space-x-1">
          {props.items.map((item, index) => (
            <PageHeadingItem isActive={isActive(item.href)} href={item.href} key={index}>
              {item.name}
            </PageHeadingItem>
          ))}
        </div>
      </div>
    </div>
  );
};
