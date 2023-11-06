import { useConversationStore } from "@/src/lib/stores/conversation-store";
import { supabaseAdminClient } from "@/src/lib/utils/supabase-admin";
import { Conversation as ConversationType } from "@/src/lib/types";

class Changelog {
  constructor() {}

  public async getChangelog({
    limit,
  }: {
    limit: number;
  }): Promise<string[] | null> {
    const { data: changelog } = await supabaseAdminClient
      .from("changelog")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)
      .throwOnError();

    return changelog;
  }
}

export { Changelog };
