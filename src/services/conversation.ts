import { useConversationStore } from "@/src/lib/stores/conversation-store";
import { supabaseAdminClient } from "@/src/lib/utils/supabase-admin";
import { Conversation as ConversationType } from "@/src/lib/types";

class Conversation {
  constructor(public userId: string) {
    this.userId = userId;
  }

  public async addConversation(
    newConversation: Omit<ConversationType, "owner">
  ) {
    try {
      const { error } = await supabaseAdminClient
        .from("conversations")
        .insert({ owner: this.userId, ...newConversation })
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (e) {
      console.log(`Error adding entry: ${e}`);
    }
  }

  public async getConversations({
    limit,
  }: {
    limit: number;
  }): Promise<string[] | null> {
    const { data: history } = await supabaseAdminClient
      .from("conversations")
      .select("*")
      .eq("owner", this.userId)
      .order("created_at", { ascending: false })
      .limit(limit)
      .throwOnError();

    return history;
  }

  public async getConversation(
    conversationId: string
  ): Promise<ConversationType | null> {
    try {
      const { data: conversation, error } = await supabaseAdminClient
        .from("conversations")
        .select(
          `
      *,
      messages (
        *
      )
    `
        )
        .eq("id", conversationId)
        .single();

      if (error) {
        console.log("error made it");
        console.log(`Error fetching conversation: ${error.message}`);
        return null;
      }
      
      return conversation;
    } catch (e) {
      console.log("error made it");
      console.log(`Error fetching conversation: ${e}`);
      return null;
    }
  }

  public async getLatestConversation(): Promise<ConversationType | null> {
    const { data: conversation, error } = await supabaseAdminClient
      .from("conversations")
      .select(
        `
      *,
      messages (
        *
      )
    `
      )
      .eq("owner", this.userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.log(`Error fetching latest conversation: ${error.message}`);
      return null;
    }

    return conversation;
  }

  public async updateConversation(
    conversationId: string,
    newConversation: Omit<ConversationType, "owner">
  ) {
    try {
      const { error } = await supabaseAdminClient
        .from("conversations")
        .update({ ...newConversation })
        .eq("id", conversationId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (e) {
      console.log(`Error adding entry: ${e}`);
    }
  }

  public async clearConversation() {
    await supabaseAdminClient
      .from("conversations")
      .delete()
      .eq("user_id", this.userId)
      .throwOnError();
  }
}

export { Conversation };
