import Card from "@/components/ui/card-snippet";
import VStepForm from "./vstep-form";

const FormLayout = () => {
  return (
    <div className="space-y-4">
      <Card title="Event Definition">
        <VStepForm />
      </Card>
    </div>
  );
};

export default FormLayout;
