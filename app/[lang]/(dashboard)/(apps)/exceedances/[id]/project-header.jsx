"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import projectImage from "@/public/images/auth/mountain.png";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const ProjectHeader = ({ project }) => {
  const { user } = useUser()
  const data = [
    {
      text: "flight date",
      date: new Date(project?.createdAt).toLocaleDateString(),
    },
    {
      text: "updated Date",
      date: new Date(project?.updatedAt).toLocaleDateString(),
    },
    {
      text: "Event Parameter",
      date: project?.eventlog?.eventParameter,
    },
    {
      text: "Event Type",
      date: project?.eventlog?.eventType,
    },
  ];
  return (
    <>
      <CardHeader className="flex-row items-center">
        <CardTitle className="flex-1"> Exceedance Details </CardTitle>
        <div className="flex-none flex items-center gap-3">
          {/* elipsis */}
          {user?.role === 'admin' || user?.role === 'gatekeeper' && <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" color="secondary">
                <Icon
                  icon="heroicons:ellipsis-horizontal-20-solid"
                  className="w-5 h-5 text-default-500"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[196px]" align="end">
              <DropdownMenuItem>Update Status</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
        </div>
      </CardHeader>
      <CardContent className="border-b border-default-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-none">
            <div className="h-[148px] w-[148px] rounded">
              <Image
                src={projectImage}
                alt="orangebox"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="text-xl font-medium text-default-950 truncate">
                {" "}
                {project?.description}{" "}
              </div>
              <div className="space-x-3 rtl:space-x-reverse ">
                <Badge color={
                project?.eventStatus === "Under Review"
                  ? "warning"
                  : project?.eventStatus === "Valid"
                  ? "success"
                  : project?.eventStatus === "Nuisance"
                  ? "default"
                  : project?.eventStatus === "False"
                  ? "danger"
                  : "default"
              } variant="soft">
                  {" "}
                  {project.eventStatus}{" "}
                </Badge>
                <Badge color="info" variant="soft">
                  {" "}
                  {project.flightPhase}{" "}
                </Badge>
              </div>
            </div>
            <div className="text-sm text-default-600 w-full  mt-1">
              {" "}
              {project.eventlog.eventDescription}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 lg:gap-6">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]"
                >
                  <div className="text-sm font-medium text-default-500 capitalize">
                    {item.text}
                  </div>
                  <div className="text-sm font-medium text-default-900">
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default ProjectHeader;
