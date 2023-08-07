"use client";

import React from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FormEvent, useCallback, useState } from "react";
import Logo from "../../assets/logo/emblem.svg";
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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <textarea
            className="w-full bg-transparent h-32 border-none outline-none focus:ring-0 transition-all duration-300 ease-in-out"
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
      {inflight && !output && (
        <div className="inline-flex space-x-2 items-center">
          <Image
            className="w-6 animate-pulse"
            priority
            src={Logo}
            alt="Animai is talking..."
          />
          <p className="text-slate-500 text-xs mt-1 animate pulse">
            Animai is thinking...
          </p>
        </div>
      )}
      {output && (
        <div className="flex flex-col relative">
          {inflight && (
            <div className="inline-flex space-x-2 items-center">
              <Image
                className="w-6 animate-pulse"
                priority
                src={Logo}
                alt="Animai is talking..."
              />
              <p className="text-slate-500 text-xs mt-1 animate pulse">
                Animai is talking...
              </p>
            </div>
          )}
          <div className="flex flex-row space-x-2 align-top w-full max-w-xl p-2 mt-2 bg-slate-50 rounded-lg text-slate-800 overflow-y-auto">
            {/* {output} */}
            Of course! Before buying a goat, there are several important factors to consider. Here are some key points to look for when purchasing a goat:1. Health: Inspect the overall health of the goat. Look for clear eyes, a shiny coat, and good body condition. The goat should be alert and active. Check for any signs of illness such as coughing, diarrhea, or nasal discharge.2. Vaccinations and Deworming: Ask the seller if the goat has received proper vaccinations and has been regularly dewormed. This helps prevent common diseases and parasites.3. Age and Gender: Determine the age and gender of the goat you're interested in. Age can affect the goat's productivity, breeding potential, and overall care requirements. Decide whether you need a male (buck), female (doe), or a wether (castrated male).4. Purpose: Consider why you want a goat. Are you looking for milk production, meat, or as a companion? Different breeds have specific qualities that make them more suitable for certain purposes.5. Temperament: Assess the goat's temperament. While some breeds are generally more docile, individual personalities can vary. Ideally, you want a goat that is friendly, manageable, and easy to handle.6. Pasture and Shelter: Ensure you have adequate pasture and shelter for the goat. Goats need space to browse, graze, and exercise. A secure, sheltered area is essential to protect them from predators and harsh weather conditions.7. Genetics and Pedigree: If you have specific breeding goals or are interested in shows, consider the goat's genetics and pedigree. Registered purebred goats may be important for certain purposes.8. Source and Reputation: Research the reputation of the seller or farm. Ask for references and recommendations from other goat owners. A reputable source is more likely to provide a healthy and well-cared-for goat.After considering these points, it's important to have a veterinarian perform a health check on the goat before purchasing. They can help identify any potential underlying health issues or offer advice specific to your situation.

          </div>
        </div>
      )}
    </div>
  );
}
