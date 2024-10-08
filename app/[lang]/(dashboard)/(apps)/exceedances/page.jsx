'use client'
import ProjectsView from "./projects-view";
import {getExceedances} from '@/action/api-action';
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
import { useUser } from "@/store";
export default function ProjectPage({ params }) {  
  let userExceedances;
  const { user } = useUser()
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['exceedances'],
    queryFn: async () => await getExceedances(),
  });
  if (isPending) return <LayoutLoader />;
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const projects = data;
  if(user?.role !== "admin" && data && user?.aircraftIdList){
    userExceedances = data?.filter((item)=>user?.aircraftIdList.includes(item.aircraftId))
  }

  return (
    <div>
      {user?.role === "admin" ? (
        <ProjectsView projects={projects} />
      ) : (
        <ProjectsView projects={userExceedances} />
      ) }
    </div>
  );
}
