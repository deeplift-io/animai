import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimalTypeSelector } from "../animal-type-selector";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/image-upload";

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

export default function AddAnimalForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
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

    if (error) {
      toast.error('There was an error adding your animal.');
      return;
    }

    toast.success('Your animal was added!');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ImageUpload />
      <Label htmlFor="name" className="text-left">
        Your animal&apos;s name
      </Label>
      <Input {...register("name")} />
      <p className="text-sm text-rose-500">{errors.name?.message}</p>
      <div className="py-2" />
      <Label htmlFor="age" className="text-left">
        Your animal&apos;s age (in human years)
      </Label>
      <Input type="number" pattern="\d*" {...register("age")} />
      <p className="text-sm text-rose-500">{errors.age?.message}</p>
      <div className="py-2" />
      <AnimalTypeSelector
        {...register("type")}
        onValueChange={(value) =>
          setValue("type", value, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
      />
      <p className="text-sm text-rose-500">{errors.type?.message}</p>
      <div className="py-4"></div>
      <Button
        disabled={!isValid}
        isLoading={isLoading}
        type="submit"
        variant="special"
      >
        Add my animal
      </Button>
    </form>
  );
}
