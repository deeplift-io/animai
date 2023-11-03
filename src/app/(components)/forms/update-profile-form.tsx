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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SaveIcon, UserPlus2 } from "lucide-react";
import { UpdateIcon } from "@radix-ui/react-icons";

interface UpdateProfileFormProps {
  values: {
    username?: string;
    name?: string;
    bio?: string;
  };
}


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Your name must be at least 2 characters.",
  }),
  bio: z.string().max(280, {
    message: "Your bio must be at most 280 characters.",
  }),
});

export function UpdateProfileForm({values}: UpdateProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="@animai" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Annie Mai" {...field} />
              </FormControl>
              <FormDescription>Please provide your real name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Some basic facts about me." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="sm" variant="inverse" type="submit">
          <div className="pr-2">
            <SaveIcon className="w-4 h-4" />
          </div>
          <div>Save changes</div>
        </Button>
      </form>
    </Form>
  );
}
