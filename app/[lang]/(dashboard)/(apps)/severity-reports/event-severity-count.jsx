"use client";
import React from "react";
import {
  VisAxis,
  VisBulletLegend,
  VisStackedBar,
  VisTooltip,
  VisXYContainer,
} from "@unovis/react";
import { Direction, FitMode, Orientation, StackedBar } from "@unovis/ts";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

const labels = {
  level1: "Level 1",
  level2: "Level 2",
  level3: "Level 3",
};
const chartLabels = Object.entries(labels).map(function ([k, v], i) {
  return {
    key: k,
    legend: v,
    tooltip: function (d) {
      return [
        v,
        `<span style="color: var(--vis-color${i}); font-weight: 800">${d[k]}</span>`,
      ].join(": ");
    },
  };
});

function tooltipTemplate(d) {
  const title = `<div style="color: #666; text-align: center">${d.description}</div>`;
  const total = `Total: <b>${d.total}</b> Exceedances</br>`;
  const stats = chartLabels
    .map(function (l) {
      return l.tooltip(d);
    })
    .join(" | ");
  return `<div style="font-size: 12px">${title}${total}${stats}</div>`;
}

const EventSeverityCount = ({exceedances}) => {
  const [educationsData, setEducationsData] = React.useState([]);
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);
  const isSmallScreen = window?.innerWidth < 768;
console.log(educationsData)
  // Function to transform the data
  async function transformData() {
    const data = exceedances;
  
    // Group data by description
    const groupedData = data?.reduce((acc, item) => {
        if (!acc[item.description]) {
            acc[item.description] = { description: item.description, level1: 0, level2: 0, level3: 0 };
        }
        if (item.exceedanceLevel === 'Level 1') {
            acc[item.description].level1 += 1;
        } else if (item.exceedanceLevel === 'Level 2') {
            acc[item.description].level2 += 1;
        } else if (item.exceedanceLevel === 'Level 3') {
            acc[item.description].level3 += 1;
        }
        return acc;
    }, {});
  
    // Convert grouped data to an array and apply transformations
    if (groupedData){
      const educationsData = Object?.values(groupedData).map(d => {
        const round = (n) => Math.floor(n * 100) / 100;
        return {
            ...d,
            level1: round(d.level1),
            level2: round(d.level2),
            level3: round(d.level3),
            total: round(d.level1 + d.level2 + d.level3),
        };
    });
    return educationsData;
    } else {
      return [];
    }
   
  }

  React.useEffect(() => {
    transformData().then(setEducationsData);
  }
  , [exceedances]);


  return (
    <>
      <VisBulletLegend items={chartLabels.map((d) => ({ name: d.legend }))} />
      <VisXYContainer
        height={isSmallScreen ? 300 : 400}
        yDirection={Direction.South}
      >
        <VisStackedBar
          data={educationsData}
          x={(d, i) => i}
          y={chartLabels.map((label) => (d) => d[label.key])}
          orientation={Orientation.Horizontal}
        />
        <VisTooltip
          triggers={{
            [StackedBar.selectors.bar]: tooltipTemplate,
          }}
        />
        <VisAxis
          type="x"
          label="Event Count"
          tickTextColor={`hsl(${
            theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
          })`}
          labelColor={`hsl(${
            theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
          })`}
        />
        <VisAxis
          tickTextWidth={isSmallScreen ? 75 : null}
          tickTextFitMode={FitMode.Wrap}
          type="y"
          tickFormat={(_, i) => educationsData[i]?.description}
          label={isSmallScreen ? null : "Events"}
          numTicks={educationsData?.length}
          tickValues={educationsData?.map((_, i) => i)}
          tickTextColor={`hsl(${
            theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
          })`}
          labelColor={`hsl(${
            theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
          })`}
        />
      </VisXYContainer>
    </>
  );
};

export default EventSeverityCount;

