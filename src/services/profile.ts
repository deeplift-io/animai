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

  public async updateProfile(profileData: any): Promise<any> {
    const { data: updatedProfile, error } = await supabaseAdminClient
      .from("profiles")
      .update(profileData)
      .eq("id", this.userId)
      .throwOnError();

    if (error) {
      throw error;
    }

    return updatedProfile;
  }
}

export { Profile };