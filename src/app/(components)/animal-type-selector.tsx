"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";

interface SelectedAnimalType {
  animalType: string;
  breed: string | null;
}

const animalTypes = [
  {
    value: "dog",
    label: "Dog",
    breeds: [
      "Labrador Retriever",
      "Staffordshire Bull Terrier",
      "French Bulldog",
      "German Shepherd",
      "Border Collie",
      "Golden Retriever",
      "Cavalier King Charles Spaniel",
      "Poodle",
      "Siberian Husky",
      "Boxer",
      "Bulldog",
      "Rottweiler",
      "Dachshund",
      "Maltese",
      "Shih Tzu",
      "Beagle",
      "Jack Russell Terrier",
      "Miniature Schnauzer",
      "Pug",
      "Cocker Spaniel",
      "Australian Shepherd",
      "Doberman Pinscher",
      "Great Dane",
      "Maremma Sheepdog",
      "Australian Cattle Dog",
      "Greyhound",
      "Whippet",
      "Samoyed",
      "Bichon Frise",
      "Shar Pei",
      "West Highland White Terrier",
      "Chihuahua",
      "Pomeranian",
      "English Springer Spaniel",
      "Bullmastiff",
      "Kelpie",
      "Weimaraner",
      "Pointer",
      "Akita",
      "Bernese Mountain Dog",
      "Boston Terrier",
      "Dalmatian",
      "Papillon",
      "Saint Bernard",
      "Yorkshire Terrier",
    ],
  },
  {
    value: "cat",
    label: "Cat",
    breeds: [
      "Domestic Short Hair",
      "Domestic Medium Hair",
      "Domestic Long Hair",
      "Ragdoll",
      "Burmese",
      "Siamese",
      "Maine Coon",
      "British Shorthair",
      "Bengal",
      "Russian Blue",
      "Persian",
      "Scottish Fold",
      "Sphynx",
      "Oriental Shorthair",
      "Abyssinian",
      "Tonkinese",
      "Norwegian Forest Cat",
      "Birman",
      "Devon Rex",
      "Cornish Rex",
      "Himalayan",
      "Turkish Van",
      "Manx",
      "Balinese",
      "Siberian",
      "Exotic Shorthair",
      "Somali",
      "Ragamuffin",
      "Selkirk Rex",
      "Ocicat",
      "Egyptian Mau",
      "Cymric",
      "Turkish Angora",
      "American Short Hair",
      "Korat",
      "Nebelung",
      "Chartreux",
      "Singapura",
      "Snowshoe",
      "American Curl",
    ],
  },
  {
    value: "bird",
    label: "Bird",
    breeds: [
      "Canary",
      "Budgerigar",
      "Lovebird",
      "African Grey Parrot",
      "Cockatiel",
      "Conure",
      "Finch",
    ],
  },
  {
    value: "fish",
    label: "Fish",
    breeds: [
      "Betta",
      "Goldfish",
      "Guppy",
      "Angelfish",
      "Tetra",
      "Oscar",
      "Molly",
    ],
  },
  {
    value: "hamster",
    label: "Hamster",
    breeds: ["Syrian", "Roborovski", "Chinese", "Campbell's Dwarf", "..."],
  },
  {
    value: "guinea_pig",
    label: "Guinea Pig",
    breeds: [],
  },
  {
    value: "rabbit",
    label: "Rabbit",
    breeds: [
      "Netherland Dwarf",
      "Holland Lop",
      "Rex",
      "Mini Rex",
      "Lionhead",
      "Angora",
      "Harlequin",
    ],
  },
  {
    value: "reptile",
    label: "Reptile",
    breeds: [
      "Bearded Dragon",
      "Corn Snake",
      "Leopard Gecko",
      "Ball Python",
      "Anole",
      "Russian Tortoise",
    ],
  },
  {
    value: "horse",
    label: "Horse",
    breeds: [
      "Arabian",
      "Thoroughbred",
      "Quarter Horse",
      "Appaloosa",
      "Andalusian",
      "Clydesdale",
      "Shire",
      "Mustang",
    ],
  },
  {
    value: "ferret",
    label: "Ferret",
    breeds: [],
  },
] as const;

export function AnimalTypeSelector({
  onValueChange,
}: {
  onValueChange: (value: SelectedAnimalType) => void;
}) {
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select animal type");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button
          variant="inverse"
          className="w-full justify-between text-gray-600 hover:text-gray-900"
        >
          <div>{placeholder}</div>
          <div>
            <ChevronRightIcon />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select your animal type</DialogTitle>
          <DialogDescription>
            Select the type of animal you want to add to your profile. You can
            add more later.
          </DialogDescription>
        </DialogHeader>
        <AnimalsGrid onAnimalTypeSelected={(value) => {
          setPlaceholder(value.breed ? `${value.animalType} - ${value.breed}` : value.animalType);
          onValueChange(value);
          setOpen(false);
          }} />
      </DialogContent>
    </Dialog>
  );
}

const AnimalsGrid = ({
  onAnimalTypeSelected,
}: {
  onAnimalTypeSelected: (value: SelectedAnimalType) => void;
}) => {
  const [selectedBreed, setSelectedBreed] = React.useState(null);
  const [selectedAnimalType, setSelectedAnimalType] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const itemsPerPage = 10; // Change this to the number of items you want per page

  const getSelectedBreeds = React.useMemo(() => {
    const selectedAnimal = animalTypes.find(
      (animal) => animal.value === selectedBreed
    );
    if (!selectedAnimal) return;
    setSelectedAnimalType(selectedAnimal);
    if (!selectedAnimal.breeds.length > 0) {
    onAnimalTypeSelected({
      animalType: selectedAnimal.label,
      breed: null,
    });
  }
    const breeds = selectedAnimal ? selectedAnimal.breeds : [];
    const filteredBreeds = breeds.filter(breed => breed.toLowerCase().includes(searchTerm.toLowerCase())); // Add this line
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBreeds.slice(startIndex, startIndex + itemsPerPage); // Change this line
  }, [selectedBreed, currentPage, searchTerm]); // Add searchTerm to the dependency array

  if (selectedBreed) {
    return (
      <>
        <div className="flex flex-col p-2 border border-gray-300 rounded-lg relative">
          <div className="text-xs text-gray-500">Animal type</div>
          <div>{selectedAnimalType?.label}</div>
        </div>
        <div className="flex">
          <Input onChange={(event) => setSearchTerm(event.target.value)} Icon={MagnifyingGlassIcon}/>
        </div>
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-1 gap-y-6 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-2 py-4"
        >
          {getSelectedBreeds.map((breed) => (
            <li
              onClick={() =>
                onAnimalTypeSelected({
                  animalType: selectedAnimalType.label,
                  breed: breed,
                })
              }
              key={breed}
              className="relative group flex justify-center items-center border border-gray-200 rounded-lg p-4 hover:bg-gradient-to-br hover:shadow hover:shadow-green-100 from-fuchsia-50 to-purple-100 cursor-pointer transition-all duration-150"
            >
              <p className="pointer-events-none block text-sm text-center text-gray-800 group-hover:text-gray-600">
                {breed}
              </p>
            </li>
          ))}
          <li
            onClick={() => setSelectedBreed(null)}
            className="relative group flex space-x-2 justify-center items-center border border-gray-200 rounded-lg p-4 hover:bg-gradient-to-br bg-gray-100 from-gray-50 to-gray-100 cursor-pointer"
          >
            <div>
              <ArrowLeftIcon />
            </div>
            <p className="pointer-events-none block text-sm text-center text-gray-800 group-hover:text-gray-600">
              Back
            </p>
          </li>
        </ul>
        <div>
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === 3}
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </>
    );
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-1 gap-y-6 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 py-4"
    >
      {animalTypes.map((animal) => (
        <li
          onClick={() => setSelectedBreed(animal.value)}
          key={animal.value}
          className="relative group flex justify-center items-center border border-gray-200 rounded-lg p-4 hover:bg-gradient-to-br from-green-50 to-emerald-100 cursor-pointer"
        >
          <p className="pointer-events-none block text-sm text-center text-gray-800 group-hover:text-gray-600">
            {animal.label}
          </p>
        </li>
      ))}
    </ul>
  );
};

const OtherTextPopover = () => (
<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Place content for the popover here.</PopoverContent>
</Popover>
);
