import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { BytesOutputParser } from "langchain/schema/output_parser";
import { PromptTemplate } from "langchain/prompts";
import { LLMResult } from "langchain/dist/schema";
import { useConversationStore } from "@/src/lib/stores/conversation-store";
import { Conversation } from "../../../services/conversation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Message } from "../../../services/message";
import generalPrompt from "@/src/lib/prompts/general-prompt";

export const runtime = "edge";

const chatModel = "gpt-4";

const advanedSettings = {
  temperature: 0.8,
  top_p: 0.7,
  max_tokens: 100,
  frequency_penalty: 0.5,
  presence_penalty: 0.5,
  best_of: 5,
};

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = generalPrompt;

/**
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const conversationId = body.conversationId;
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate<{
      chat_history: string;
      input: string;
    }>(TEMPLATE);

    useConversationStore.getState().setActiveConversation(conversationId);

    /**
     *
     *
     * See a full list of supported models at:
     * https://js.langchain.com/docs/modules/model_io/models/
     */
    const model = new ChatOpenAI({
      ...advanedSettings,
      modelName: chatModel,
      callbacks: [
        {
          handleLLMEnd: async (output: LLMResult) => {
            const conversationId =
              useConversationStore.getState().activeConversation;
            console.log("conversation id", conversationId);

            if (!output) {
              throw new Error("No output");
            }

            if (!conversationId) {
              throw new Error("No active conversation");
            }

            const content = output.generations[0][0].text;

            const message = new Message(session?.user.id);
            await message.addEntry({
              content: content,
              role: "ai",
              conversationId: conversationId,
            });
          },
        },
      ],
    });

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and byte-encoding.
     */
    const outputParser = new BytesOutputParser();

    if (!conversationId) {
      const conversation = new Conversation(session?.user.id);
      try {
        await conversation.addConversation({
          title: null,
          system_prompt: TEMPLATE,
          model: chatModel,
          advanced_settings: advanedSettings,
        });

        const newConversation = await conversation.getLatestConversation(
          "latest"
        );

        if (!newConversation) {
          throw new Error("Could not create conversation");
        }

        useConversationStore
          .getState()
          .setActiveConversation(newConversation?.id);

        const message = new Message(session?.user.id);

        await message.addEntry({
          content: currentMessageContent,
          role: "user",
          conversationId: newConversation.id,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      const message = new Message(session?.user.id);

      await message.addEntry({
        content: currentMessageContent,
        role: "user",
        conversationId: conversationId,
      });
    }

    /**
     * Can also initialize as:
     *
     * import { RunnableSequence } from "langchain/schema/runnable";
     * const chain = RunnableSequence.from([prompt, model, outputParser]);
     */
    const chain = prompt.pipe(model).pipe(outputParser);

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    });

    return new StreamingTextResponse(stream);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

const saveMessage = () => {};
