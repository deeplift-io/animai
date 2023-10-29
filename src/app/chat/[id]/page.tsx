"use client";

import { useConversationHook } from "@/src/hooks/useConversationsHook";
import Chat from "../../(components)/chat-canvas";
import { useGetConversationByIdHook } from "@/src/hooks/useGetConversationByIdHook";

export default function Page({ params }: { params: { id: string } }) {

    const {isError, isLoading, data} = useGetConversationByIdHook(params.id);
    console.log(data);
  return <Chat conversation={data} />;
}
