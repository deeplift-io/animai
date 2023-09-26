"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const FormSchema = z.object({
  prompt: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),
});

export function AnimalPromptForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: latestAnimal, error: latestAnimalError } = await supabase
      .from("animals") //table name
      .select("*") //columns to select from the database
      .eq("profile_id", user?.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (latestAnimalError) {
      toast.error("There was an error updating your animal's information.");
      return;
    }

    const { error } = await supabase
      .from("animals")
      .update({
        seed_prompt: data.prompt,
      })
      .eq("id", latestAnimal.id);
    setIsLoading(false);

    if (error) {
      toast.error("There was an error updating your animal's information.");
      return;
    }

    toast.success("We've added this to your animal's information.");
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describe your animal</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="My animal is an active dog with a friendly temperament. He at times has digestive issues and needs to be fed a special diet..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="special">Continue</Button>
      </form>
    </Form>
  );
}
