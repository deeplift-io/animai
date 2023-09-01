import React from "react";
import { cookies } from "next/headers";
import AnimalsSelector from "./animals-selector";
import AddAnimalDialog from "./dialogs/add-animal-dialog";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function AnimalsMenu() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: animals } = await supabase
    .from("animals")
    .select("*, profiles(*)");
  return (
    <div className="fixed bottom-2 right-2">
      <div>
        <AnimalsSelector animals={animals} />
      </div>
    </div>
  );
}
