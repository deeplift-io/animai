import { Conversation } from "@/src/services/conversation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
  ) {
    const slug = params.slug

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
  
    const conversationData = await conversation.getLatestConversation();

    return conversationData;
  }