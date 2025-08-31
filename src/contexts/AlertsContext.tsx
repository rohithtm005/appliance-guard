import { createContext, useContext, useState, ReactNode } from "react";

interface Alert {
  id: string;
  type: 'WARRANTY_EXPIRING_SOON' | 'WARRANTY_EXPIRED' | 'MAINTENANCE_UPCOMING';
  title: string;
  message: string;
  dueDate: string;
  read: boolean;
  createdAt: string;
}

interface AlertsContextType {
  alerts: Alert[];
  unreadCount: number;
  markAsRead: (alertId: string) => void;
  markAllAsRead: () => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

// Mock data for demo
const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "WARRANTY_EXPIRING_SOON",
    title: "Warranty Expiring Soon",
    message: "LG Refrigerator warranty expires in 15 days",
    dueDate: "2024-01-15",
    read: false,
    createdAt: "2024-01-01T10:00:00Z"
  },
  {
    id: "2", 
    type: "MAINTENANCE_UPCOMING",
    title: "Maintenance Due",
    message: "Samsung TV panel cleaning scheduled for next week",
    dueDate: "2024-01-10",
    read: false,
    createdAt: "2024-01-01T11:00:00Z"
  }
];

export function AlertsProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  
  const unreadCount = alerts.filter(alert => !alert.read).length;

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
  };

  return (
    <AlertsContext.Provider value={{
      alerts,
      unreadCount,
      markAsRead,
      markAllAsRead
    }}>
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
}