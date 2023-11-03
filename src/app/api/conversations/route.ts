import { Conversation } from "@/src/services/conversation";
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

  const conversation = new Conversation(session?.user.id);

  const conversations = await conversation.getConversations({
    limit: 100,
  });

  if (conversations && conversations.length > 0) {
    return new Response(JSON.stringify(conversations), {
      status: 200,
    });
  } else {
    return new Response("No conversations found", {
      status: 404,
    });
  }
}
