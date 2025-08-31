import { AlertTriangle, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAlerts } from "@/contexts/AlertsContext";

export function RecentAlerts() {
  const { alerts } = useAlerts();
  const recentAlerts = alerts.slice(0, 5);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'WARRANTY_EXPIRING_SOON':
        return <Shield className="h-4 w-4 text-warning" />;
      case 'WARRANTY_EXPIRED':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'MAINTENANCE_UPCOMING':
        return <Clock className="h-4 w-4 text-primary" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'WARRANTY_EXPIRING_SOON':
        return 'outline' as const;
      case 'WARRANTY_EXPIRED':
        return 'destructive' as const;
      case 'MAINTENANCE_UPCOMING':
        return 'default' as const;
      default:
        return 'secondary' as const;
    }
  };

  return (
    <Card className="hover-lift">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Recent Alerts</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recentAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No recent alerts</p>
          </div>
        ) : (
          recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
              <div className="mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <Badge variant={getAlertVariant(alert.type)} className="text-xs">
                    {alert.type.replace(/_/g, ' ')}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {alert.message}
                </p>
                
                <p className="text-xs text-muted-foreground">
                  Due: {new Date(alert.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}