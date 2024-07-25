'use client'
import React from "react";
import { Card, CardFooter } from "@/components/ui/card";

import ProjectHeader from "./project-header";
import PageLink from "./page-link";
import {getExceedanceById} from '@/action/api-action';
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";

const singleProjectLayout = async ({ children, params }) => {
  const { id } = params;
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['exceedance'],
    queryFn: async () => await getExceedanceById(id),
  });
  if (isPending) return <LayoutLoader />;
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const project = data;

  return (
    <div>
      <Card className="mb-6">
        <ProjectHeader project={project} />
        <CardFooter className="gap-x-4 gap-y-3  lg:gap-x-6 pb-0 pt-6 flex-wrap">
          <PageLink id={id} />
        </CardFooter>
      </Card>
      {children}
    </div>
  );
};

export default singleProjectLayout;
