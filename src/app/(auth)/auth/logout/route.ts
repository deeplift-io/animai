import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.nextUrl);

  const supabase = createRouteHandlerClient({ cookies });
  await supabase.auth.signOut();

  return NextResponse.redirect(`${requestUrl.origin}`);
}
