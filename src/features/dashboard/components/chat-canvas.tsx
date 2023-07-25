import React from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FormEvent, useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import Logo from "../../../assets/logo/emblem.svg";
import Image from "next/image";

export default function ChatCanvas() {
  const supabase = useSupabaseClient();
  const [stream, setStream] = useState(true);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [inflight, setInflight] = useState(false);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Prevent multiple requests at once
      if (inflight) return;

      // Reset output
      setInflight(true);
      setOutput("");

      try {
        if (stream) {
          // If streaming, we need to use fetchEventSource directly
          await fetchEventSource(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/chat`,
            {
              method: "POST",
              body: JSON.stringify({ input }),
              headers: { "Content-Type": "application/json" },
              onmessage(ev) {
                setOutput((o) => o + ev.data);
              },
            }
          );
          setInput("");
        } else {
          // If not streaming, we can use the supabase client
          const { data } = await supabase.functions.invoke("chat", {
            body: { input },
          });
          setOutput(data.text);
          setInput("");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInflight(false);
      }
    },
    [input, stream, inflight, supabase]
  );

  return (
    <div className="px-4">
      <form onSubmit={onSubmit}>
        <div>
          <textarea
            className="w-full h-32 border-none outline-none focus:ring-0 transition-all duration-300 ease-in-out"
            placeholder="Hey I'm Animai, how can I help assist your animal?"
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </form>
      {output && (
        <div className="flex flex-col relative">
          {inflight && (
            <div className="inline-flex space-x-2 items-ce           <Image
                className="w-6 animate-pulse"
                priority
                src={Logo}
                alt="Animai is thinking..."
              />
              <p className="text-slate-400 text-xs mt-1">
                Animai is talking...
              </p>
            </div>
          )}
          <div className="flex flex-row space-x-2 align-top w-full max-w-xl p-2 mt-2 bg-slate-50 rounded-lg text-slate-800">
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
