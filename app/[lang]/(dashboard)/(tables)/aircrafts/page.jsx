"use client";

import Card from "@/components/ui/card-snippet";
import { Button } from "@/components/ui/button";
import RowEditingDialog from "./row-editing-dialog";
import { getAircrafts } from "@/action/api-action";
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
const TailwindUiTable = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['aircrafts'],
    queryFn: async () => await getAircrafts(),
  });

  if (isPending) return <LayoutLoader />;
  if (isError) console.log(error);
  return (
    <div className=" space-y-6">
      <Card >
        <div className="flex flex-wrap items-center gap-4 mb-1">
          <div className="flex-1">
            <h3 className="text-xl font-medium text-default-700 mb-2">Aircraft List</h3>
          </div>
          <div className="flex-none">
            <Button
              onClick={() => {
                window.location.href = "/new-aircraft";
              }}
              type="button"
            >
              Add Aircraft
            </Button>
          </div>
        </div>
        <RowEditingDialog aircrafts = {{data}} />
      </Card>
    </div>
  );
};

export default TailwindUiTable;
