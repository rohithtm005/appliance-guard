import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AppliancesFiltersProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "TV", label: "TV" },
  { value: "Refrigerator", label: "Refrigerator" },
  { value: "AC", label: "Air Conditioner" },
  { value: "WashingMachine", label: "Washing Machine" },
  { value: "Kitchen", label: "Kitchen Appliance" },
  { value: "Computer", label: "Computer" },
  { value: "Mobile", label: "Mobile Device" },
  { value: "Other", label: "Other" },
];

const statuses = [
  { value: "all", label: "All Status" },
  { value: "Active", label: "Active Warranty" },
  { value: "Expiring", label: "Expiring Soon" },
  { value: "Expired", label: "Expired" },
];

export function AppliancesFilters({
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
}: AppliancesFiltersProps) {
  const clearFilters = () => {
    onCategoryChange("all");
    onStatusChange("all");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedStatus !== "all";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Category Filter */}
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full sm:w-auto"
        >
          <Filter className="h-4 w-4 mr-2" />
          Clear
        </Button>
      )}
    </div>
  );
}