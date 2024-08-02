"use client"
import Card from "@/components/ui/card-snippet";
import VStepForm from "./vstep-form";
import { getAircrafts } from '@/action/api-action'
import { useQuery } from "@tanstack/react-query";
import LayoutLoader from "@/components/layout-loader";

const FormLayout = () => {
  const { isPending, isError, data:aircrafts, error } = useQuery({
    queryKey: ['aircrafts'],
    queryFn: async () => await getAircrafts(),
  });
  if (isPending) return <LayoutLoader />;
  if (isError) console.log(error);
  return (
    <div className="space-y-4">
      <Card title="Event Definition">
        <VStepForm  aircraftList = {aircrafts} />
      </Card>
    </div>
  );
};

export default FormLayout;
