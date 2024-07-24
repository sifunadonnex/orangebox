import Card from "@/components/ui/card-snippet";
import VFormWithIcon from "./vform-with-icon";
const FormLayout = () => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-6">
        <Card title="User Registration">
          <VFormWithIcon />
        </Card>
      </div>
    </div>
  );
};

export default FormLayout;
