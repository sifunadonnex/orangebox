import Card from "@/components/ui/card-snippet";
import MultipleTypes from "./multiple-types";
import { getUsers } from '@/action/api-action'

const ValidationUseForm = async () => {
  const users = await getUsers();
  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 gap-6">
      <div className="col-span-2">
        <Card title="New Aircraft">
          <MultipleTypes userList={users} />
        </Card>
      </div>
    </div>
  );
};

export default ValidationUseForm;