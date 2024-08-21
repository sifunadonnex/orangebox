"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Aircraft from "./advanced";
import { getAircrafts, getFlights } from "@/action/api-action";
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
import { useUser } from "@/store";

const DataTablePage = () => {
  let userFlights;
  const { user } = useUser()
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['aircrafts'],
    queryFn: async () => await getAircrafts(),
  });

  if (isPending) return <LayoutLoader />;
  if (isError) console.log(error);
  if(user?.role !== "admin" && data && user?.aircraftIdList){
    userFlights = data?.filter((item)=>user?.aircraftIdList.includes(item.id))
  }
  return (
    <div className=" space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Flights</CardTitle>
        </CardHeader>
        <CardContent >
          {user?.role === "admin" ? (
            <Aircraft data = {data} />
          ) : (
            <Aircraft data = {userFlights} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTablePage;
