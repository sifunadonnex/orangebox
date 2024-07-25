"use client";
import WorksNote from "./works-note";
import {getExceedanceById} from '@/action/api-action';
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";

const Overview = ({params}) => {
  const { id } = params;
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['exceedance'],
    queryFn: async () => await getExceedanceById(id),
  });
  if (isPending) return <LayoutLoader />;
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-4">
          <WorksNote exceedance={data} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
