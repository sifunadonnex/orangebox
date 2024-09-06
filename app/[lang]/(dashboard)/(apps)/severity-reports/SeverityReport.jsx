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
import EventsSeverity from "./events-severity";
import EventSeverityCount from "./event-severity-count";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import Blank from "@/components/blank";
function SeverityReport({ flights }) {
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
    <div className="overflow-x-auto flex gap-4 flex-col">
      {/* exceedances by flight phase(pie chart) */}
      <Card>
        <CardHeader className="border-none p-6 pt-5 mb-0">
          <CardTitle className="text-lg font-semibold text-default-900 p-0">
            Exceedances by Severity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="dashtail-legend">
            <EventsSeverity exceedances = {exceedances} />
          </div>
        </CardContent>
      </Card>
      {/* count of flights and events by month */}
      <Card>
        <CardHeader className="border-none p-6 pt-5 mb-0">
          <CardTitle className="text-lg font-semibold text-default-900 p-0">
            Count of Exceedances by Severity Level 
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="dashtail-legend">
            <EventSeverityCount exceedances = {exceedances} flights = {flights} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SeverityReport;
