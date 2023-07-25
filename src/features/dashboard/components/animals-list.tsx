import React from "react";

export default function AnimalsList() {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const animals = [
    { id: 1, name: "Fluffy", href: "#", initial: "F", current: false },
    { id: 2, name: "Julio", href: "#", initial: "J", current: false },
  ];
  return (
    <div>
      <div className="leading-6 text-gray-900">🐶 Your animals</div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {animals.map((team) => (
          <li key={team.name}>
            <a
              href={team.href}
              className={classNames(
                team.current
                  ? "bg-gray-50 text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600",
                "group flex gap-x-3 rounded-md p-2 text-sm leading-6"
              )}
            >
              <span
                className={classNames(
                  team.current
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                )}
              >
                {team.initial}
              </span>
              <span className="truncate">{team.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
