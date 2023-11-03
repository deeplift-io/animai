import { useGetAuthProfileHook } from "@/src/hooks/useGetAuthProfileHook";
import { UpdateProfileForm } from "../../(components)/forms/update-profile-form";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MyProfileSection from "../(sections)/my-profile-section";
import { redirect } from "next/navigation";


export default async function Page() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/chat")
  }


  return (
    <div className="w-full">
      <MyProfileSection session={session} />
      <EmailAndPhoneSection />
      <DeleteAccountSection />
    </div>
  );
}


const EmailAndPhoneSection = () => {
  return <></>;
};

const DeleteAccountSection = () => {
  return <></>;
};
