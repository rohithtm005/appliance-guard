import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  description?: string;
  variant?: "default" | "success" | "warning" | "info";
}

const variantStyles = {
  default: "text-primary bg-primary/10 border-primary/20",
  success: "text-success bg-success/10 border-success/20", 
  warning: "text-warning bg-warning/10 border-warning/20",
  info: "text-primary bg-primary/10 border-primary/20"
};

export function KpiCard({ 
  title, 
  value, 
  icon, 
  description, 
  variant = "default" 
}: KpiCardProps) {
  return (
    <Card className="kpi-card hover-lift">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {value}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          
          <div className={cn(
            "rounded-lg p-2 border",
            variantStyles[variant]
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}