import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function AnimalsSelector() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: animals } = await supabase.from("animals").select("*");
  console.log(animals);
  return (
    <div className="inline-flex items-center space-x-0.5 p-2 bg-white shadow border border-gray-300 rounded-full">
      {animals?.map((animal) => (
        <AnimalItem animal={animal} key={animal.id} />
      ))}
    </div>
  );
}

const AnimalItem = ({ animal }) => {
  return (
    <div className="w-full inline-flex items-center justify-between cursor-pointer hover:opacity-90">
      <div className="w-14 h-14 relative rounded-full bg-gray-200 border border-gray-200">
        <Image
          className="rounded-full"
          fill
          alt={animal?.name}
          src={animal?.avatar_url}
        />
      </div>
    </div>
  );
};
