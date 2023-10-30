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
      <GradientBackground />
      <DialogContent className="bg-white">
        <DialogHeader>
          <SignInForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const GradientBackground = () => (
  <div
    className="absolute top-0 -z-10 -ml-24 transform-gpu overflow-hidden"
    aria-hidden="true"
  >
    <div
      className="aspect-[801/1036] w-screen bg-gradient-to-r from-pink-500 via-teal-500 to-sky-600 opacity-10 overflow-hidden"
      styles={{
        clipPath:
          "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
      }}
    />
  </div>
);
