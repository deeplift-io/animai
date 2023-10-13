import { useQuery } from "@tanstack/react-query"

export const fetchLatestConversation = async () => {
    const res = await fetch("/api/conversations/latest");
    return res.json();
};

export const useConversationHook = () => {
    return useQuery({
        queryKey: ["latest-conversation"],
        queryFn: fetchLatestConversation,
    });
};