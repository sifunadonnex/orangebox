"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsChart from "./reports-chart";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DashboardSelect from "@/components/dasboard-select";
import { cn } from "@/lib/utils";

const ReportsSnapshot = ({ aircrafts }) => {
  const flights = aircrafts?.map((item) => item.csv).flat();
  const exceedances = aircrafts?.map((item) => item.Exceedance).flat();
  const events = aircrafts?.map((item) => item.EventLog).flat();
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);
  const primary = `hsl(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
  })`;
  const warning = `hsl(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].warning
  })`;
  const success = `hsl(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].success
  })`;
  const info = `hsl(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].info
  })`;

const getMonthsCount = (data)=>{
  if(exceedances){
    const monthCounts = Array(12).fill(0); // Array to hold counts for each month
    data.forEach((exceedance) => {
      const month = new Date(exceedance?.createdAt).getMonth();
      monthCounts[month] += 1;
    });
    return monthCounts;
  }
}
  
  const tabsTrigger = [
    {
      value: "all",
      text: "Exceedances",
      total: exceedances?.length,
      color: "primary",
    },
    {
      value: "event",
      text: "Event Count",
      total: events?.length,
      color: "warning",
    },
    {
      value: "conversation",
      text: "Aircrafts",
      total: aircrafts?.length,
      color: "success",
    },
    {
      value: "newuser",
      text: "Flights",
      total: flights?.length,
      color: "info",
    },
  ];
  const tabsContentData = [
    {
      value: "all",
      series: [{ data: getMonthsCount(exceedances) }],
      color: primary,
    },
    {
      value: "event",
      series: [{ data: getMonthsCount(events) }],
      color: warning,
    },
    {
      value: "conversation",
      series: [{ data: getMonthsCount(aircrafts) }],
      color: success,
    },
    {
      value: "newuser",
      series: [{ data: getMonthsCount(flights) }],
      color: info,
    },
  ];
  return (
    <Card>
      <CardHeader className="border-none pb-0">
        <div className="flex items-center gap-2 flex-wrap ">
          <div className="flex-1">
            <div className="text-xl font-semibold text-default-900 whitespace-nowrap">
              Reports Snapshot
            </div>
            <span className="text-xs text-default-600">
              A summary of your reports
            </span>
          </div>
          <div className="flex-none">
            <DashboardSelect />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-1 md:p-5">
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 justify-start w-full bg-transparent h-full">
            {tabsTrigger.map((item, index) => (
              <TabsTrigger
                key={`report-trigger-${index}`}
                value={item.value}
                className={cn(
                  "flex flex-col gap-1.5 p-4 overflow-hidden   items-start  relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground before:hidden data-[state=active]:shadow-none data-[state=active]:before:block",
                  {
                    "bg-primary/30 data-[state=active]:bg-primary/30 dark:bg-primary/70":
                      item.color === "primary",
                    "bg-orange-50 data-[state=active]:bg-orange-50 dark:bg-orange-500":
                      item.color === "warning",
                    "bg-green-50 data-[state=active]:bg-green-50 dark:bg-green-500":
                      item.color === "success",
                    "bg-cyan-50 data-[state=active]:bg-cyan-50 dark:bg-cyan-500 ":
                      item.color === "info",
                  }
                )}
              >
                <span
                  className={cn(
                    "h-10 w-10 rounded-full bg-primary/40 absolute -top-3 -right-3 ring-8 ring-primary/30",
                    {
                      "bg-primary/50  ring-primary/20 dark:bg-primary dark:ring-primary/40":
                        item.color === "primary",
                      "bg-orange-200 ring-orange-100 dark:bg-orange-300 dark:ring-orange-400":
                        item.color === "warning",
                      "bg-green-200 ring-green-100 dark:bg-green-300 dark:ring-green-400":
                        item.color === "success",
                      "bg-cyan-200 ring-cyan-100 dark:bg-cyan-300 dark:ring-cyan-400":
                        item.color === "info",
                    }
                  )}
                ></span>
                <span className="text-sm text-default-800 dark:text-primary-foreground font-semibold capitalize relative z-10">
                  {" "}
                  {item.text}
                </span>
                <span
                  className={`text-lg font-semibold text-${item.color}/80 dark:text-primary-foreground`}
                >
                  {item.total}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {/* charts data */}
          {tabsContentData.map((item, index) => (
            <TabsContent key={`report-tab-${index}`} value={item.value}>
              <ReportsChart series={item.series} chartColor={item.color} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportsSnapshot;
