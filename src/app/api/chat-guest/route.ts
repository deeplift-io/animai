import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { BytesOutputParser } from "langchain/schema/output_parser";
import { PromptTemplate } from "langchain/prompts";
import { LLMResult } from "langchain/dist/schema";
import { cookies } from "next/headers";
import { Visitor } from "@/src/services/visitor";
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
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate<{
      chat_history: string;
      input: string;
    }>(TEMPLATE);
    const visitor = new Visitor(body.visitor.fingerprint_id);
    const visitorData = await visitor.getVisitor();
    
    if (visitorData[0].message_allowance <= 0) {
      return new Response("No messages left", {
        status: 403,
      });
    }

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
            const conversationBlob = createConversationBlob(messages, output.generations[0][0].text);
            await visitor.updateVisitor({
              ...visitorData[0],
              message_allowance: visitorData[0].message_allowance - 1,
              conversation_blob: conversationBlob,
            });
          },
        },
      ],
    });

    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and byte-encoding.
     */
    const outputParser = new BytesOutputParser();
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

const createConversationBlob = (messages: any[], appended: any) => {
  try {
    const newMessages = messages.concat({
      content: appended,
      role: "ai",
    });
    return newMessages;
  } catch (error) {
    console.error('Error creating JSON string:', error);
  }
}