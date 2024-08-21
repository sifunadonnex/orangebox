"use client";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { updateEvent } from "@/action/api-action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Icon } from "@iconify/react";

const schema = z.object({
  eventName: z
    .string()
    .min(3, { message: "Event name must be at least 3 charecters." }),
  eventCode: z
    .string()
    .min(3, { message: "Event code must be at least 3 charecters." }),
  displayName: z
    .string()
    .min(3, { message: "Display name must be at least 3 charecters." }),
  eventDescription: z
    .string()
    .min(3, { message: "Event description must be at least 3 charecters." }),
  sop: z.optional(z.string()),
  high: z.optional(z.string()),
  high1: z.optional(z.string()),
  high2: z.optional(z.string()),
  low: z.optional(z.string()),
  low1: z.optional(z.string()),
  low2: z.optional(z.string()),
});

const EditingDialog = ({ item, aircraftList }) => {
  const [parameters, setParameters] = React.useState([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(item.aircraftId);
  const [openParameter, setOpenParameter] = React.useState(false);
  const [valueParameter, setValueParameter] = React.useState(
    item.eventParameter
  );
  const [isPending, startTransition] = React.useTransition();
  const [eventTrigger, setEventTrigger] = React.useState(item.eventTrigger);
  const [eventType, setEventType] = React.useState(item.eventType);
  const [flightPhase, setFlightPhase] = React.useState(item.flightPhase);
  const [isHigh, setIsHigh] = React.useState(true);
  const [isLow, setIsLow] = React.useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      eventName: item.eventName,
      eventCode: item.eventCode,
      displayName: item.displayName,
      eventDescription: item.eventDescription,
      sop: item.sop,
      high: item.high,
      high1: item.high1,
      high2: item.high2,
      low: item.low,
      low1: item.low1,
      low2: item.low2,
    },
  });

  const handleFlightPhaseChange = (value) => {
    setFlightPhase(value);
  };

  const handleEventTriggerChange = (value) => {
    if (value === ">=") {
      setIsHigh(true);
      setIsLow(false);
    }
    if (value === "<=") {
      setIsLow(true);
      setIsHigh(false);
    }
    setEventTrigger(value);
  };

  const handleEventTypeChange = (value) => {
    setEventType(value);
  };

  function onSubmit(data) {
    data.aircraftId = value;
    data.eventParameter = valueParameter;
    data.eventTrigger = eventTrigger;
    data.eventType = eventType;
    data.flightPhase = flightPhase;
    console.log(data);
    startTransition(async () => {
      try {
        const response = await updateEvent(item.id, data);
        if (response) {
          toast.success("Event Updated successfully");
          // close the dialog
          reset();
        }
      } catch (error) {
        toast.error("Failed to Update event");
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
      <DialogContent size="5xl" className="overflow-y-auto max-h-screen p-4">
        <DialogHeader>
          <DialogTitle>Update Event Definition</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <>
                <div className="col-span-12 ">
                  <h4 className="text-sm font-medium text-default-600">
                    Update Event Details
                  </h4>
                  <p className="text-xs text-default-600 mt-1">
                    Fill in the box with correct data
                  </p>
                </div>
                <div className="grid mt-3 mb-3 grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-6">
                  {isDesktop ? (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className=" justify-start">
                          {value ? (
                            <>
                              {
                                aircraftList.find(
                                  (aircraft) => aircraft.id === value
                                )?.serialNumber
                              }
                            </>
                          ) : (
                            <>Select Aircraft</>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <StatusList
                          setOpen={setOpen}
                          setValue={setValue}
                          aircraftList={aircraftList}
                          setParameters={setParameters}
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Drawer open={open} onOpenChange={setOpen}>
                      <DrawerTrigger asChild>
                        <Button variant="outline" className="justify-start">
                          {value ? (
                            <>
                              {
                                aircraftList.find(
                                  (aircraft) => aircraft.id === value
                                )?.serialNumber
                              }
                            </>
                          ) : (
                            <>Select Aircraft</>
                          )}
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mt-4 border-t">
                          <StatusList
                            setOpen={setOpen}
                            setValue={setValue}
                            aircraftList={aircraftList}
                            setParameters={setParameters}
                          />
                        </div>
                      </DrawerContent>
                    </Drawer>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Input
                    id="eventName"
                    type="text"
                    placeholder="Event Name"
                    {...register("eventName", {
                      required: "Event Name is required",
                    })}
                    className={cn("mt-1", {
                      "border-red-500": errors.eventName,
                    })}
                  />
                  {errors.airline && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.eventName.message}
                    </p>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Input
                    id="eventCode"
                    type="text"
                    placeholder="Event Code"
                    {...register("eventCode", {
                      required: "Event Code is required",
                    })}
                    className={cn("mt-1", {
                      "border-red-500": errors.eventCode,
                    })}
                  />
                  {errors.eventCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.eventCode.message}
                    </p>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="displayName"
                    {...register("displayName", {
                      required: "Display Name is required",
                    })}
                    className={cn("mt-1", {
                      "border-red-500": errors.displayName,
                    })}
                  />
                  {errors.displayName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.displayName.message}
                    </p>
                  )}
                </div>
                {/* flight phases, event trigger, event parameter, event type */}
                <div className="col-span-12 lg:col-span-6">
                  <Select onValueChange={handleFlightPhaseChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Flight Phases" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="takeoff">Takeoff</SelectItem>
                      <SelectItem value="cruise">Cruise</SelectItem>
                      <SelectItem value="landing">Landing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Select onValueChange={handleEventTriggerChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Event Trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=">=">{`>=`}</SelectItem>
                      <SelectItem value="<=">{`<=`}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-12 lg:col-span-6">
                  {isDesktop ? (
                    <Popover
                      open={openParameter}
                      onOpenChange={setOpenParameter}
                    >
                      <PopoverTrigger asChild>
                        <Button variant="outline" className=" justify-start">
                          {valueParameter ? (
                            <>{valueParameter}</>
                          ) : (
                            <>Select Parameter</>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <ParameterList
                          setOpenParameter={setOpenParameter}
                          setValueParameter={setValueParameter}
                          parameters={parameters}
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Drawer
                      open={openParameter}
                      onOpenChange={setOpenParameter}
                    >
                      <DrawerTrigger asChild>
                        <Button variant="outline" className="justify-start">
                          {valueParameter ? (
                            <>{valueParameter}</>
                          ) : (
                            <>Select Parameter</>
                          )}
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mt-4 border-t">
                          <ParameterList
                            setOpenParameter={setOpenParameter}
                            setValueParameter={setValueParameter}
                            parameters={parameters}
                          />
                        </div>
                      </DrawerContent>
                    </Drawer>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Select onValueChange={handleEventTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                </div>
              </>
              <>
                <div className="col-span-12">
                  <h4 className="text-sm font-medium text-default-600">
                    Update Event Description
                  </h4>
                  <p className="text-xs text-default-600 mt-1">
                    Fill in the box with correct data
                  </p>
                </div>
                <div className="mb-3 col-span-12">
                  <Textarea
                    placeholder="Description..."
                    {...register("eventDescription", {
                      required: "Event Description is required",
                    })}
                    className={cn("mt-1", {
                      "border-red-500": errors.eventDescription,
                    })}
                  />
                  {errors.eventDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.eventDescription.message}
                    </p>
                  )}
                </div>
              </>
              <>
                <div className="col-span-12 ">
                  <h4 className="text-sm font-medium text-default-600">
                    Update Event Severities
                  </h4>
                  <p className="text-xs text-default-600 mt-1">
                    Fill in the box with correct data
                  </p>
                </div>
                <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-6">
                  <Input
                    id="sop"
                    type="number"
                    placeholder="SOP"
                    {...register("sop", { required: "SOP is required" })}
                    className={cn("mt-1", {
                      "border-red-500": errors.sop,
                    })}
                  />
                  {errors.sop && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.sop.message}
                    </p>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Input
                    id="high"
                    type="number"
                    disabled={isLow}
                    placeholder="High Level 1"
                    {...register("high")}
                    className={cn("mt-1", {
                      "border-red-500": errors.high,
                    })}
                  />
                  {errors.high && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.high.message}
                    </p>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Input
                    id="high1"
                    type="number"
                    disabled={isLow}
                    placeholder="High Level 2"
                    {...register("high1")}
                    className={cn("mt-1", {
                      "border-red-500": errors.high1,
                    })}
                  />
                  {errors.high1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.high1.message}
                    </p>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Input
                    id="high2"
                    type="number"
                    disabled={isLow}
                    placeholder="High Level 3"
                    {...register("high2")}
                    className={cn("mt-1", {
                      "border-red-500": errors.high2,
                    })}
                  />
                  {errors.high2 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.high2.message}
                    </p>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Input
                    id="low"
                    type="number"
                    disabled={isHigh}
                    placeholder="Low Level 1"
                    {...register("low")}
                    className={cn("mt-1", {
                      "border-red-500": errors.low,
                    })}
                  />
                  {errors.low && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.low.message}
                    </p>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Input
                    id="low1"
                    type="number"
                    disabled={isHigh}
                    placeholder="Low Level 2"
                    {...register("low1")}
                    className={cn("mt-1", {
                      "border-red-500": errors.low1,
                    })}
                  />
                  {errors.low1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.low1.message}
                    </p>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Input
                    id="low2"
                    type="number"
                    placeholder="Low Level 3"
                    disabled={isHigh}
                    {...register("low2")}
                    className={cn("mt-1", {
                      "border-red-500": errors.low2,
                    })}
                  />
                  {errors.low2 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.low2.message}
                    </p>
                  )}
                </div>
                </div>
              </>
            </div>

            <div className="flex pt-2 ">
              <div className="flex-1	gap-4 " />
              <div className="flex	gap-2 ">
                <Button
                  size="xs"
                  color="primary"
                  className="cursor-pointer"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? <Loader2 size="20" /> : "Update Event"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditingDialog;

function StatusList({ setOpen, setValue, aircraftList, setParameters }) {
  return (
    <Command>
      <CommandInput placeholder="Filter Aircraft..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {aircraftList.map((aircraft) => (
            <CommandItem
              key={aircraft.id}
              value={aircraft.id}
              onSelect={(values) => {
                setValue(
                  aircraftList.find((aircraft) => aircraft.id === values).id ||
                    null
                );
                setParameters(
                  JSON.parse(
                    aircraftList.find((aircraft) => aircraft.id === values)
                      .parameters
                  ) || []
                );
                setOpen(false);
              }}
            >
              {aircraft.serialNumber}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function ParameterList({ setOpenParameter, setValueParameter, parameters }) {
  return (
    <Command>
      <CommandInput placeholder="Filter Aircraft..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {parameters.map((parameter) => (
            <CommandItem
              key={parameter}
              value={parameter}
              onSelect={(values) => {
                setValueParameter(values.toUpperCase() || null);
                setOpenParameter(false);
              }}
            >
              {parameter}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
