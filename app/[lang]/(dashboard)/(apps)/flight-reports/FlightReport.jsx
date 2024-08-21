"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EventsFlightPhase from "./events-flight-phase";
import FlightEventCount from "./flight-event-count";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import Blank from "@/components/blank";
function FlightReport({ flights }) {
  //get exceedances from flights
  const exceedances = flights?.map((item) => item.Exceedance).flat();
  if (flights?.length < 1) {
    return (
      <Blank className="max-w-[320px] mx-auto flex flex-col items-center justify-center h-full space-y-3">
        <div className=" text-default-900 text-xl font-semibold">
          No Flights Analysed
        </div>
        <div className=" text-sm  text-default-600 ">
          You have not analysed any flight yet.
        </div>
        <div></div>
        <Button onClick={() => (window.location.href = "/new-event")}>
          <Plus className="w-4 h-4 text-primary-foreground mr-2" />
          Add Event Definition
        </Button>
      </Blank>
    );
  }
  return (
    <div className="overflow-x-auto flex flex-col">
      <Card>
        <CardHeader className="border-none p-6 pt-5 mb-0">
          <CardTitle className="text-lg font-semibold text-default-900 p-0">
            Analysed Flights List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="dashtail-legend">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead>Flight Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Count of Exceedances</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>{item.flightHours}</TableCell>
              <TableCell>{item.departure}</TableCell>
              <TableCell>{item.destination}</TableCell>
              <TableCell>
                <Badge
                  variant="soft"
                  color={
                    (item?.Exceedance?.length === 0 && "success") ||
                    (item?.Exceedance?.length > 0 && "info") ||
                    (item?.Exceedance?.length > 5 && "warning") ||
                    (item?.Exceedance?.length > 10 && "destructive")
                  }
                  className=" capitalize"
                >
                  {item.Exceedance?.length}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </div>
        </CardContent>
      </Card>
      {/* exceedances by flight phase(pie chart) */}
      <Card>
        <CardHeader className="border-none p-6 pt-5 mb-0">
          <CardTitle className="text-lg font-semibold text-default-900 p-0">
            Exceedances by Flight Phase
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="dashtail-legend">
            <EventsFlightPhase exceedances = {exceedances} />
          </div>
        </CardContent>
      </Card>
      {/* count of flights and events by month */}
      <Card>
        <CardHeader className="border-none p-6 pt-5 mb-0">
          <CardTitle className="text-lg font-semibold text-default-900 p-0">
            Count of Flights and Events by Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="dashtail-legend">
            <FlightEventCount exceedances = {exceedances} flights = {flights} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FlightReport;
