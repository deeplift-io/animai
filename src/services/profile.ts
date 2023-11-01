import { supabaseAdminClient } from "@/src/lib/utils/supabase-admin";

class Profile {
  constructor(public userId: string) {
    this.userId = userId;
  }

  public async getProfile(): Promise<string[] | null> {
    const { data: profile } = await supabaseAdminClient
      .from("profiles")
      .select("*")
      .eq("id", this.userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .throwOnError();

    return profile;
  }

}

export { Profile };