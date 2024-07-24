'use client'
import ProjectsView from "./projects-view";
import {getExceedances} from '@/action/api-action';
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
export default function ProjectPage({ params }) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['exceedances'],
    queryFn: async () => await getExceedances(),
  });
  if (isPending) return <LayoutLoader />;
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const projects = data;

  return (
    <div>
      <ProjectsView projects={projects} />
    </div>
  );
}
