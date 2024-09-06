"use client"
import Card from "@/components/ui/card-snippet";
import VStepForm from "./vstep-form";
import { getAircrafts } from '@/action/api-action'
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
import { useUser } from "@/store";
import { Plus } from "lucide-react";
import Blank from "@/components/blank";
import { Button } from "@/components/ui/button";

const FormLayout = () => {
  const { user } = useUser()
  let userAircrafts;
  const { isPending, isError, data:aircrafts, error } = useQuery({
    queryKey: ['aircrafts'],
    queryFn: async () => await getAircrafts(),
  });
  if (isPending) return <LayoutLoader />;
  if (isError) console.log(error);
  if(user?.role !== "admin" && aircrafts && user?.aircraftIdList){
    userAircrafts = aircrafts?.filter((item)=>user?.aircraftIdList.includes(item.id))
  }
  if(user?.role === 'client'){
    return (
      <Blank className="max-w-[320px] mx-auto flex flex-col items-center justify-center h-full space-y-3">
        <div className=" text-default-900 text-xl font-semibold">
          Permision Required!
        </div>
        <div className=" text-sm  text-default-600 ">
        You have no permission to define a new Event, Please contact your Gate Keeper
        </div>
        <div></div>
        <Button onClick={() => (window.location.href = "/")}>
          <Plus className="w-4 h-4 text-primary-foreground mr-2" />
          Back to Dashboard
        </Button>
      </Blank>
    )
  }
  return (
    <div className="space-y-4">
      <Card title="Event Definition">
        {user?.role === "admin" ? (
          <VStepForm  aircraftList = {aircrafts} />
        ) : (
          <VStepForm  aircraftList = {userAircrafts} />
        )}
      </Card>
    </div>
  );
};

export default FormLayout;
