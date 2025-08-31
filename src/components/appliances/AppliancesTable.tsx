import { Eye, Edit, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useAppliances, Appliance } from "@/contexts/AppliancesContext";

interface AppliancesTableProps {
  appliances: Appliance[];
}

export function AppliancesTable({ appliances }: AppliancesTableProps) {
  const navigate = useNavigate();
  const { deleteAppliance } = useAppliances();

  const handleDelete = (appliance: Appliance) => {
    deleteAppliance(appliance.id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="status-active">Active</Badge>;
      case 'Expiring':
        return <Badge className="status-expiring">Expiring Soon</Badge>;
      case 'Expired':
        return <Badge className="status-expired">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (appliances.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <h3 className="text-lg font-medium mb-2">No appliances found</h3>
          <p className="text-sm">Try adjusting your search or filters.</p>
        </div>
        <Button 
          className="mt-4" 
          onClick={() => navigate('/appliances/new')}
        >
          Add Your First Appliance
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Brand & Model</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Warranty Expiry</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliances.map((appliance) => (
            <TableRow 
              key={appliance.id} 
              className="hover:bg-muted/50 cursor-pointer"
              onClick={() => navigate(`/appliances/${appliance.id}`)}
            >
              <TableCell>
                <div>
                  <p className="font-medium">{appliance.name}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{appliance.category}</Badge>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm font-medium">{appliance.brand}</p>
                  <p className="text-xs text-muted-foreground">{appliance.model}</p>
                </div>
              </TableCell>
              <TableCell>{formatDate(appliance.purchaseDate)}</TableCell>
              <TableCell>{formatDate(appliance.warrantyExpiry)}</TableCell>
              <TableCell>{getStatusBadge(appliance.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/appliances/${appliance.id}`);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/appliances/${appliance.id}/edit`);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Appliance</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{appliance.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/90"
                          onClick={() => handleDelete(appliance)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}