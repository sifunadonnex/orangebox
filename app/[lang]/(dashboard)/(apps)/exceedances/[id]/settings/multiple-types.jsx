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
import { updateExceedance } from "@/action/api-action";
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

const schema = z.object({
  comment: z.string().nonempty("Comment is required"),
});

const MultipleTypes = ({ exceedance, id }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(exceedance?.eventStatus);
  const [isPending, startTransition] = React.useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const exceedanceStatus = [
    {value: 'Under Review', label: 'Under Review'},
    {value: 'Valid', label: 'Valid'},
    {value: 'Nuisance', label: 'Nuisance'},
    {value: 'False', label: 'False'}
  ]

  function onSubmit(data) {
    data.eventStatus = value;
    startTransition(async () => {
      try {
        const response = await updateExceedance(id, data);
        if (response) {
          toast.success("Exceedance updated successfully");
          reset();
        }
      } catch (error) {
        toast.error("Failed to update exceedance");
      }
    });
  }
  return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* select client */}
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="exceedanceStatus">Exceedance Status</Label>
              {isDesktop ? (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className=" justify-start">
                      {value ? (
                        <>
                          {exceedanceStatus.find(
                            (status) => status.value === value
                          )?.label}
                        </>
                      ) : (
                        <>Select Status</>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <StatusList
                      setOpen={setOpen}
                      setValue={setValue}
                      exceedanceStatus={exceedanceStatus}
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <Button variant="outline" className="justify-start">
                      {value ? (
                        <>
                          {exceedanceStatus.find(
                            (status) => status.value === value
                          )?.label}
                        </>
                      ) : (
                        <>Select Status</>
                      )}
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mt-4 border-t">
                      <StatusList
                        setOpen={setOpen}
                        setValue={setValue}
                        exceedanceStatus={exceedanceStatus}
                      />
                    </div>
                  </DrawerContent>
                </Drawer>
              )}
            </div>
            {/* comment */}
            <div className="col-span-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                {...register("comment")}
                error={errors.comment?.message}
                placeholder="Enter a comment for this exceedance"
              />
            </div>
          </div>
          <div className="mt-2">
            <Button
              type="submit"
              className="bg-primary text-white"
              disabled={isPending}
            >
              {isPending ? <Loader2 /> : "Update"}
            </Button>
          </div>
        </form>
  );
};

export default MultipleTypes;

function StatusList({ setOpen, setValue, exceedanceStatus }) {
  return (
    <Command>
      <CommandInput placeholder="Filter Status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {exceedanceStatus.map((exceedance) => (
            <CommandItem
              key={exceedance.value}
              value={exceedance.value}
              onSelect={(currentValue) => {
                setValue(currentValue === exceedance.value ? "" : exceedance.value)
                setOpen(false);
              }}
            >
              {exceedance.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
