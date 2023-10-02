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
import { AnimalPromptForm } from "../forms/animal-prompt-form";
import AnimalProfileCard from "./animal-profile-card";
import { useRouter } from "next/navigation";

const OnboardingCard = ({ onComplete }: {onComplete: () => void}) => {
  const supabase = createClientComponentClient();
  const [userProfile, setUserProfile] = React.useState(null);
  const [onboardingStage, setOnboardingStage] = React.useState(0);
  const router = useRouter()


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

  const updateOnboardedAt = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ onboarded_at: new Date().toISOString() })
      .eq('id', userProfile?.id);
    if (error) {
      console.error('Error updating onboarded_at: ', error);
    } else {
      onComplete();
    }
  };

  if (!userProfile) {
    return null;
  }

  return (
    <div className="relative w-full flex flex-row justify-center">
      {onboardingStage >= 0 && (
        <div className={`absolute ${onboardingStage !== 0 && "blur-sm"}`}>
          <WelcomeStage
            onContinue={() => setOnboardingStage(1)}
            userProfile={userProfile}
          />
        </div>
      )}
      {onboardingStage >= 1 && (
        <div className={`absolute top-5 ${onboardingStage !== 1 && "blur-sm"}`}>
          <AddAnimalStage
            userProfile={userProfile}
            onContinue={() => setOnboardingStage(2)}
          />
        </div>
      )}
      {onboardingStage >= 2 && (
        <div className={`absolute top-10 ${onboardingStage !== 2 && "blur-sm"}`}>
          <AnimalPromptStage
            userProfile={userProfile}
            onContinue={() => {
              setOnboardingStage(3);
            }}
          />
        </div>
      )}
      {onboardingStage >= 3 && (
        <div className={`absolute top-16 ${onboardingStage !== 3 && "blur-sm"}`}>
          <AnimalConfirmationStage
            userProfile={userProfile}
            onContinue={() => 
              updateOnboardedAt()
            }
            onAddAnother={() => setOnboardingStage(1)}
          />
        </div>
      )}
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

const WelcomeStage = ({
  userProfile,
  onContinue,
}: {
  userProfile: any;
  onContinue: any;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(10px)" }}
      animate={{
        opacity: 1,
        transform: "translateY(0px)",
        transition: { delay: 0.5 },
      }}
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
          <Button onClick={onContinue} variant="special">
            Add my animal
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const AddAnimalStage = ({
  userProfile,
  onContinue,
}: {
  userProfile: any;
  onContinue: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(10px)" }}
      animate={{
        opacity: 1,
        transform: "translateY(0px)",
        transition: { delay: 0.7 },
      }}
      className="w-full flex justify-center"
    >
      <Card className={cn("max-w-lg w-full")}>
        <CardHeader>
          <div className="text-lg">Add your animal</div>
          <div className="text-sm text-gray-500">
            We&apos;ll use this basic information to individualise care for your
            animal.
          </div>
        </CardHeader>
        <CardContent>
          <AddAnimalForm onSuccess={() => onContinue()} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AnimalPromptStage = ({
  userProfile,
  onContinue,
}: {
  userProfile: any;
  onContinue: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(10px)" }}
      animate={{
        opacity: 1,
        transform: "translateY(0px)",
        transition: { delay: 1 },
      }}
      className="w-full flex justify-center"
    >
      <Card className={cn("max-w-lg w-full")}>
        <CardHeader>
          <div className="text-lg">Add your animal</div>
          <div className="text-sm text-gray-500">
            In just a few sentences, give us a brief description of your animal.
            Feel free to include any information you think is relevant,
            including any chronic medical conditions, allergies, or behavioural issues.
          </div>
        </CardHeader>
        <CardContent>
          <AnimalPromptForm onSuccess={() => onContinue()} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AnimalConfirmationStage = ({
  userProfile,
  onContinue,
  onAddAnother,
}: {
  userProfile: any;
  onContinue: () => void;
  onAddAnother: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(10px)" }}
      animate={{
        opacity: 1,
        transform: "translateY(0px)",
        transition: { delay: 1.2 },
      }}
      className="w-full flex justify-center"
    >
      <Card className={cn("w-full max-w-xl")}>
        <CardHeader>
          <div className="text-lg">Generating your animal&apos;s profile</div>
          <div className="text-sm text-gray-500">
            Using the information you&apos;ve provided, we&apos;re generating a profile for your animal.
            This may take a few seconds.
          </div>
        </CardHeader>
        <CardContent>
          <AnimalProfileCard />
          <div className="my-4"></div>
          <div className="inline-flex w-full space-x-2">
            <Button onClick={onContinue} variant="special">Continue</Button>
            <Button onClick={onAddAnother} variant="secondary" className="w-full">Add another</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
