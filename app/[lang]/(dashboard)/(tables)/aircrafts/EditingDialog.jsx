"use client";
import React, { use } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog";
  import { updateAircraft } from '@/action/api-action'
  import { useMediaQuery } from "@/hooks/use-media-query";
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
  } from "@/components/ui/command";
  import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { Textarea } from "@/components/ui/textarea";
  
  const schema = z.object({
    airline: z
      .string()
      .min(3, { message: "Airline name must be at least 3 charecters." }),
    make: z.string().min(3, { message: "Make must be at least 3 charecters." }),
    tailNumber: z.string().min(3, { message: "Tail number must be at least 3 charecters." }),
    parameters: z.string().optional(),
  });

const EditingDialog = ({item, userList}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(item.userId);
  const [isPending, startTransition] = React.useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
        airline: item.airline,
        make: item.aircraftMake,
        parameters: JSON.parse(item.parameters)?.join(', '),
        tailNumber: item.serialNumber,
    },
  });

  function onSubmit(data) {
    //convert comma separated parameters to array
    data.parameters = JSON.stringify(data.parameters.split(",").map((item) => item.trim()));
    data.user = value;
    data.aircraftMake = data.make;
    data.serialNumber = data.tailNumber; 
    startTransition(async () => {
      try {
        const response = await updateAircraft(item.id, data);
        if (response) {
          toast.success("Aircraft updated successfully");
          reset();
        }
      } catch (error) {
        toast.error("Failed to update aircraft");
      }
    });
  }
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            color="secondary"
            className=" h-7 w-7"
          >
            <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Aircraft</DialogTitle>
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
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
    <Label htmlFor="user">User</Label> 
    {isDesktop ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className=" justify-start">
                  {value ? (
                    <>{userList.find((user) => user.id === value)
                      ?.fullName }</>
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
                />
              </PopoverContent>
            </Popover>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="justify-start">
                  {value ? (
                    <>{userList.find((user) => user.id === value)
                      ?.fullName }</>
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
                  />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
        {/* parameters */}
        <div className="col-span-2">
          <Label htmlFor="parameters">Parameters</Label>
          <Textarea
            id="parameters"
            placeholder=", Separated by Comma"
            {...register("parameters", { required: "Parameters are required" })}
            className={cn("mt-1", { "border-red-500": errors.parameters })}
          />
          {errors.parameters && (
            <p className="text-red-500 text-sm mt-1">{errors.parameters.message}</p>
          )}
        </div>
      </div>
      <div className="mt-2">
          <Button
            type="submit"
            className="bg-primary text-white"
            disabled={isPending}
          >
            {isPending ? <Loader2 /> : "Update Aircraft"}
          </Button>
      </div>
    </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  export default EditingDialog;

  function StatusList({ setOpen, setValue, userList }) {
    return (
      <Command>
        <CommandInput placeholder="Filter Users..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {userList?.map((user) => (
              <CommandItem
                key={user.id}
                value={user.id}
                onSelect={(values) => {
                  setValue(
                    userList.find((user) => user.id === values).id || null
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
  