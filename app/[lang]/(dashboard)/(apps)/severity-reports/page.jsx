'use client'
import {getFlights} from '@/action/api-action';
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
import { useUser } from "@/store";
import SeverityReport from "./SeverityReport"
export default function ProjectPage({ params }) {  
  let userFlights;
  const { user } = useUser()
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['flights'],
    queryFn: async () => await getFlights(),
  });
  if (isPending) return <LayoutLoader />;
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const projects = data;
  if(user?.role !== "admin" && data && user?.aircraftIdList){
    userFlights = data?.filter((item)=>user?.aircraftIdList.includes(item.aircraftId))
  }

  return (
    <div>
      {user?.role === "admin" ? (
        <SeverityReport flights={projects} />
      ) : (
        <SeverityReport flights={userFlights} />
      ) }
    </div>
  );
}
