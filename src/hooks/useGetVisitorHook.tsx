import { useQuery } from "@tanstack/react-query"

export const fetchVisitor = async (fingerprintId) => {
    const res = await fetch(`/api/visitors/${fingerprintId}`);
    return res.json();
};

export const useGetVisitorHook = () => {
    return useQuery({
        queryKey: ["visitor"],
        queryFn: fetchVisitor,
    });
};