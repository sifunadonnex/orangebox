"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
//at least one number, symol or whitespace character
const schema = z.object({
  newPassword: z.string().min(8).regex(/[A-Z]/,"Password must contain at least one uppercase letter").regex(/[a-z]/,"Password must contain at least one lowercase letter").regex(/[0-9\W]/,"Password must contain at least one number, symbol or whitespace character"),
  confirmPassword: z.string().min(8).regex(/[A-Z]/,"Password must contain at least one uppercase letter").regex(/[a-z]/,"Password must contain at least one lowercase letter").regex(/[0-9\W]/,"Password must contain at least one number, symbol or whitespace character"),
});

const ChangePassword = () => {
  const [currentPasswordType, setCurrentPasswordType] = useState("password")
  const [newPasswordType, setNewPasswordType] = useState("password")
  const [confirmPasswordType, setConfirmPasswordType] = useState("password")
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

  const onSubmit = (data) => {
    data.updateLevel = "password";
    data.password = data.newPassword;
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    startTransition(async () => {
      try {
        const response = await updateUser(uaer.id, data);
        if (response) {
          toast.success("Password Updated successfully");
          reset();
        }
      } catch (error) {
        toast.error("Failed to Update password");
      }
    });
  };

  return (
    <>
      <Card className="rounded-t-none pt-6">
        <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 md:gap-x-12 gap-y-5">
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="currentPassword" className="mb-2 text-default-800">Current Password</Label>
              <div className="relative">
                <Input id="currentPassword" type={currentPasswordType} />
                <Eye
                  className={cn("absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer", currentPasswordType === "text" && "hidden")}
                  onClick={() => setCurrentPasswordType("text")}
                />
                <EyeOff
                  className={cn("absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer", currentPasswordType === "password" && "hidden")}
                  onClick={() => setCurrentPasswordType("password")}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6"></div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="newPassword" className="mb-2 text-default-800">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={newPasswordType}
                  {...register("newPassword")}
                />
                <Eye
                  className={cn("absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer", newPasswordType === "text" && "hidden")}
                  onClick={() => setNewPasswordType("text")}
                />
                <EyeOff
                  className={cn("absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer", newPasswordType === "password" && "hidden")}
                  onClick={() => setNewPasswordType("password")}
                />
                {errors.newPassword && (
                  <span className="text-red-500 text-sm">{errors.newPassword?.message}</span>
                )}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="confirmPassword" className="mb-2 text-default-800">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={confirmPasswordType}
                  {...register("confirmPassword")}
                />
                <Eye
                  className={cn("absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer", confirmPasswordType === "text" && "hidden")}
                  onClick={() => setConfirmPasswordType("text")}
                />
                <EyeOff
                  className={cn("absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer", confirmPasswordType === "password" && "hidden")}
                  onClick={() => setConfirmPasswordType("password")}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">{errors.confirmPassword?.messageaA}</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 text-sm font-medium text-default-800">Password Requirements:</div>
          <div className="mt-3 space-y-1.5">
            {
              [
                "Minimum 8 characters long - the more, the better.",
                "At least one lowercase character.",
                "At least one number, symbol, or whitespace character."
              ].map((item, index) => (
                <div
                  className="flex items-center gap-1.5"
                  key={`requirement-${index}`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-default-400"></div>
                  <div className="text-xs text-default-600">{item}</div>
                </div>
              ))
            }
          </div>
          <div className="mt-6 flex gap-5 justify-end">
            <Button color="secondary">Cancel</Button>
            <Button type="submit">
              <Icon icon="heroicons:lock-closed" className="w-5 h-5 text-primary-foreground me-1" />
              {isPending ? <Loader2 /> : "Change Password"}
            </Button>
          </div>
        </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ChangePassword;