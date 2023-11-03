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
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import FileUpload from "@/components/ui/file-upload";

const FormSchema = z.object({
  prompt: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    }),
});

export function AnimalPromptForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [animalProfile, setAnimalProfile] = useState(null);
  const supabase = createClientComponentClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const fetchLatestAnimal = async () => {
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
        toast.error("There was an error fetching your animal's information.");
        return;
      }

      setAnimalProfile(latestAnimal);
    };

    fetchLatestAnimal();
  }, []);

  const handleSaveAnimalImage = async (publicUrl: string) => {
    setIsLoading(true);
    const { error } = await supabase
      .from("animals")
      .update({
        avatar_url: publicUrl,
      })
      .eq("id", animalProfile.id);
    setIsLoading(false);

    if (error) {
      toast.error("There was an error saving your image.");
      return;
    }

    toast.success("Image uploaded.");
  };

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

    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please provide a short medical history</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`${animalProfile?.name} is an active ${
                    animalProfile?.type !== "Other"
                      ? animalProfile?.type
                      : "animal"
                  } with a friendly temperament. He at times has digestive issues and needs to be fed a special diet...`}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-2"></div>

        <FormLabel>Upload an image of your animal (optional)</FormLabel>
        <FileUpload
          bucket="animal_images"
          onUploadSuccess={(publicUrl) => {
            handleSaveAnimalImage(publicUrl);
          }}
        />
        <div className="py-4"></div>
        <Button variant="special">Continue</Button>
      </form>
    </Form>
  );
}
