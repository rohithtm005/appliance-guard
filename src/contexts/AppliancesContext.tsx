import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

export interface Appliance {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  serialNumber?: string;
  purchaseDate: string;
  warrantyDurationMonths: number;
  warrantyExpiry: string;
  supplierName?: string;
  supplierPhone?: string;
  supplierEmail?: string;
  purchasePrice?: number;
  receiptFileUrl?: string;
  notes?: string;
  status: 'Active' | 'Expiring' | 'Expired';
  createdAt: string;
}

interface AppliancesContextType {
  appliances: Appliance[];
  addAppliance: (appliance: Omit<Appliance, 'id' | 'createdAt' | 'status' | 'warrantyExpiry'>) => void;
  deleteAppliance: (id: string) => void;
  updateAppliance: (id: string, updates: Partial<Appliance>) => void;
  getApplianceById: (id: string) => Appliance | undefined;
}

const AppliancesContext = createContext<AppliancesContextType | undefined>(undefined);

function calculateWarrantyExpiry(purchaseDate: string, durationMonths: number): string {
  const date = new Date(purchaseDate);
  date.setMonth(date.getMonth() + durationMonths);
  return date.toISOString().split('T')[0];
}

function calculateStatus(warrantyExpiry: string): 'Active' | 'Expiring' | 'Expired' {
  const today = new Date();
  const expiry = new Date(warrantyExpiry);
  const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry < 0) return 'Expired';
  if (daysUntilExpiry <= 30) return 'Expiring';
  return 'Active';
}

export function AppliancesProvider({ children }: { children: ReactNode }) {
  const [appliances, setAppliances] = useState<Appliance[]>([]);

  const addAppliance = (applianceData: Omit<Appliance, 'id' | 'createdAt' | 'status' | 'warrantyExpiry'>) => {
    const warrantyExpiry = calculateWarrantyExpiry(applianceData.purchaseDate, applianceData.warrantyDurationMonths);
    const status = calculateStatus(warrantyExpiry);
    
    const newAppliance: Appliance = {
      ...applianceData,
      id: crypto.randomUUID(),
      warrantyExpiry,
      status,
      createdAt: new Date().toISOString(),
    };

    setAppliances(prev => [...prev, newAppliance]);
    
    toast({
      title: "Appliance Added",
      description: `${newAppliance.name} has been successfully added.`,
    });
  };

  const deleteAppliance = (id: string) => {
    const appliance = appliances.find(a => a.id === id);
    if (!appliance) return;

    setAppliances(prev => prev.filter(a => a.id !== id));
    
    toast({
      title: "Appliance Deleted",
      description: `${appliance.name} has been removed from your list.`,
    });
  };

  const updateAppliance = (id: string, updates: Partial<Appliance>) => {
    setAppliances(prev => prev.map(appliance => {
      if (appliance.id !== id) return appliance;
      
      const updated = { ...appliance, ...updates };
      
      // Recalculate warranty expiry if purchase date or duration changed
      if (updates.purchaseDate || updates.warrantyDurationMonths) {
        updated.warrantyExpiry = calculateWarrantyExpiry(updated.purchaseDate, updated.warrantyDurationMonths);
        updated.status = calculateStatus(updated.warrantyExpiry);
      }
      
      return updated;
    }));
    
    toast({
      title: "Appliance Updated",
      description: "Changes have been saved successfully.",
    });
  };

  const getApplianceById = (id: string) => {
    return appliances.find(a => a.id === id);
  };

  return (
    <AppliancesContext.Provider value={{
      appliances,
      addAppliance,
      deleteAppliance,
      updateAppliance,
      getApplianceById
    }}>
      {children}
    </AppliancesContext.Provider>
  );
}

export function useAppliances() {
  const context = useContext(AppliancesContext);
  if (context === undefined) {
    throw new Error('useAppliances must be used within an AppliancesProvider');
  }
  return context;
}