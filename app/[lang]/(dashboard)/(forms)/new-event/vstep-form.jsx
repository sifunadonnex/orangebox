"use client";
import React from "react";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
const VStepForm = ({aircraftList}) => {
  console.log(JSON.parse(aircraftList[1].parameters));
  const [activeStep, setActiveStep] = React.useState(0);
  const [parameters, setParameters] = React.useState([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [openParameter, setOpenParameter] = React.useState(false);
  const [valueParameter, setValueParameter] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const steps = [
    {
      label: "Event Details",
      content: "",
    },
    {
      label: "Event Description",
      content: "",
    },
    {
      label: "Event Severities",
      content: "",
    },
  ];

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = () => {
    toast({
      title: "You submitted the following values:",
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 top-0 right-0">
          <p className="text-primary-foreground">Done</p>
        </div>
      ),
    });
  };

  return (
    <div className="grid grid-cols-12">
      <div className="xl:col-span-3 col-span-12">
        <Stepper current={activeStep} direction="vertical">
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <StepLabel variant="caption">Optional</StepLabel>
              );
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                  <div className="flex flex-col">
                    <span> {label.label}</span>
                    <span> {label.content}</span>
                  </div>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      <div className="col-span-12 xl:col-span-9">
        {activeStep === steps.length ? (
          <React.Fragment>
            <div className="mt-2 mb-2 font-semibold text-center">
              All steps completed - you&apos;re finished
            </div>
            <div className="flex pt-2">
              <div className=" flex-1" />
              <Button
                size="xs"
                variant="outline"
                color="destructive"
                className="cursor-pointer"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <form>
              <div className="grid grid-cols-12 gap-4">
                {activeStep === 0 && (
                  <>
                    <div className="col-span-12 ">
                      <h4 className="text-sm font-medium text-default-600">
                        Enter Event Details
                      </h4>
                      <p className="text-xs text-default-600 mt-1">
                        Fill in the box with correct data
                      </p>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      {isDesktop ? (
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className=" justify-start"
                            >
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
                          <PopoverContent
                            className="w-full p-0"
                            align="start"
                          >
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
                      <Input type="text" placeholder="Event Name" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="Event Code" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="Display Name" />
                    </div>
                    {/* flight phases, event trigger, event parameter, event type */}
                    <div className="col-span-12 lg:col-span-6">
                      <Select>
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
                      <Select>
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
                            <Button
                              variant="outline"
                              className=" justify-start"
                            >
                              {valueParameter ? (
                                <>
                                  {valueParameter}
                                </>
                              ) : (
                                <>Select Parameter</>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-full p-0"
                            align="start"
                          >
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
                                <>
                                  {valueParameter}
                                </>
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
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Event Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <div className="col-span-12">
                      <h4 className="text-sm font-medium text-default-600">
                        Enter Event Description
                      </h4>
                      <p className="text-xs text-default-600 mt-1">
                        Fill in the box with correct data
                      </p>
                    </div>
                    <div className="col-span-12">
                      <Textarea
                        placeholder="Description..."
                        id="description"
                        rows="4"
                        required
                      />
                    </div>
                  </>
                )}

                {activeStep === 2 && (
                  <>
                    <div className="col-span-12 ">
                      <h4 className="text-sm font-medium text-default-600">
                        Enter Event Severities
                      </h4>
                      <p className="text-xs text-default-600 mt-1">
                        Fill in the box with correct data
                      </p>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="SOP" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="High Level 1" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="High Level 2" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="High Level 3" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="Low Level 1" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="Low Level 2" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="Low Level 3" />
                    </div>
                  </>
                )}
              </div>
            </form>

            <div className="flex pt-2 ">
              <Button
                size="xs"
                variant="outline"
                color="secondary"
                className={cn("cursor-pointer", {
                  hidden: activeStep === 0,
                })}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <div className="flex-1	gap-4 " />
              <div className="flex	gap-2 ">
                {activeStep === steps.length - 1 ? (
                  <Button
                    size="xs"
                    variant="outline"
                    color="success"
                    className="cursor-pointer"
                    onClick={() => {
                      if (onSubmit) onSubmit();
                      handleNext();
                    }}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    size="xs"
                    variant="outline"
                    color="secondary"
                    className="cursor-pointer"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default VStepForm;

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
                  JSON.parse(aircraftList.find((aircraft) => aircraft.id === values)
                    .parameters) || []
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
                setValueParameter(
                  values.toUpperCase() ||
                    null
                );
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
