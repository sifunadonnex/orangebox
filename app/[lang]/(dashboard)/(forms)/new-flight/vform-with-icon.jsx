"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { newFlight, addExceedance } from "@/action/api-action";
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
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import Papa from "papaparse";
import { useUser } from "@/store";
import { Home, } from "lucide-react";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Flight name must be at least 3 charecters." }),
  departure: z
    .string()
    .min(3, { message: "Departure must be at least 3 charecters." }),
  destination: z
    .string()
    .min(3, { message: "Destination must be at least 3 charecters." }),
  flightHours: z
    .string()
    .min(1, { message: "Flight hours must be at least 1." }),
  pilot: z.string().min(3, { message: "Pilot must be at least 3 charecters." }),
});

const VFormWithIcon = ({ aircraftList }) => {
  const { user } = useUser()
  if(user?.role !== "admin"){
    window.location.href="/dashboard"
  }
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const [file, setFile] = React.useState(null);
  let events = [];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const analyseEvent = (csvText, idFlight, file) => {
    // get range data
    const data = csvText;
    const flightId = idFlight;
    const fileName = file;

    const processEvents = (events, data, flightId, fileName) => {
      const processedExceedances = [];
      let exceedanceLevel;

      events.forEach((event) => {
        let {
          high,
          high1,
          high2,
          low,
          low1,
          low2,
          eventParameter,
          displayName,
          eventStatus,
          flightPhase,
          aircraftId,
          id,
        } = event;
        let exceedances = [];
        const rangeData = [];
        for (const element of data) {
          //get Sample and AIRSPEED if the phase is CR
          if (element.Phase === flightPhase) {
            rangeData.push([
              element.Sample,
              parseFloat(element[`${eventParameter}`]),
            ]);
          }
        }

        if (high !== undefined && high !== null && high !== "") {
          // Loop through the data and check the values exceeding the high value and set the exceedance level
          const aboveHigh = rangeData.filter((d) => d[1] > high);
          if (aboveHigh.length > 0) {
            exceedanceLevel = "Level 1";
          }
          // Combine high exceedances with their time of occurrence
          exceedances = exceedances.concat(
            aboveHigh.map((e) => ({ time: e[0], value: e[1] }))
          );
        }

        if (high1 !== undefined && high1 !== null && high1 !== "") {
          // Loop through the data and check the values exceeding the high1 value and set the exceedance level
          const aboveHigh1 = rangeData.filter((d) => d[1] > high1);
          if (aboveHigh1.length > 0) {
            exceedanceLevel = "Level 2";
          }
        }

        if (high2 !== undefined && high2 !== null && high2 !== "") {
          // Loop through the data and check the values exceeding the high2 value and set the exceedance level
          const aboveHigh2 = rangeData.filter((d) => d[1] > high2);
          if (aboveHigh2.length > 0) {
            exceedanceLevel = "Level 3";
          }
        }

        if (low !== undefined && low !== null && low !== "") {
          // Loop through the data and check the values below the low value
          const belowLow = rangeData.filter((d) => d[1] < low);
          // Combine low exceedances with their time of occurrence
          exceedances = exceedances.concat(
            belowLow.map((e) => ({ time: e[0], value: e[1] }))
          );
        }

        if (low1 !== undefined && low1 !== null && low1 !== "") {
          // Loop through the data and check the values below the low1 value
          const belowLow1 = rangeData.filter((d) => d[1] < low1);
          if (belowLow1.length > 0) {
            exceedanceLevel = "Level 2";
          }
        }

        if (low2 !== undefined && low2 !== null && low2 !== "") {
          // Loop through the data and check the values below the low2 value
          const belowLow2 = rangeData.filter((d) => d[1] < low2);
          if (belowLow2.length > 0) {
            exceedanceLevel = "Level 3";
          }
        }

        if (exceedances.length > 0) {
          processedExceedances.push({
            exceedanceValues: JSON.stringify(exceedances),
            flightPhase,
            parameterName: eventParameter,
            description: displayName,
            eventStatus: eventStatus || "Under Review",
            aircraftId,
            flightId,
            file: fileName,
            eventId: id,
            exceedanceLevel,
          });
        }
      });

      return processedExceedances;
    };

    const exceedances = processEvents(events, data, flightId, fileName);

    if (exceedances.length > 0) {
      startTransition(async () => {
        try {
          const response = await addExceedance(exceedances);
          if (response) {
            toast.success("Flight analysed successfully");
          }
        } catch (error) {
          toast.error("Failed to analyze Flight");
        }
      });
    }
    if (exceedances.length === 0) {
      toast.success("No exceedances found");
    }
  };

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("file", file); // Assuming 'file' is your file input
    formData.append("aircraftId", value);
    formData.append("name", data.name);
    formData.append("departure", data.departure);
    formData.append("destination", data.destination);
    formData.append("flightHours", data.flightHours);
    formData.append("pilot", data.pilot);

    startTransition(async () => {
      try {
        const response = await newFlight(formData);
        if (response) {
          toast.success("Flight added successfully");
          events = aircraftList.find(
            (aircraft) => aircraft.id === value
          ).EventLog;
          Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
              analyseEvent(results.data, response.id, response.file);
            },
          });
          reset();
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to add flight");
      }
    });
  }

  return (
    <>
    {user?.role === "admin" ? (
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
          <Label htmlFor="name">Flight Name</Label>
          <InputGroup
            merged
            className={cn("", { "border-red-500": errors.name })}
          >
            <InputGroupText>
              <Icon icon="material-symbols:flight" />
            </InputGroupText>
            <Input
              type="text"
              placeholder="Flight name"
              id="name"
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
          <InputGroup
            merged
            className={cn("", { "border-red-500": errors.departure })}
          >
            <InputGroupText>
              <Icon icon="vaadin:flight-takeoff" />
            </InputGroupText>
            <Input
              type="text"
              placeholder="Departure"
              id="departure"
              {...register("departure", { required: true })}
            />
          </InputGroup>
          {errors.departure && (
            <p className="text-red-500 text-sm mt-1">
              {errors.departure.message}
            </p>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
          <Label htmlFor="destination">Destination</Label>
          <InputGroup
            merged
            className={cn("flex", { "border-red-500": errors.destination })}
          >
            <InputGroupText>
              <Icon icon="vaadin:flight-landing" />
            </InputGroupText>
            <Input
              type="text"
              placeholder="Destination"
              id="destination"
              {...register("destination", { required: true })}
            />
          </InputGroup>
          {errors.destination && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destination.message}
            </p>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
          <Label htmlFor="flightHours">Flight Hours</Label>
          <InputGroup
            merged
            className={cn("flex", { "border-red-500": errors.flightHours })}
          >
            <InputGroupText>
              <Icon icon="mingcute:time-line" />
            </InputGroupText>
            <Input
              type="number"
              placeholder="Type number"
              id="flightHours"
              {...register("flightHours", { required: true })}
            />
          </InputGroup>
          {errors.flightHours && (
            <p className="text-red-500 text-sm mt-1">
              {errors.flightHours.message}
            </p>
          )}
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
          <Label htmlFor="state">Aircraft</Label>
          {isDesktop ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className=" justify-start">
                  {value ? (
                    <>{aircraftList.find((aircraft) => aircraft.id === value)
                      ?.serialNumber }</>
                  ) : (
                    <>Select Aircraft</>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <StatusList
                  setOpen={setOpen}
                  setValue={setValue}
                  aircraftList={aircraftList}
                />
              </PopoverContent>
            </Popover>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="justify-start">
                  {value ? (
                    <>{aircraftList.find((aircraft) => aircraft.id === value)
                      ?.serialNumber }</>
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
                  />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1  flex flex-col gap-2">
          <Label htmlFor="pilot">Pilot</Label>
          <InputGroup
            merged
            className={cn("", { "border-red-500": errors.pilot })}
          >
            <InputGroupText>
              <Icon icon="twemoji:pilot" />
            </InputGroupText>
            <Input
              type="text"
              placeholder="Type Pilot"
              id="copilotmpany"
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
              "Add Flight"
            )}
          </Button>
        </div>
      </div>
    </form>
    ) : (
      <div className="flex flex-col items-center justify-center h-full">
        <Home size={64} color="red" />
        <h1 className="text-xl font-bold text-red-600">You are not authorized to view this page</h1>
      </div>
    )}
    </>
  );
};

export default VFormWithIcon;

function StatusList({ setOpen, setValue, aircraftList }) {
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
                  aircraftList.find((aircraft) => aircraft.id === values).id || null
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
