import { TrendingUp, Shield, AlertTriangle, Wrench } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { UpcomingMaintenance } from "@/components/dashboard/UpcomingMaintenance";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { useAppliances } from "@/contexts/AppliancesContext";
import { useAlerts } from "@/contexts/AlertsContext";

export default function Dashboard() {
  const { appliances } = useAppliances();
  const { alerts } = useAlerts();
  
  // Calculate real-time KPI data
  const kpiData = {
    totalAppliances: appliances.length,
    underWarranty: appliances.filter(a => a.status === 'Active').length,
    expiringSoon: appliances.filter(a => a.status === 'Expiring').length,
    upcomingMaintenance: 0 // Will be calculated when maintenance feature is added
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <WelcomeSection />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard
          title="Total Appliances"
          value={kpiData.totalAppliances}
          icon={<TrendingUp className="h-5 w-5" />}
          description="All registered devices"
          variant="default"
        />
        
        <KpiCard
          title="Under Warranty"
          value={kpiData.underWarranty}
          icon={<Shield className="h-5 w-5" />}
          description="Active warranty coverage"
          variant="success"
        />
        
        <KpiCard
          title="Expiring Soon"
          value={kpiData.expiringSoon}
          icon={<AlertTriangle className="h-5 w-5" />}
          description="Next 30 days"
          variant="warning"
        />
        
        <KpiCard
          title="Maintenance Due"
          value={kpiData.upcomingMaintenance}
          icon={<Wrench className="h-5 w-5" />}
          description="Scheduled services"
          variant="info"
        />
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAlerts />
        <UpcomingMaintenance />
      </div>
    </div>
  );
}