import { Calendar, Plus, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - would come from API
const upcomingMaintenance = [
  {
    id: "1",
    applianceName: "Samsung 55\" QLED TV",
    description: "Panel cleaning & inspection",
    scheduledDate: "2024-01-10",
    provider: "Samsung Care",
    status: "UPCOMING"
  },
  {
    id: "2",
    applianceName: "LG Refrigerator 260L",
    description: "Compressor check",
    scheduledDate: "2024-01-15",
    provider: "LG Service",
    status: "UPCOMING"
  },
  {
    id: "3",
    applianceName: "Whirlpool Washing Machine",
    description: "Filter cleaning",
    scheduledDate: "2024-01-20",
    provider: "Local Service",
    status: "UPCOMING"
  }
];

export function UpcomingMaintenance() {
  return (
    <Card className="hover-lift">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Upcoming Maintenance</CardTitle>
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Schedule
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {upcomingMaintenance.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No upcoming maintenance</p>
          </div>
        ) : (
          upcomingMaintenance.map((maintenance) => (
            <div key={maintenance.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
              <div className="mt-1">
                <Wrench className="h-4 w-4 text-primary" />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{maintenance.applianceName}</p>
                  <Badge variant="outline" className="text-xs">
                    {new Date(maintenance.scheduledDate).toLocaleDateString()}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {maintenance.description}
                </p>
                
                <p className="text-xs text-muted-foreground">
                  Provider: {maintenance.provider}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}