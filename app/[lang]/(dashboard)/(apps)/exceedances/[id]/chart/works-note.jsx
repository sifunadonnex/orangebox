"use client";
import React, { useState, useEffect } from "react";
import { getCsvFile } from "@/action/api-action";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import * as echarts from 'echarts'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const WorksNote = ({ exceedance }) => { 
  const [csvTable, setCsvTable] = useState([])
  const [selectedParameters, setSelectedParameters] = useState([]);

  const getCSV = async () => {
    const csvString = await getCsvFile(exceedance.file);
    parseCSV(csvString);
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",");
    const parsedData = [];
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");
      if (currentLine.length === headers.length) {
        const row = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j].trim()] = currentLine[j].trim();
        }
        parsedData.push(row);
      }
    }
    if (exceedance) {
      const data = JSON.parse(exceedance?.exceedanceValues);
      const start = data[0].time;
      const end = data[data.length - 1].time;
      // set the last parameter as the event parameter
      setSelectedParameters(Object.keys(parsedData[0]).slice(-1));
      setCsvTable(parsedData.slice(start, end));
    }
  };

  useEffect(() => {
    getCSV();
  }, [exceedance.file]);
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom, null, { renderer: 'svg' });

    const data = csvTable;
    const colorPalette = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'];

    const yAxis = selectedParameters.length > 0   ? selectedParameters.map((param, index) => ({
      type: 'value',
      position: index % 2 === 0 ? 'left' : 'right',
      offset: index > 1 ? 50 * Math.floor(index / 2) : 0,
      axisLine: {
        lineStyle: {
          color: colorPalette[index % colorPalette.length]
        }
      },
    })) : {
      type: 'value'
    }

    const series = [
      {
        name: exceedance?.eventlog.eventParameter,
        type: 'line',
        lineStyle:{
          width: 1,
        },
        showSymbol: false,
        smooth: true,
        data: data?.map(item => item[exceedance?.eventlog.eventParameter]),
      },
      ...selectedParameters.map((param, index) => ({
        name: param,
        type: 'line',
        lineStyle: {
          width: 1,
          color: colorPalette[index % colorPalette.length],
        },
        itemStyle: {
          color: colorPalette[index % colorPalette.length],
        },
        showSymbol: false,
        smooth: true,
        yAxisIndex: index,
        data: data?.map(item => item[param])
      }))
    ]

    const option = {
      title: {
        text: exceedance?.eventlog.displayName,
        left: '1%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        data: data?.map(item => item.Sample)
      },
      yAxis: yAxis,
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {
            name: exceedance?.eventlog.displayName,
          }
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      visualMap: {
        top: 50,
        right: 0,
        dimension: 1,
        seriesIndex: 0,
        pieces: (exceedance?.eventlog.high) ? [
          { gt: parseInt(exceedance?.eventlog.high2), color: 'red', label: 'Level 3' }, // greater than
          { gt: parseInt(exceedance?.eventlog.high1), lte: parseInt(exceedance?.eventlog.high2), color: '#eb602f', label: 'Level 2' }, // between
          { gt: parseInt(exceedance?.eventlog.high), lte: parseInt(exceedance?.eventlog.high1), color: 'purple', label: 'Level 1' }, // between
          { lte: parseInt(exceedance?.eventlog.high), color: 'green', label: 'Normal' }, // greater than
        ] : [
          // less than
          { lte: parseInt(exceedance?.eventlog.low2), color: 'red', label: 'Level 3' },
          { gt: parseInt(exceedance?.eventlog.low2), lte: parseInt(exceedance?.eventlog.low1), color: '#eb602f', label: 'Level 2' }, // between
          { gt: parseInt(exceedance?.eventlog.low1), lte: parseInt(exceedance?.eventlog.low), color: 'purple', label: 'Level 1' }, // between
          // greater than
          { gt: parseInt(exceedance?.eventlog.low), color: 'green', label: 'Normal' },
        ],
        outOfRange: {
          color: '#999'
        }
      },
      series: series
    };

    myChart.setOption(option);

    // Clean up
    return () => myChart.dispose();
  }, [selectedParameters, exceedance]);

  return (
    <Card>
      <CardHeader className="flex-row border-none pt-6">
        <div className="flex-1">
          <div className="text-xl font-medium tex-default-900">Exceedance Chart</div>
        </div>
      </CardHeader>
      <CardContent>
      <div>
      <div>
      {csvTable.length > 0 && (
        <Select
        options={Object.keys(csvTable[0]).filter(key => key !== 'Sample' && key != 'Phase' && key != exceedance.eventlog?.eventParameter).map(param => ({ value: param, label: param }))}
        value={selectedParameters.map(param => ({ value: param, label: param }))}
        onChange={selectedOptions => setSelectedParameters(selectedOptions.map(option => option.value))}
        isMulti
        components={makeAnimated()}
      />
      )}
      </div>
      <div id='main' style={{ maxWidth: '800px', height: '500px' }}></div>
    </div>
      </CardContent>
    </Card>
  );
};

export default WorksNote;