"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

const EventsFlightPhase = ({ height = 250, exceedances }) => {
  const { theme: config, setTheme: setConfig ,isRtl} = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);
  const series = exceedances?.reduce((acc, item) => {
    if (item.flightPhase === "Cruise") {
      acc[0] = acc[0] ? acc[0] + 1 : 1;
    } else if (item.flightPhase === "Takeoff") {
      acc[1] = acc[1] ? acc[1] + 1 : 1;
    } else if (item.flightPhase === "Landing") {
      acc[2] = acc[2] ? acc[2] + 1 : 1;
    } else if (item.flightPhase === "Decsent") {
      acc[3] = acc[3] ? acc[3] + 1 : 1;
    } else if (item.flightPhase === "Climb") {
      acc[4] = acc[4] ? acc[4] + 1 : 1;
    }
    return acc;
  }, []);
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ["Cruise", "Takeoff", "Landing", "Decsent", "Climb"],
    dataLabels: {
      enabled: false,
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
      "#FF9E69", "#FFD369", "#FF6969", "#69FFC7"
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    stroke: {
      width: 0
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "24px",
              fontWeight: 500,
              color: `hsl(${theme?.cssVars[
                mode === "dark" || mode === "system" ? "dark" : "light"
              ].chartLabel
                })`,
            },
            value: {
              show: true,
              label: "Total",
              fontSize: "18px",
              fontWeight: 600,
              color: `hsl(${theme?.cssVars[
                mode === "dark" || mode === "system" ? "dark" : "light"
              ].chartLabel
                })`,
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "16px",
              fontWeight: 600,
              color: `hsl(${theme?.cssVars[
                mode === "dark" || mode === "system" ? "dark" : "light"
              ].chartLabel
                })`

            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: `hsl(${theme?.cssVars[
          mode === "dark" || mode === "system" ? "dark" : "light"
        ].chartLabel
          })`,
      },
      
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5
      },
    },

    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      height={height}
      width={"100%"}
    />
  );
};

export default EventsFlightPhase;
