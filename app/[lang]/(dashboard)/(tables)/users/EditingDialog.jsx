"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Icon } from "@iconify/react";
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="fullName">Full Name</Label>
          <InputGroup>
            <Input
            {...register("fullName")}
              type="text"
              id="fullName"
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
        
        <div className="col-span-2">
          <Label htmlFor="role">Role</Label>
          <InputGroup>
            <Input
              type="text"
              id="role"
              {...register("role")}
            />
            <InputGroupText>
              <Icon icon="bi:person-fill" />
            </InputGroupText>
          </InputGroup>
          {errors.role && (
            <span className="text-red-500 text-sm">Role is required</span>
          )}
        </div>
        {/* accept terms */}
        <div className="col-span-2">
          <Checkbox
            id="acceptTerms"
            {...register("acceptTerms", { required: true })}
          >
            <span className="text-sm ml-2">
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
            {isPending ? <Loader2 /> : "Update User"}
          </Button>
        </div>
      </div>
    </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  export default EditingDialog;