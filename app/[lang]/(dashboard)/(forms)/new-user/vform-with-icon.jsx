"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Icon } from "@iconify/react";
import { addUser } from "@/action/api-action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { useUser } from "@/store";
import { Home, } from "lucide-react";

const schema = z.object({
  fullName: z.string().nonempty(),
  username: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10),
  company: z.string().nonempty(),
});

const VFormWithIcon = () => {
  const { user } = useUser()
  if(user?.role !== "admin"){
    window.location.href="/dashboard"
  }
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
    mode: "all",
  });
  const roles = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];
  const onSubmit = (data) => {
    data.role = value;
    startTransition(async () => {
      try {
        const response = await addUser(data);
        if (response) {
          toast.success("User added successfully");
          reset();
        }
      } catch (error) {
        toast.error("Failed to add user");
      }
    });
  };
  return (
    <>
    {user?.role === "admin" ? (
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="fullName">Full Name</Label>
          <InputGroup>
            <Input
              type="text"
              id="fullName"
              placeholder="Full Name"
              {...register("fullName")}
            />
            <InputGroupText>
              <Icon icon="bi:person-fill" />
            </InputGroupText>
          </InputGroup>
          {errors.fullName && (
            <span className="text-red-500 text-sm">Full Name is required</span>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="username">Username</Label>
          <InputGroup>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              {...register("username")}
            />
            <InputGroupText>
              <Icon icon="bi:person-fill" />
            </InputGroupText>
          </InputGroup>
          {errors.username && (
            <span className="text-red-500 text-sm">Username is required</span>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="email">Email</Label>
          <InputGroup>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
            <InputGroupText>
              <Icon icon="bi:envelope-fill" />
            </InputGroupText>
          </InputGroup>
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="password">Password</Label>
          <InputGroup>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            <InputGroupText>
              <Icon icon="bi:lock-fill" />
            </InputGroupText>
          </InputGroup>
          {errors.password && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="phone">Phone</Label>
          <InputGroup>
            <Input
              type="text"
              id="phone"
              placeholder="Phone"
              {...register("phone")}
            />
            <InputGroupText>
              <Icon icon="bi:phone-fill" />
            </InputGroupText>
          </InputGroup>
          {errors.phone && (
            <span className="text-red-500 text-sm">Phone is required</span>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="role">Role</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {value
                  ? roles.find((role) => role.value === value)?.label
                  : "Select Role"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No Role found.</CommandEmpty>
                <CommandGroup>
                  {roles.map((role) => (
                    <CommandItem
                      key={role.value}
                      value={role.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === role.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {role.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="company">Company</Label>
          <InputGroup>
            <Input
              type="text"
              id="company"
              placeholder="Company"
              {...register("company")}
            />
            <InputGroupText>
              <Icon icon="bi:building-fill" />
            </InputGroupText>
          </InputGroup>
          {errors.company && (
            <span className="text-red-500 text-sm">Company is required</span>
          )}
        </div>
        {/* accept terms */}
        <div className="col-span-2">
          <Checkbox
            id="acceptTerms"
            {...register("acceptTerms", { required: true })}
          >
            <span className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-primary">
                terms and conditions
              </a>
            </span>
          </Checkbox>
          {errors.acceptTerms && (
            <span className="text-red-500 text-sm">Please accept terms</span>
          )}
        </div>
        <div>
          <Button
            type="submit"
            className="bg-primary text-white"
            disabled={isPending}
          >
            {isPending ? <Loader2 /> : "Add User"}
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
