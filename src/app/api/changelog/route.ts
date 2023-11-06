import { Changelog } from "@/src/services/changelog";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return new Response("Not authenticated", {
      status: 401,
    });
  }

  const changelog = new Changelog();

  const clogs = await changelog.getChangelog({
    limit: 100,
  });

  if (clogs && clogs.length > 0) {
    return new Response(JSON.stringify(clogs), {
      status: 200,
    });
  } else {
    return new Response("Changelog not found", {
      status: 404,
    });
  }
}
