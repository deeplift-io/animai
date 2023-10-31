import { useConversationStore } from "@/src/lib/stores/conversation-store";
import { supabaseAdminClient } from "@/src/lib/utils/supabase-admin";
import { Visitor as VisitorType } from "@/src/lib/types";

class Visitor {
  constructor(public fingerPrintId: string) {
    this.fingerPrintId = fingerPrintId;
  }

  public async addVisitor(newVisitor: Omit<VisitorType, 'fingerprint_id'>) {
    console.log('new visitor', newVisitor);
    try {
      const { error, data: visitor } = await supabaseAdminClient
        .from("visitors")
        .insert({ ...newVisitor })
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return visitor;
    } catch (e) {
      console.log(`Error adding entry: ${e}`);
    }
  }

  public async getVisitor(): Promise<string[] | null> {
    const { data: visitor } = await supabaseAdminClient
      .from("visitors")
      .select("*")
      .eq("fingerprint_id", this.fingerPrintId)
      .order("created_at", { ascending: false })
      .limit(1)
      .throwOnError();

      console.log('fingerprint id', this.fingerPrintId);

    console.log("visitor", visitor);

    return visitor;
  }

  public async updateVisitor(newVisitor: Omit<VisitorType, 'fingerprint_id'>) {
    const { data: visitor, error } = await supabaseAdminClient
      .from("visitors")
      .update({ ...newVisitor })
      .eq("fingerprint_id", this.fingerPrintId)
      .single();

    if (error) {
      console.log(`Error updating visitor: ${error.message}`);
      return null;
    }

    return visitor;
  }
}

export { Visitor };