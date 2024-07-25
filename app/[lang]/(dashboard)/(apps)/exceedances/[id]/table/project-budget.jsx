"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProjectBudget = ({ exceedance }) => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center mb-0 border-none pt-8 pl-6">
        <CardTitle>Event Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row justify-between">
              <span className="text-sm text-gray-500">Event Parameter</span>
              <span className="text-sm text-gray-900">
                {exceedance?.eventlog.eventParameter}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="text-sm text-gray-500">SOP</span>
              <span className="text-sm text-gray-900">
                {" "}
                {exceedance?.eventlog?.sop}{" "}
              </span>
            </div>
            {exceedance?.eventlog?.high && (
              <>
                <div className="flex flex-row justify-between">
                  <span className="text-sm text-gray-500">Level 1</span>
                  <span className="text-sm text-gray-900">
                    {" "}
                    {exceedance.eventlog.high}{" "}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm text-gray-500">Level 2</span>
                  <span className="text-sm text-gray-900">
                    {" "}
                    {exceedance.eventlog.high1}{" "}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm text-gray-500">Level 3</span>
                  <span className="text-sm text-gray-900">
                    {" "}
                    {exceedance.eventlog.high2}{" "}
                  </span>
                </div>
              </>
            )}
            {exceedance?.eventlog?.low && (
              <>
                <div className="flex flex-row justify-between">
                  <span className="text-sm text-gray-500">Level 1</span>
                  <span className="text-sm text-gray-900">
                    {" "}
                    {exceedance.eventlog.low}{" "}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm text-gray-500">Level 2</span>
                  <span className="text-sm text-gray-900">
                    {" "}
                    {exceedance.eventlog.low1}{" "}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm text-gray-500">Level 3</span>
                  <span className="text-sm text-gray-900">
                    {" "}
                    {exceedance.eventlog.low2}{" "}
                  </span>
                </div>
              </>
            )}

            <div className="flex flex-row justify-between">
              <span className="text-sm text-primary">Event Trigger</span>
              <span className="text-sm text-primary font-bold">
                {exceedance?.eventlog?.eventTrigger}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectBudget;
