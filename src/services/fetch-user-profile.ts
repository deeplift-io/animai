import { SupabaseClient } from "@supabase/supabase-js";

export async function fetchUserProfile(supabase: SupabaseClient<any, "public", any>) {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
  
    if (!userId) {
      console.error("No user ID found in session");
      return null;
    }
  
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
  
    if (error) {
      console.error("Error fetching user profile: ", error);
      return null;
    } else {
      return data;
    }
  }