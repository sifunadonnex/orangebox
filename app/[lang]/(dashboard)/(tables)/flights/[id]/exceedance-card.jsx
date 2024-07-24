import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icon } from "@iconify/react";

function ExceedanceCard({exceedances}) {
  const takeOffExceedances = exceedances.filter(exceedance => exceedance.flightPhase === "TakeOff")
  const climbExceedances = exceedances.filter(exceedance => exceedance.flightPhase === "Climb")
  const cruiseExceedances = exceedances.filter(exceedance => exceedance.flightPhase === "Cruise")
  const descentExceedances = exceedances.filter(exceedance => exceedance.flightPhase === "Descent")
  const landingExceedances = exceedances.filter(exceedance => exceedance.flightPhase === "Landing")
  return (
    <Accordion type="single" collapsible className="w-full space-y-3.5">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center space-x-2">
            <div>
              <Icon icon="raphael:takeoff" className=" h-6 w-6" />
            </div>
            <div>TakeOff</div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {takeOffExceedances.map((exceedance, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div>
                <Icon icon="raphael:takeoff" className=" h-6 w-6" />
              </div>
              <div>
                {/* link to open the exceedance */}
                <a href={`/exceedances/${exceedance.id}/overview`}>{exceedance.description}</a>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex items-center space-x-2">
            <div>
              <Icon icon="entypo:aircraft-take-off" className=" h-4 w-4" />
            </div>
            <div>Climb</div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {climbExceedances.map((exceedance, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div>
                <Icon icon="entypo:aircraft-take-off" className=" h-4 w-4" />
              </div>
              <div>
                {/* link to open the exceedance */}
                <a href={`/exceedances/${exceedance.id}/overview`}>{exceedance.description}</a>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <div className="flex items-center space-x-2">
            <div>
              <Icon icon="ri:plane-line" className=" h-4 w-4" />
            </div>
            <div>Cruise</div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {cruiseExceedances.map((exceedance, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div>
                <Icon icon="ri:plane-line" className=" h-4 w-4" />
              </div>
              <div>
                {/* link to open the exceedance */}
                <a href={`/exceedances/${exceedance.id}/overview`}>{exceedance.description}</a>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          <div className="flex items-center space-x-2">
            <div>
              <Icon icon="entypo:aircraft-landing" className=" h-4 w-4" />
            </div>
            <div>Descent</div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {descentExceedances.map((exceedance, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div>
                <Icon icon="entypo:aircraft-landing" className=" h-4 w-4" />
              </div>
              <div>
                {/* link to open the exceedance */}
                <a href={`/exceedances/${exceedance.id}/overview`}>{exceedance.description}</a>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          <div className="flex items-center space-x-2">
            <div>
              <Icon icon="raphael:landing" className=" h-6 w-6" />
            </div>
            <div>Landing</div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {landingExceedances.map((exceedance, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div>
                <Icon icon="raphael:landing" className=" h-6 w-6" />
              </div>
              <div>
                {/* link to open the exceedance */}
                <a href={`/exceedances/${exceedance.id}/overview`}>{exceedance.description}</a>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ExceedanceCard