import React from "react";
import { cookies } from "next/headers";
import AnimalsSelector from "./animals-selector";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function AnimalsMenu() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore
  })
  const {
    data: { session },
  } = await supabase.auth.getSession();
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
