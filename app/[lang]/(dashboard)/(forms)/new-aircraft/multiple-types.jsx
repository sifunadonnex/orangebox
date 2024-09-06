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
import { addAircraft } from "@/action/api-action";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/store";
import { Home } from "lucide-react";

const schema = z.object({
  airline: z
    .string()
    .min(3, { message: "Airline name must be at least 3 charecters." }),
  make: z.string().min(3, { message: "Make must be at least 3 charecters." }),
  tailNumber: z
    .string()
    .min(3, { message: "Tail number must be at least 3 charecters." }),
  parameters: z.string().optional(),
  modelNumber: z.string().optional(),
});

const MultipleTypes = ({ userList }) => {
  const { user } = useUser();
  if (user?.role !== "admin") {
    window.location.href = "/dashboard";
  }
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [userAirline, setUserAirline] = React.useState("");
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
    //convert comma separated parameters to array
    data.parameters = JSON.stringify(
      data.parameters.split(",").map((item) => item.trim())
    );
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
    <>
      {user?.role === "admin" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* select client */}
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="user">User</Label>
              {isDesktop ? (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className=" justify-start">
                      {value ? (
                        <>
                          {userList.find((user) => user.id === value)?.fullName}
                        </>
                      ) : (
                        <>Select User</>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <StatusList
                      setOpen={setOpen}
                      setValue={setValue}
                      userList={userList}
                      setUserAirline={setUserAirline}
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <Button variant="outline" className="justify-start">
                      {value ? (
                        <>
                          {userList.find((user) => user.id === value)?.fullName}
                        </>
                      ) : (
                        <>Select User</>
                      )}
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mt-4 border-t">
                      <StatusList
                        setOpen={setOpen}
                        setValue={setValue}
                        userList={userList}
                        setUserAirline={setUserAirline}
                      />
                    </div>
                  </DrawerContent>
                </Drawer>
              )}
            </div>
            <div>
              <Label htmlFor="airline">Airline</Label>
              <Input
                id="airline"
                type="text"
                defaultValue={userAirline}
                placeholder="Airline"
                {...register("airline", { required: "Airline is required" })}
                className={cn("mt-1", { "border-red-500": errors.airline })}
              />
              {errors.airline && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.airline.message}
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.make.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="modelNumber">Model Number</Label>
              <Input
                id="modelNumber"
                type="text"
                placeholder="Model Number"
                {...register("modelNumber", {
                  required: "Model Number is required",
                })}
                className={cn("mt-1", { "border-red-500": errors.modelNumber })}
              />
              {errors.modelNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.modelNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="tailNumber">Tail Number</Label>
              <Input
                id="tailNumber"
                type="text"
                placeholder="Tail Number"
                {...register("tailNumber", {
                  required: "Tail Number is required",
                })}
                className={cn("mt-1", { "border-red-500": errors.tailNumber })}
              />
              {errors.tailNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.tailNumber.message}
                </p>
              )}
            </div>

            {/* parameters */}
            <div className="col-span-2">
              <Label htmlFor="parameters">Parameters</Label>
              <Textarea
                id="parameters"
                placeholder=", Separated by Comma"
                {...register("parameters", {
                  required: "Parameters are required",
                })}
                className={cn("mt-1", { "border-red-500": errors.parameters })}
              />
              {errors.parameters && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parameters.message}
                </p>
              )}
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
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <Home size={64} color="red" />
          <h1 className="text-xl font-bold text-red-600">
            You are not authorized to view this page
          </h1>
        </div>
      )}
    </>
  );
};

export default MultipleTypes;

function StatusList({ setOpen, setValue, userList, setUserAirline }) {
  return (
    <Command>
      <CommandInput placeholder="Filter Users..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {userList.map((user) => (
            <CommandItem
              key={user.id}
              value={user.id}
              onSelect={(values) => {
                setValue(
                  userList.find((user) => user.id === values).id || null
                );
                setUserAirline(
                  userList.find((user) => user.id === values).company || null
                );
                setOpen(false);
              }}
            >
              {user.fullName}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
