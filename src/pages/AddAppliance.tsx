import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ApplianceForm } from "@/components/appliances/ApplianceForm";

export default function AddAppliance() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/appliances')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold">Add New Appliance</h1>
          <p className="text-muted-foreground">
            Add a new appliance to track its warranty and maintenance
          </p>
        </div>
      </div>

      {/* Form */}
      <ApplianceForm />
    </div>
  );
}