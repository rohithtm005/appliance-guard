import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { AppliancesTable } from "@/components/appliances/AppliancesTable";
import { AppliancesFilters } from "@/components/appliances/AppliancesFilters";

// Mock data
const mockAppliances = [
  {
    id: "1",
    name: "LG Refrigerator 260L",
    category: "Refrigerator",
    brand: "LG",
    model: "GL-I292RPZL",
    purchaseDate: "2023-07-15",
    warrantyExpiry: "2025-07-15",
    status: "Active"
  },
  {
    id: "2", 
    name: "Samsung 55\" QLED TV",
    category: "TV",
    brand: "Samsung",
    model: "QA55Q60",
    purchaseDate: "2022-11-05",
    warrantyExpiry: "2024-01-15",
    status: "Expiring"
  },
  {
    id: "3",
    name: "iPhone 14 Pro",
    category: "Mobile",
    brand: "Apple",
    model: "A2890",
    purchaseDate: "2023-01-20",
    warrantyExpiry: "2024-01-20",
    status: "Expiring"
  }
];

export default function Appliances() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter appliances based on search and filters
  const filteredAppliances = mockAppliances.filter((appliance) => {
    const matchesSearch = appliance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appliance.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appliance.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || appliance.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || appliance.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Appliances</h1>
          <p className="text-muted-foreground">
            Manage all your home appliances and their warranties
          </p>
        </div>
        
        <Button 
          onClick={() => navigate('/appliances/new')}
          className="bg-primary hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Appliance
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appliances by name, brand, or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <AppliancesFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              All Appliances ({filteredAppliances.length})
            </CardTitle>
            
            <div className="flex gap-2">
              <Badge variant="outline">
                {mockAppliances.filter(a => a.status === "Active").length} Active
              </Badge>
              <Badge variant="outline" className="text-warning">
                {mockAppliances.filter(a => a.status === "Expiring").length} Expiring
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <AppliancesTable appliances={filteredAppliances} />
        </CardContent>
      </Card>
    </div>
  );
}