import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";


const AnimalProfileCard = () => {
  const [animalProfile, setAnimalProfile] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchAnimalProfile = async () => {
        const {
            data: { user },
          } = await supabase.auth.getUser();
          const { data: animal, error: latestAnimalError } = await supabase
            .from("animals") //table name
            .select("*") //columns to select from the database
            .eq("profile_id", user?.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();


      if (animal) {
        setAnimalProfile(animal);
      }
    };

    fetchAnimalProfile();
  }, []);

  if (!animalProfile) {
    return null;
  }

  return (
    <Card className="w-full rounded overflow-hidden">
      {/* <img className="w-full" src={animalProfile.image} alt={animalProfile.name} /> */}
      <div className="px-6 py-4">
        <div className="text-xl mb-2">{animalProfile.name}</div>
        <div>{animalProfile.breed} {animalProfile.type}</div>
        <p className="text-gray-700 text-base">{animalProfile.seed_prompt}</p>
      </div>
    </Card>
  );


  };

  export default AnimalProfileCard;