import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppliances } from "@/contexts/AppliancesContext";

const categories = [
  "TV", "Refrigerator", "AC", "WashingMachine", 
  "Kitchen", "Computer", "Mobile", "Other"
];

interface ApplianceFormData {
  name: string;
  category: string;
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyDurationMonths: number;
  supplierName: string;
  supplierPhone: string;
  supplierEmail: string;
  purchasePrice: string;
  notes: string;
}

export function ApplianceForm() {
  const navigate = useNavigate();
  const { addAppliance } = useAppliances();
  
  const [formData, setFormData] = useState<ApplianceFormData>({
    name: "",
    category: "",
    brand: "",
    model: "",
    serialNumber: "",
    purchaseDate: "",
    warrantyDurationMonths: 12,
    supplierName: "",
    supplierPhone: "",
    supplierEmail: "",
    purchasePrice: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<ApplianceFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<ApplianceFormData> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.purchaseDate) newErrors.purchaseDate = "Purchase date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    addAppliance({
      name: formData.name.trim(),
      category: formData.category,
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      serialNumber: formData.serialNumber.trim() || undefined,
      purchaseDate: formData.purchaseDate,
      warrantyDurationMonths: formData.warrantyDurationMonths,
      supplierName: formData.supplierName.trim() || undefined,
      supplierPhone: formData.supplierPhone.trim() || undefined,
      supplierEmail: formData.supplierEmail.trim() || undefined,
      purchasePrice: formData.purchasePrice ? parseFloat(formData.purchasePrice) : undefined,
      notes: formData.notes.trim() || undefined,
    });

    navigate('/appliances');
  };

  const handleChange = (field: keyof ApplianceFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Appliance Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., LG Refrigerator 260L"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                placeholder="e.g., Samsung, LG, Apple"
                className={errors.brand ? "border-destructive" : ""}
              />
              {errors.brand && <p className="text-sm text-destructive">{errors.brand}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                placeholder="e.g., GL-I292RPZL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                value={formData.serialNumber}
                onChange={(e) => handleChange('serialNumber', e.target.value)}
                placeholder="Device serial number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase & Warranty */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase & Warranty Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date *</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => handleChange('purchaseDate', e.target.value)}
                className={errors.purchaseDate ? "border-destructive" : ""}
              />
              {errors.purchaseDate && <p className="text-sm text-destructive">{errors.purchaseDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="warrantyDuration">Warranty Duration (Months)</Label>
              <Input
                id="warrantyDuration"
                type="number"
                min="0"
                max="120"
                value={formData.warrantyDurationMonths}
                onChange={(e) => handleChange('warrantyDurationMonths', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Purchase Price (₹)</Label>
              <Input
                id="purchasePrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.purchasePrice}
                onChange={(e) => handleChange('purchasePrice', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Information */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplierName">Supplier Name</Label>
              <Input
                id="supplierName"
                value={formData.supplierName}
                onChange={(e) => handleChange('supplierName', e.target.value)}
                placeholder="e.g., Croma, Reliance Digital"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplierPhone">Supplier Phone</Label>
              <Input
                id="supplierPhone"
                value={formData.supplierPhone}
                onChange={(e) => handleChange('supplierPhone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="supplierEmail">Supplier Email</Label>
              <Input
                id="supplierEmail"
                type="email"
                value={formData.supplierEmail}
                onChange={(e) => handleChange('supplierEmail', e.target.value)}
                placeholder="support@supplier.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any additional information about this appliance..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/appliances')}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary-dark">
          Add Appliance
        </Button>
      </div>
    </form>
  );
}