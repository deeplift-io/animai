import { useMutation } from "@tanstack/react-query";
import { toast } from 'sonner';

export const updateProfile = async (profileId: string, body) => {
  console.log("body", body);
  try {
    const res = await fetch(`/api/profiles/${profileId}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (error) {
    console.log("error", error);
  }
};

export const useUpdateProfileHook = (profileId: string) => {
  return useMutation({
    queryKey: ["update-profile"],
    mutationFn: (body) => {
      toast.promise(updateProfile(profileId, body), {
        loading: "Updating profile...",
        success: "Profile updated successfully",
        error: "Error updating profile",
      });
    },
  });
};
