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

const DataTablePage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['aircrafts'],
    queryFn: async () => await getAircrafts(),
  });

  if (isPending) return <LayoutLoader />;
  if (isError) console.log(error);
  return (
    <div className=" space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Flights</CardTitle>
        </CardHeader>
        <CardContent >
          <Aircraft data = {{data}} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTablePage;
