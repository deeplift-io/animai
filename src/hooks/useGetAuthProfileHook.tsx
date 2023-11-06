import { useQuery } from "@tanstack/react-query"

export const fetchProfile = async (userId: string | null) => {
    const res = await fetch(`/api/profiles/${userId}`);
    return res.json();
};

/**
 * Use this hook to get the visitor by  userId.
 * @param userId 
 * @returns 
 */
export const useGetAuthProfileHook = (userId: string | null) => {
    return useQuery(["get-profile", userId], () =>
    fetchProfile(userId),
    {
        enabled: !!userId,
    }
  );
};