import { useQuery } from "@tanstack/react-query";

export const fetchConversation = async (conversationId: string) => {
  try {
    const res = await fetch(`/api/conversations/${conversationId}`);
    return res.json();
  } catch (error) {
    console.log('error --', error);
  }
};

export const useGetConversationByIdHook = (conversationId: string) => {
  return useQuery(["get-conversation", conversationId], () =>
    fetchConversation(conversationId)
  );
};
