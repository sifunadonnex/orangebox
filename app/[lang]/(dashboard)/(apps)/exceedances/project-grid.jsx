"use client";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { deleteExceedance } from "@/action/api-action";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";

const phaseColorMap = {
  climb: "warning",
  cruise: "success",
  descent: "default",
  takeoff: "info",
  landing : "danger"
};
import { useTheme } from "next-themes";
const ProjectGrid = ({ project, onEdit }) => {
  const [open, setOpen] = React.useState(false);
  async function onAction(id) {
    await deleteExceedance(id);
  }
  const { theme: mode } = useTheme();

  return (
    <>
      <DeleteConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onAction(project?.id)}
      />
      <Card>
        <CardHeader className="flex-row items-center gap-3 border-none mb-0">
          <div className="flex-1">
            <Badge
              color={
                project?.eventStatus === "Under Review"
                  ? "warning"
                  : project?.eventStatus === "completed"
                  ? "success"
                  : project?.eventStatus === "in progress"
                  ? "default"
                  : "info"
              }
              variant={mode === "dark" ? "soft" : "soft"}
              className=" capitalize"
            >
              {project?.eventStatus}
            </Badge>
          </div>
          <div className="flex-none cursor-pointer">
            {project?.isFavorite ? (
              <Icon
                icon="heroicons:star-solid"
                className="text-yellow-400 w-[18px] h-[18px]"
              />
            ) : (
              <Icon
                icon="heroicons:star"
                className="text-default-400 w-[18px] h-[18px]"
              />
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="flex-none h-6 w-6 bg-default-200 rounded-full hover:bg-default-300"
              >
                <MoreHorizontal className="h-4 w-4 text-default-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[196px]" align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href={{
                    pathname: `exceedances/${project?.id}/overview`,
                  }}
                  className="w-full"
                  target="_blank"
                >
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => setOpen(true)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => onEdit(project)}
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-4 pt-0 pb-5">
          {/* logo, title,desc */}
          <Link
            href={{
              pathname: `exceedances/${project?.id}/overview`,
            }}
          >
            <div className="flex gap-2">
              <div>
                <Avatar className="rounded h-12 w-12">
                  <AvatarImage src={project?.logo?.src} alt="" />
                  <AvatarFallback className="rounded uppercase bg-success/30 text-success">
                    ED
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="text-base font-semibold text-default-900 capitalize mb-1">
                  {project?.description}
                </div>
                {project?.eventlog && (
                  <div className="text-xs font-medium text-default-600 max-h-[34px]  overflow-hidden">
                    {project?.eventlog.eventDescription}
                  </div>
                )}
              </div>
            </div>
          </Link>
          {/* team, priority */}
          <div className="flex  mt-6 gap-10">
            <div className="flex-1">
              <div className="text-sm font-medium text-default-900 mb-3">
                Flight:
              </div>
              <span className="text-sm font-medium text-default-600">
                {project?.csv.name}
              </span>
            </div>

            <div className="flex flex-col items-end">
              <div className="text-sm font-medium text-default-900 mb-3 text-right ">
                Phase:
              </div>
              {project.flightPhase && (
                <Badge
                  color={phaseColorMap[project.flightPhase]}
                  variant={mode === "dark" ? "solid" : "solid"}
                  className=" capitalize"
                >
                  {project?.flightPhase}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t  p-4">
          <div>
            <div className="text-xs  text-default-600 mb-[2px]">
              Exceedance Date:
            </div>
            <span className="text-xs font-medium text-default-900">
              {new Date(project?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProjectGrid;
