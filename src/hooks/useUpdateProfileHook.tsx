import { useMutation } from "@tanstack/react-query";

export const updateProfile = async (profileId: string) => {
    const res = await fetch(`/api/profile/${profileId}`, {
        method: "PUT",
    });
    return res.json();
};

export const useUpdateProfileHook = (profileId: string) => {
    return useMutation({
        queryKey: ["update-profile"],
        queryFn: updateProfile(profileId),
    });
};