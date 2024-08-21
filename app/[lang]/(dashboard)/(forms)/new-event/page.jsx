"use client"
import Card from "@/components/ui/card-snippet";
import VStepForm from "./vstep-form";
import { getAircrafts } from '@/action/api-action'
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
import { useUser } from "@/store";

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
