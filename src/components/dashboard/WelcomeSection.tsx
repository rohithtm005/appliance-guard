import { Plus, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/dashboard-hero.jpg";

export function WelcomeSection() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 text-white">
      <div className="absolute inset-0 bg-black/20" />
      <img 
        src={heroImage} 
        alt="Home appliances overview" 
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
      />
      
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Application Tracker
        </h1>
        <p className="text-lg opacity-90 mb-6">
          Keep track of all your home appliances, warranties, and maintenance schedules in one place. 
          Never miss an important service date again.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => navigate('/appliances/new')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Appliance
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
            onClick={() => navigate('/maintenance')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
        </div>
      </div>
    </div>
  );
}