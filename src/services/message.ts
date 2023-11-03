import { supabaseAdminClient } from "@/src/lib/utils/supabase-admin";

class Message {
    constructor(public userId: string) {
        this.userId = userId;
      }

      public async addEntry({
        content,
        role,
        conversationId
      }: {
        content: string;
        role: "user" | "ai";
        conversationId: string;
      }) {
        try {
          await supabaseAdminClient
            .from("messages")
            .insert({ owner: this.userId, content, role, conversation: conversationId })
            .throwOnError();
        } catch (e) {
          console.log(`Error adding entry: ${e}`);
        }
      }
}

export { Message }