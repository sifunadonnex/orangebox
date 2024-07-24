import Card from "@/components/ui/card-snippet";
import VFormWithIcon from "./vform-with-icon";
import { getAircrafts } from '@/action/api-action'
const FormLayout = async() => {
  const aircrafts = await getAircrafts();
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-6">
        <Card title="Flight Registration">
          <VFormWithIcon aircraftList = {aircrafts} />
        </Card>
      </div>
    </div>
  );
};

export default FormLayout;
