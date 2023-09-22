"use client";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/utils/tailwind";
import AddAnimalForm from "../forms/add-animal-form";

const OnboardingCard = () => {
  const supabase = createClientComponentClient();
  const [userProfile, setUserProfile] = React.useState(null);
  const [onboardingStage, setOnboardingStage] = React.useState(0);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();
      if (error) {
        console.error("Error fetching user profile: ", error);
      } else {
        setUserProfile(data);
      }
    };

    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userProfile) {
    return null;
  }

  return (
    <div className="relative w-full flex flex-row justify-center">
      {onboardingStage >= 0 && <div className="absolute">
        <WelcomeStage onContinue={() => setOnboardingStage(1)} userProfile={userProfile} />
      </div>}
      {onboardingStage >= 1 && <div className="absolute top-5">
        <AddAnimalStage userProfile={userProfile} />
      </div>}
    </div>
  );
};

export default OnboardingCard;

const StageSteps = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        <div className="w-0.5 h-8 bg-gray-200"></div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        <div className="w-0.5 h-8 bg-gray-200"></div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        <div className="w-0.5 h-8 bg-gray-200"></div>
      </div>
    </div>
  );
};

const WelcomeStage = ({ userProfile, onContinue }: { userProfile: any; onContinue: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      className="w-full flex justify-center"
    >
      <Card className={cn("max-w-lg w-full")}>
        <CardHeader className="p-4 flex justify-center flex-col items-center">
          <div className="mb-6">
            <Avatar>
              <AvatarImage src={userProfile?.avatar_url} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-400 text-sm">Welcome {userProfile?.name}</p>
          <p className="text-lg text-gray-700">
            To get started, let&apos;s add your first pet.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={onContinue} className="w-full bg-gradient-to-br from-green-700 via-emerald-600 to-green-700 border border-green-700">
            Add my animal
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const AddAnimalStage = ({ userProfile }: { userProfile: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      className="w-full flex justify-center"
    >
      <Card className={cn("max-w-lg w-full")}>
        <CardHeader>
          <div className="text-lg">
            Add your animal
          </div>
          <div className="text-sm text-gray-500">
            We&apos;ll use this basic information to individualise care for your animal.
          </div>
        </CardHeader>
        <CardContent>
          <AddAnimalForm />
        </CardContent>
      </Card>
    </motion.div>
  );
};
