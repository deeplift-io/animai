"use client";
import { useGetAuthProfileHook } from "@/src/hooks/useGetAuthProfileHook";
import { UpdateProfileForm } from "../../(components)/forms/update-profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const MyProfileSection = ({ session }) => {
  const { data: profile } = useGetAuthProfileHook(session.user.id);

  if (!profile) {
    return (
      <div className="flex flex-col space-y-6">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-10" />
        <Skeleton className="w-1/2 h-10" />
        <Skeleton className="w-1/2 h-10" />
        <Skeleton className="w-1/2 h-24" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col pb-12 border-b border-gray-200">
      <div className="text-lg font-medium">Your profile</div>
      <div className="pb-4">
        Choose how you are displayed in the app.
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="w-1/2">
          <UpdateProfileForm
            userId={profile.id}
            values={{
              name: profile.name,
              username: profile.username,
              bio: profile.bio,
            }}
          />
        </div>
        <div className="w-1/2 flex flex-row justify-center">
          <Avatar className="h-24 w-24">
            <AvatarFallback name={profile?.name} />
            <AvatarImage src={profile?.avatar_url} />
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default MyProfileSection;
