import { useQuery } from "@tanstack/react-query"

export const fetchConversations = async () => {
    const res = await fetch("/api/conversations");
    return res.json();
};

export const useConversationHook = () => {
    return useQuery({
        queryKey: ["conversations"],
        queryFn: fetchConversations,
    });
};