"use client";
import React from "react";
import FlightChart from "./chart";
import ExceedanceCard from "./exceedance-card";
import { getFlightById, getExceedanceByFlightId } from "@/action/api-action";
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
import { Card,CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FlightLayout =  ({ children, params }) => {
  const { id } = params;
  const { data: flight, isLoading } = useQuery({
    queryKey: ['flight'],
    queryFn: async () => await getFlightById(id),
  });
  const { data: exceedances, isLoading: exceedancesLoading } = useQuery({
    queryKey: ['exceedances'],
    queryFn: async () => await getExceedanceByFlightId(id),
    });

  if (isLoading || exceedancesLoading) {
    return <LayoutLoader />;
  }

  return (
    <div className="grid grid-cols-12  gap-6 ">
        <div className="col-span-12 lg:col-span-9">
        <Card className="m-0 b-0">
            <CardHeader>
                <CardTitle>Flight {flight.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <FlightChart flight={flight} />
            </CardContent>
        </Card>
        </div>
        <div className="col-span-12 lg:col-span-3">
        <Card>
            <CardHeader>
                <CardTitle>Exceedances</CardTitle>
            </CardHeader>
            <CardContent>
                <ExceedanceCard exceedances={exceedances} />
            </CardContent>
        </Card>
        </div>
        {children}
      </div>
  );
};

export default FlightLayout;
