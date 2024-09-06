"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Icon } from "@iconify/react";
import { updateUser } from "@/action/api-action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const schema = z.object({
  fullName: z.string().nonempty(),
  username: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().nonempty(),
  department: z.string().nonempty(),
  designation: z.string().nonempty(),
  password: z.string().nonempty(),
});

const ManageUsers = ({user}) => {
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
      company: user.company,
  },
  });
  const onSubmit = (data) => {
    data.gateId = user.id;
    startTransition(async () => {
      try {
        const response = await updateUser(uaer.id, data);
        if (response) {
          toast.success("User Details Added successfully");
          reset();
        }
      } catch (error) {
        toast.error("Failed to Add User Details");
      }
    });
  };
  return (
    <Card className="rounded-t-none pt-6">
      <CardContent>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="fullName" className="mb-2">Full Name</Label>
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
          <Label htmlFor="username" className="mb-2">Username</Label>
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
          <Label htmlFor="email" className="mb-2">Email</Label>
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
          <Label htmlFor="phone" className="mb-2">Phone</Label>
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
          <Label htmlFor="company" className="mb-2">Company</Label>
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
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="department" className="mb-2">Department</Label>
          <InputGroup>
            <Input
              type="text"
              id="department"
              placeholder="Department"
              {...register("department")}
            />
            <InputGroupText>
              <Icon icon="bi:people-fill" />
            </InputGroupText>
          </InputGroup>
          {errors.department && (
            <span className="text-red-500 text-sm">Department is required</span>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="designation" className="mb-2">Designation</Label>
          <InputGroup>
            <Input
              type="text"
              id="designation"
              placeholder="Designation"
              {...register("designation")}
            />
            <InputGroupText>
              <Icon icon="bi:badge-cc-fill" />
            </InputGroupText>
          </InputGroup>
          {errors.designation && (
            <span className="text-red-500 text-sm">Designation is required</span>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Label htmlFor="password" className="mb-2">Password</Label>
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
    </CardContent>
    </Card>
  );
};

export default ManageUsers;
