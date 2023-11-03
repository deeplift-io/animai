import { useQuery } from "@tanstack/react-query"

export const fetchVisitor = async (fingerprintId: string | null) => {
    const res = await fetch(`/api/visitors/${fingerprintId}`);
    return res.json();
};

/**
 * Use this hook to get the visitor by fingerprint id.
 * @param fingerPrintId 
 * @returns 
 */
export const useGetVisitorHook = (fingerPrintId: string | null) => {
    return useQuery(["get-visitor", fingerPrintId], () =>
    fetchVisitor(fingerPrintId),
    {
        enabled: !!fingerPrintId,
    }
  );
};