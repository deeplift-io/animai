import { useQuery } from "@tanstack/react-query"

export const fetchChangelog = async () => {
    const res = await fetch(`/api/changelog`);
    return res.json();
};

/**
 * Use this hook to get the visitor by fingerprint id.
 * @param fingerPrintId 
 * @returns 
 */
export const useGetChangelogHook = () => {
    return useQuery(["get-changelog"], () =>
    fetchChangelog()
  );
};