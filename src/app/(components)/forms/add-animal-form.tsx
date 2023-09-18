import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimalTypeSelector } from "../animal-type-selector";

const schema = yup.object({
  name: yup.string().required(),
  type: yup.string().required(),
  age: yup.number().positive().integer().required(),
}).required();
type FormData = yup.InferType<typeof schema>;

export default function AddAnimalForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Label htmlFor="picture" className="text-left">Your animal&apos;s name</Label>
      <Input {...register("name")} />
      <p className="text-sm text-rose-500">{errors.name?.message}</p>
        <div className="py-2" />
        <Label htmlFor="picture" className="text-left">Your animal&apos;s age</Label>
      <Input type="number" pattern="\d*" {...register("age")} />
      <p className="text-sm text-rose-500">{errors.age?.message}</p>
      <div className="py-2" /> 
      <AnimalTypeSelector />
      <input type="submit" />
    </form>
  );
}
