"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignInForm from "@/src/app/(auth)/components/forms/sign-in-form";
import { Dialog } from "@radix-ui/react-dialog";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default async function Login() {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="bg-white max-w-sm">
        <DialogHeader>
          <SignInForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
