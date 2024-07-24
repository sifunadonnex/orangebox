'use client'
import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from '@/components/ui/button'
import { Icon } from "@iconify/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import toast from "react-hot-toast";
import { deleteFlight } from '@/action/api-action'

const Aircraft = ({data}) => {
  const [isChartVisible, setIsChartVisible] = useState(false)
  const [aircraftId, setAircraftId] = useState(null)
  const [ID, setID] = useState(null)
  const [flightName, setFlightName] = useState(null)
  const [flightfile, setFlightFile] = useState('defaultFlight')
  const [flightId, setFlightId] = useState(null)
  const [open, setOpen] = React.useState(false)
  const [expandedRows, setExpandedRows] = useState(null)
  const home = { icon: 'pi pi-home', url: '/' }
  const items = [
    { label: 'Aircrafts with Flights' },  ]
    const itemz = [
      { label: 'Flight' },

      {
        label: 'InputText',
        template: () => <a className='text-primary font-semibold'>{flightName}</a>
      }
    ]
    const handleClickOpenChart = () => {
      setOpen(true)
    }
  
    const handleCloseChart = () => {
      setOpen(false)
    }
    const handleDeleteFlight = async (id) => {
      try {
        const response = await deleteFlight(id)
        if (response) {
          toast.success('Flight deleted successfully')
        }
      } catch (error) {
        toast.error('Failed to delete flight')
      }
    }

  const rowExpansionTemplate = data => {
    return (
      <div className='p-3'>
        <h5 className='text-primary font-bold mb-3'>Flights For {data.serialNumber}</h5>
        <DataTable stripedRows value={data.csv}>
          <Column field='pilot' header='Pilot'></Column>
          <Column field='name' header='Name' ></Column>
          <Column field='departure' header='Departure' ></Column>
          <Column field='destination' header='Destination' ></Column>
          <Column field='flightHours' header='Flight Hours' ></Column>
          <Column field='createdAt' header='Date' body={createdDateTemplate} sortable></Column>
          <Column
            headerStyle={{ width: '5rem', textAlign: 'center' }}
            bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
            body={actionBodyTemplate}
          />
        </DataTable>
      </div>
    )
  }
  const actionBodyTemplate = rowData => {
    return (
      <div className='flex justify-center space-x-2'>
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" className="group"
              onClick={() => {
                window.location.href = `/flights/${rowData.id}`
              }}
            >
              <Icon icon="mdi:chart-line" className=" h-6 w-6 " />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Chart</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* delete flight */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" className="group"
              onClick={() => handleDeleteFlight(rowData.id)}
            >
              <Icon icon="mdi:delete" className=" h-6 w-6 " />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Flight</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      </div>
    )
  }
  const createdDateTemplate = rowData => {
    return new Date(rowData.createdAt).toLocaleDateString()
  }

  const allowExpansion = rowData => {
    return rowData.csv.length > 0
  }
  return (
    <div className='card'>
      {!isChartVisible && (
        <DataTable
          value={data.data}
          expandedRows={expandedRows}
          onRowToggle={e => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey='id'
        >
          <Column expander={allowExpansion} style={{ width: '5rem' }} />
          <Column field='serialNumber' header='Tail Number'  />
          <Column field='aircraftMake' header='Make'  />
          <Column field='airline' header='Airline'  />
          <Column field='createdAt' header='Date' body={createdDateTemplate} sortable />
        </DataTable>
      )}
      {isChartVisible && (
        <div>
          <Button
            label='Back to Aircrafts'
            className='rounded-md'
            severity='secondary'
            onClick={() => {
              setIsChartVisible(false)
              setAircraftId(null)
              setID(null)
              setFlightName(null)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Aircraft
