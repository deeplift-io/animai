import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimalTypeSelector } from "../animal-type-selector";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

const schema = yup
  .object({
    name: yup.string().required("Please enter your animal's name"),
    type: yup.object().shape({
      animalType: yup.string().required(),
      breed: yup.string().nullable(),
    }),
    age: yup
      .number()
      .typeError("Please enter animal's age as a whole number")
      .positive()
      .integer()
      .required("Please enter your animal's age"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function AddAnimalForm() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("animals")
      .insert([
        {
          name: data.name,
          type: data.type.animalType,
          breed: data.type.breed,
          age: data.age,
          profile_id: user?.id,
        },
      ])
      .single();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="picture" className="text-left">
        Your animal&apos;s name
      </Label>
      <Input {...register("name")} />
      <p className="text-sm text-rose-500">{errors.name?.message}</p>
      <div className="py-2" />
      <Label htmlFor="picture" className="text-left">
        Your animal&apos;s age (in human years)
      </Label>
      <Input type="number" pattern="\d*" {...register("age")} />
      <p className="text-sm text-rose-500">{errors.age?.message}</p>
      <div className="py-2" />
      <AnimalTypeSelector
        {...register("type")}
        onValueChange={(value) => setValue("type", value)}
      />
      <p className="text-sm text-rose-500">{errors.type?.message}</p>
      <div className="py-4"></div>
      <Button
        disabled={!isValid || isLoading}
        isLoading={isLoading}
        type="submit"
        className="w-full bg-gradient-to-br from-green-700 via-emerald-600 to-green-700 border border-green-700"
      >
        Add my animal
      </Button>
    </form>
  );
}
