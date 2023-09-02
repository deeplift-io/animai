"use client";

import React from "react";
import Image from "next/image";
import { Animal, AnimalWithProfile } from "@/src/lib/types";

interface AnimalsSelectorProps {
  animals: AnimalWithProfile[] | null;
}

export default function AnimalsSelector({ animals }: AnimalsSelectorProps) {
  if (!animals) return <EmptyAnimalSelector />;
  return (
    <div className="flex flex-col">
      <div className="self-end mt-4">
        <div className="inline-flex items-center space-x-0.5 p-2 bg-white shadow border border-gray-300 rounded-full">
          {animals?.map((animal) => (
            <AnimalItem animal={animal} key={animal.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

const AnimalItem = ({ animal }: { animal: AnimalWithProfile }) => {
  if (!animal) return null;
  return (
    <div className="w-full flex flex-col items-center justify-between cursor-pointer hover:opacity-90">
      {animal && <AnimalAvatar animal={animal} />}
      {animal.name}
    </div>
  );
};

const AnimalAvatar = ({ animal }: { animal: AnimalWithProfile }) => {
  if (animal.avatar_url) {
    return (
      <div className="w-14 h-14 relative rounded-full bg-gray-200 border border-gray-200">
        <Image
          className="rounded-full"
          fill
          alt={animal?.name}
          src={animal?.avatar_url}
        />
      </div>
    );
  }

  return (
    <div className="w-14 h-14 relative rounded-full bg-gray-200 border border-gray-200">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-lg text-gray-400">
          {animal.name.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const EmptyAnimalSelector = () => {
  return (
    <div className="w-full flex flex-col items-center justify-between cursor-pointer hover:opacity-90">
      <div className="text-xs">Add your animal</div>
    </div>
  );
};
