'use client'
import React, {useState, useEffect} from 'react'
import * as echarts from 'echarts'
import { getCsvFile } from "@/action/api-action";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function FlightChart({flight}) {
  const [data, setData] = useState([])
  const [parameters, setParameters] = useState([])
  const [selectedParameters, setSelectedParameters] = useState([])
  const [units, setUnits] = useState([])

  useEffect(() => {
    fetchCSVData(flight.file)
  }, [flight.file])

  const fetchCSVData = async (id) => {
    const csvString = await getCsvFile(id)
    const { data, units } = parseCSV(csvString)
    setData(data)
    setUnits(units)
    setParameters(Object.keys(data[0]).filter(key => key !== 'time' && key !== 'Sample' && key !== 'Phase'))
    setSelectedParameters([Object.keys(data[0])[1]])
  }

  const parseCSV = csvString => {
    const lines = csvString.split('\n').filter(line => line.trim() !== '')
    const headers = lines[0].split(',').map(header => header.trim())
    const units = lines[1].split(',').map(unit => unit.trim())
    const rows = lines.slice(2).map(line => {
      const values = line.split(',').map(value => value.trim())
      const obj = {}
      headers.forEach((header, index) => {
        obj[header] = values[index]
      })
      return obj
    })
    return { data: rows, units: units }
  }

  useEffect(() => {
    if (selectedParameters.length > 0 && data.length > 0) {
      const chartDom = document.getElementById('main')
      const myChart = echarts.init(chartDom, null, { renderer: 'svg' })

      const colorPalette = ['#4CAF50', '#3F51B5', '#FF9800', '#F44336', '#9C27B0']

      function generateLineColor(index) {
        return colorPalette[index % colorPalette.length]
      }

      const series = selectedParameters.map((param, index) => ({
        name: param,
        type: 'line',
        showSymbol: false,
        lineStyle: {
          width: 1
        },
        smooth: true,
        yAxisIndex: index,
        data: data.map(row => row[param]),
        color: generateLineColor(index),
        connectNulls: true
      }))

      const yAxis = selectedParameters.map((param, index) => ({
        type: 'value',
        name: units[index + 1],
        position: index % 2 === 0 ? 'left' : 'right',
        offset: index > 1 ? 50 * Math.floor(index / 2) : 0,
        axisLabel: {
          formatter: '{value}'
        },
        axisTick: {
          show: true
        },
        nameTextStyle: {
          padding: [0, 0, 0, 0],
          align: index % 2 === 0 ? 'right' : 'left'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: series[index].color // Use color from series
          }
        }
      }))

      const option = {
        title: {
          text: '',
          left: '1%'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '5%',
          bottom: '10%',
          right: '5%',
        },
        xAxis: {
          type: 'category',
          data: data.map(row => row.Sample)
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
              name: `Flight ${flight?.flightName}`
            },
            dataView: { readOnly: true }
          }
        },
        dataZoom: [
          {
            startValue: data.length > 0 ? data[0].Sample : 0
          },
          {
            type: 'inside'
          }
        ],
        series: series
      }

      myChart.setOption(option)

      // Clean up
      return () => myChart.dispose()
    }
  }, [selectedParameters, data])
  return (
    <div>
      <div>
      <Select
        options={parameters.map(param => ({ value: param, label: param }))}
        value={selectedParameters.map(param => ({ value: param, label: param }))}
        onChange={selectedOptions => setSelectedParameters(selectedOptions.map(option => option.value))}
        isMulti
        components={makeAnimated()}
      />
      </div>
      <div id='main' style={{ width: '650px', height: '500px' }}></div>
    </div>
  )
}
