"use client";

import Card from "@/components/ui/card-snippet";
import { Button } from "@/components/ui/button";
import RowEditingDialog from "./row-editing-dialog";
import { getEvents } from "@/action/api-action";
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
import { useUser } from "@/store";

const TailwindUiTable = () => {
  const { user } = useUser()
  // if(user.role !== "admin"){
  //   window.location.href="/dashboard"
  // }
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => await getEvents(),
  });

  if (isPending) return <LayoutLoader />;
  if (isError) console.log(error);
  return (
    <div className=" space-y-6">
      <Card >
        <div className="flex flex-wrap items-center gap-4 mb-1">
          <div className="flex-1">
            <h3 className="text-xl font-medium text-default-700 mb-2">Events List</h3>
          </div>
          <div className="flex-none">
            <Button
              onClick={() => {
                window.location.href = "/new-event";
              }}
              type="button"
            >
              New Event Definition
            </Button>
          </div>
        </div>
        <RowEditingDialog events = {{data}} />
      </Card>
    </div>
  );
};

export default TailwindUiTable;
