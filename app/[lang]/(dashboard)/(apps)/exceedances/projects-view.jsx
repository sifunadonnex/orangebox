"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Plus, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectGrid from "./project-grid";
import Blank from "@/components/blank";

const ProjectsView = ({ projects }) => {

  if (projects.length < 1) {
    return (
      <Blank className="max-w-[320px] mx-auto flex flex-col items-center justify-center h-full space-y-3">
        <div className=" text-default-900 text-xl font-semibold">
          No Events Here
        </div>
        <div className=" text-sm  text-default-600 ">
          There is no Exceedance detected from your flights. Please add a new Event Definition.
        </div>
        <div></div>
        <Button onClick={()=>window.location.href='/new-event'}>
          <Plus className="w-4 h-4 text-primary-foreground mr-2" />
          Add Definition
        </Button>
      </Blank>
    );
  }
  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-6">
          <div className="flex lg:flex-row flex-col flex-wrap gap-6">
            <div className="flex-1 flex gap-3">
              <Button onClick={()=>window.href='/new-event'} className="whitespace-nowrap">
                <Plus className="w-4 h-4  ltr:mr-2 rtl:ml-2 " />
                Add Definition
              </Button>
            </div>
            <div className=" flex-none  flex flex-wrap gap-3">
              <Input placeholder="search..." />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid  xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
          {projects?.map((project, i) => (
            <ProjectGrid
              project={project}
              key={`project-grid-${i}`}
            />
          ))}
        </div>
    </div>
  );
};

export default ProjectsView;
