"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { addAircraft } from '@/action/api-action'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";


const schema = z.object({
  airline: z
    .string()
    .min(3, { message: "Airline name must be at least 3 charecters." }),
  make: z.string().min(3, { message: "Make must be at least 3 charecters." }),
  tailNumber: z.string().min(3, { message: "Tail number must be at least 3 charecters." }),
});

const MultipleTypes = ({userList}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onSubmit(data) {
    data.user = value;
    data.aircraftMake = data.make;
    data.serialNumber = data.tailNumber; 
    startTransition(async () => {
      try {
        const response = await addAircraft(data);
        if (response) {
          toast.success("Aircraft added successfully");
          reset();
        }
      } catch (error) {
        toast.error("Failed to add aircraft");
      }
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="airline">Airline</Label>
          <Input
            id="airline"
            type="text"
            placeholder="Airline"
            {...register("airline", { required: "Airline is required" })}
            className={cn("mt-1", { "border-red-500": errors.airline })}
          />
          {errors.airline && (
            <p className="text-red-500 text-sm mt-1">{errors.airline.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="make">Make</Label>
          <Input
            id="make"
            type="text"
            placeholder="Make"
            {...register("make", { required: "Make is required" })}
            className={cn("mt-1", { "border-red-500": errors.make })}
          />
          {errors.make && (
            <p className="text-red-500 text-sm mt-1">{errors.make.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="tailNumber">Tail Number</Label>
          <Input
            id="tailNumber"
            type="text"
            placeholder="Tail Number"
            {...register("tailNumber", { required: "Tail Number is required" })}
            className={cn("mt-1", { "border-red-500": errors.tailNumber })}
          />
          {errors.tailNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.tailNumber.message}</p>
          )}
        </div>
        
        {/* select client */}
        <div>
    <Label htmlFor="user">User</Label> 
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? userList.find((user) => user.id === value)
              ?.fullName
            : "Select User"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No User found.</CommandEmpty>
          <CommandGroup>
            {userList.map((user) => (
              <CommandItem
                key={user.id}
                value={user.id}
                onSelect={(currentValue) => {
                  currentValue === user.id
                    ? setValue("")
                    : setValue(user.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === user.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {user.fullName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>

        </div>
      </div>
      <div className="mt-2">
          <Button
            type="submit"
            className="bg-primary text-white"
            disabled={isPending}
          >
            {isPending ? <Loader2 /> : "Add Aircraft"}
          </Button>
      </div>
    </form>
  );
};

export default MultipleTypes;
