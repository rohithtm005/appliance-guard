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

// No mock data - alerts will be generated based on appliances

export function AlertsProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  
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