"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Icon } from '@iconify/react';
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { newFlight } from '@/action/api-action'
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
  name: z
    .string()
    .min(3, { message: "Flight name must be at least 3 charecters." }),
  departure: z.string()
    .min(3, { message: "Departure must be at least 3 charecters." }),
  destination: z.string()
    .min(3, { message: "Destination must be at least 3 charecters." }),
  flightHours: z.string()
    .min(1, { message: "Flight hours must be at least 1." }),
  pilot: z.string()
    .min(3, { message: "Pilot must be at least 3 charecters." }),
});

const VFormWithIcon = ({aircraftList}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const [file, setFile] = React.useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onFileChange = event => {
    setFile(event.target.files[0])
  }

  function onSubmit(data) {
    const formData = new FormData();
    formData.append('file', file); // Assuming 'file' is your file input
    formData.append('aircraftId', parseInt(value));
    formData.append('name', data.name);
    formData.append('departure', data.departure);
    formData.append('destination', data.destination);
    formData.append('flightHours', data.flightHours);
    formData.append('pilot', data.pilot);
  
    startTransition(async () => {
      try {
        const response = await newFlight(formData);
        if (response) {
          console.log(response);
          reset();
          toast.success("Flight added successfully");
        }
      } catch (error) {
        toast.error("Failed to add flight");
      }
    });
  }
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">

        <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
          <Label htmlFor="name">Flight Name</Label>
          <InputGroup merged className={cn("", { "border-red-500": errors.name })}>
            <InputGroupText>
              <Icon icon="material-symbols:flight" />
            </InputGroupText>
            <Input type="text" placeholder="Flight name" id="name" 
              {...register("name", { required: true })}
            />
          </InputGroup>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
          <Label>Upload CSV</Label>
          <InputGroup merged>
            <InputGroupText>
              <Icon icon="eos-icons:csv-file" />
            </InputGroupText>
            <Input type="file" onChange={onFileChange} accept=".csv" />
          </InputGroup>
        </div>
        <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
          <Label htmlFor="departure">Departure</Label>
          <InputGroup merged 
              className={cn("", { "border-red-500": errors.departure })} >
            <InputGroupText>
              <Icon icon="vaadin:flight-takeoff" />
            </InputGroupText>
            <Input type="text" placeholder="Departure" id="departure"
              {...register("departure", { required: true })}
            />
          </InputGroup>
            {errors.departure && (
            <p className="text-red-500 text-sm mt-1">{errors.departure.message}</p>
            )}
        </div>
        <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
          <Label htmlFor="destination">Destination</Label>
          <InputGroup merged className={cn("flex", { "border-red-500": errors.destination })} >
            <InputGroupText>
              <Icon icon="vaadin:flight-landing" />
            </InputGroupText>
            <Input type="text" placeholder="Destination" id="destination"
              {...register("destination", { required: true })}
            />
          </InputGroup>
            {errors.destination && (
            <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>
            )}
        </div>
        <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
          <Label htmlFor="flightHours">Flight Hours</Label>
          <InputGroup merged className={cn("flex", { "border-red-500": errors.flightHours })}>
            <InputGroupText>
              <Icon icon="mingcute:time-line" />
            </InputGroupText>
            <Input type="number" placeholder="Type number" id="flightHours"
              {...register("flightHours", { required: true })}   
            />
          </InputGroup>
            {errors.flightHours && (
            <p className="text-red-500 text-sm mt-1">{errors.flightHours.message}</p>
            )}
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
          <Label htmlFor="state">Aircraft</Label>
          <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? aircraftList.find((aircraft) => aircraft.id === value)
              ?.serialNumber
            : "Select Aircraft"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Aircrafts..." />
          <CommandEmpty>No Aircraft found.</CommandEmpty>
          <CommandGroup>
            {aircraftList.map((aircraft) => (
              <CommandItem
                key={aircraft.id}
                value={aircraft.id}
                onSelect={(currentValue) => {
                  currentValue === aircraft.id
                    ? setValue("")
                    : setValue(aircraft.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === aircraft.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {aircraft.serialNumber}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
        </div>
        <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
          <Label htmlFor="pilot">Pilot</Label>
          <InputGroup merged className={cn("", { "border-red-500": errors.pilot })} >
            <InputGroupText>
              <Icon icon="twemoji:pilot" />
            </InputGroupText>
            <Input type="text" placeholder="Type Pilot" id="copilotmpany" 
              {...register("pilot", { required: true })}
            />
          </InputGroup>
          {errors.pilot && (
            <p className="text-red-500 text-sm mt-1">{errors.pilot.message}</p>
          )}
        </div>
        <div className="col-span-2">
          <div className="flex items-center gap-1.5">
            <Checkbox id="term4" size="sm" color="default" />
            <Label
              htmlFor="term4"
              className="text-base text-muted-foreground font-normal"
            >
              Agree to terms and conditions
            </Label>
          </div>
        </div>
        <div className="col-span-2">
          <Button
            type="submit"
            className="bg-primary text-white"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-6 w-6 text-white" />
            ) : (
              "Add Aircraft"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VFormWithIcon;