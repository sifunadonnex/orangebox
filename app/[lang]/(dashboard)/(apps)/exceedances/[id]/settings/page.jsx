'use client'
import Card from "@/components/ui/card-snippet";
import MultipleTypes from "./multiple-types";
import {getExceedanceById} from '@/action/api-action';
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";
import { useUser } from "@/store";

const ValidationUseForm =  ({params}) => {
  const { user } = useUser()
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
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 gap-6">
      <div className="col-span-2">
        <Card title="Exceedance Settings">
          <MultipleTypes exceedance = {data} id = {id} role = {user?.role}/>
        </Card>
      </div>
    </div>
  );
};

export default ValidationUseForm;