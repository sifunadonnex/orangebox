"use client";
import React from "react";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { updateUser } from "@/action/api-action";
import { useForm } from "react-hook-form";
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
  
import { Icon } from "@iconify/react";

const schema = z.object({
  fullName: z.string().nonempty(),
  username: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10),
  company: z.string().nonempty(),
  role: z.string().nonempty(),
});
const EditingDialog = ({item}) => {
  const [isPending, startTransition] = React.useTransition();
  const [activeStep, setActiveStep] = React.useState(0);

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
        fullName: item.fullName,
        username: item.username,
        email: item.email,
        password: item.password,
        phone: item.phone,
        company: item.company,
        role: item.role
    },
  });
  const onSubmit = (data) => {
    startTransition(async () => {
      try {
        const response = await updateUser(item.id, data);
        if (response) {
          toast.success("User Updated successfully");
        }
      } catch (error) {
        toast.error("Failed to Update user");
      }
    });
  };
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
            <DialogTitle>Edit User</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                      <Input type="text" placeholder="Aircraft" />
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
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Event Parameter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Textarea placeholder="Description..." id="description" rows="4" required />
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
                      <Input
                        type="text"
                        placeholder="SOP"
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="High Level 1" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input
                        type="text"
                        placeholder="High Level 2"
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="High Level 3" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input
                        type="text"
                        placeholder="Low Level 1"
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input type="text" placeholder="Low Level 2" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <Input
                        type="text"
                        placeholder="Low Level 3"
                      />
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
    </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  export default EditingDialog;