"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const UserMenu = () => {
    const [profile, setProfile] = useState(null);
    const supabase = createClientComponentClient();

    useEffect(() => {
      const getProfile = async () => {
        const {
            data: { session },
          } = await supabase.auth.getSession()
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error: ', error);
        } else {
          setProfile(data);
        }
      };

    getProfile();
    }, []);
    
  return (
    <Avatar>
        <AvatarImage src={profile?.avatar_url} />
        <AvatarFallback>
            <div className="uppercase">{profile?.name.substring(0, 2)}</div>
        </AvatarFallback>
    </Avatar>
  );
};

export default UserMenu;
