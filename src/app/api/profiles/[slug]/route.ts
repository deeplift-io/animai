import { Conversation } from "@/src/services/conversation";
import { Profile } from "@/src/services/profile";
import { Visitor } from "@/src/services/visitor";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
  ) {
    const slug = params.slug

    const profile = new Profile(slug);

    const profileData = await profile.getProfile();

    return new Response(JSON.stringify(profileData[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  export async function PUT(
    request: Request,
    { params }: { params: { slug: string } }
  ) {
    const slug = params.slug
    const paramsBody = await request.json();
  
    console.log('params body', paramsBody);
    const profile = new Profile(slug);
  
    const profileData = await profile.updateProfile(paramsBody);
  
    return new Response(JSON.stringify(profileData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }