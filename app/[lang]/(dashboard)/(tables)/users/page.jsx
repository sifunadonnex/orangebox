"use client";

import Card from "@/components/ui/card-snippet";
import { Button } from "@/components/ui/button";
import RowEditingDialog from "./row-editing-dialog";
import { getUsers } from "@/action/api-action";
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
import { useUser } from "@/store";
import { Home, } from "lucide-react";
const TailwindUiTable = () => {
  const { user } = useUser()
  if(user?.role !== "admin"){
    window.location.href="/dashboard"
  }
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => await getUsers(),
  });

  if (isPending) return <LayoutLoader />;
  if (isError) console.log(error);
  return (
    <div className=" space-y-6">
      {user?.role === "admin" ? (
        <Card >
        <div className="flex flex-wrap items-center gap-4 mb-1">
          <div className="flex-1">
            <h3 className="text-xl font-medium text-default-700 mb-2">User List</h3>
          </div>
          <div className="flex-none">
            <Button
              onClick={() => {
                window.location.href = "/new-user";
              }}
              type="button"
            >
              Add User
            </Button>
          </div>
        </div>
        <RowEditingDialog users = {{data}} />
      </Card>
      ):(
        <div className="flex flex-col items-center justify-center h-full">
          <Home size={64} color="red" />
          <h1 className="text-xl font-bold text-red-600">You are not authorized to view this page</h1>
        </div>
      )}
    </div>
  );
};

export default TailwindUiTable;
