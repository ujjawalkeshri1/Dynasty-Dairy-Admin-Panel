import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch'; // Not used in this component, but kept if needed later
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'; // Added Select imports for status

interface Hub {
  id: string;
  name: string;
  location: string;
  manager: string;
  phone: string;
  capacity: number;
  currentStock: number;
  activeDeliveries: number;
  status: 'operational' | 'maintenance' | 'inactive';
}

const hubs: Hub[] = [
  { id: 'HUB-001', name: 'Mumbai Central Hub', location: 'Andheri East, Mumbai', manager: 'Rajesh Kumar', phone: '+91 98765 11111', capacity: 5000, currentStock: 3850, activeDeliveries: 145, status: 'operational' },
  { id: 'HUB-002', name: 'Delhi North Hub', location: 'Rohini, Delhi', manager: 'Priya Sharma', phone: '+91 98765 22222', capacity: 4500, currentStock: 3200, activeDeliveries: 120, status: 'operational' },
  { id: 'HUB-003', name: 'Bangalore Tech Hub', location: 'Whitefield, Bangalore', manager: 'Amit Patel', phone: '+91 98765 33333', capacity: 4000, currentStock: 2800, activeDeliveries: 98, status: 'operational' },
  { id: 'HUB-004', name: 'Pune West Hub', location: 'Hinjewadi, Pune', manager: 'Neha Desai', phone: '+91 98765 44444', capacity: 3500, currentStock: 1200, activeDeliveries: 45, status: 'maintenance' },
  { id: 'HUB-005', name: 'Hyderabad Hub', location: 'Gachibowli, Hyderabad', manager: 'Sanjay Reddy', phone: '+91 98765 55555', capacity: 3000, currentStock: 2100, activeDeliveries: 72, status: 'operational' },
  { id: 'HUB-006', name: 'Chennai South Hub', location: 'OMR, Chennai', manager: 'Lakshmi Iyer', phone: '+91 98765 66666', capacity: 3500, currentStock: 2650, activeDeliveries: 85, status: 'operational' },
];

export function HubManagement() {
  const [hubsList, setHubsList] = useState<Hub[]>(hubs);
  const [isAddHubDialogOpen, setIsAddHubDialogOpen] = useState(false);
  const [isEditHubDialogOpen, setIsEditHubDialogOpen] = useState(false);
  const [editingHub, setEditingHub] = useState<Hub | null>(null);

  // State for new hub form
  const [newHubName, setNewHubName] = useState('');
  const [newHubLocation, setNewHubLocation] = useState('');
  const [newHubManager, setNewHubManager] = useState('');
  const [newHubPhone, setNewHubPhone] = useState('');
  const [newHubCapacity, setNewHubCapacity] = useState<number | ''>('');


  const handleDelete = (id: string) => {
    setHubsList(currentHubs => currentHubs.filter(h => h.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'maintenance':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'inactive':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleEdit = (hub: Hub) => {
    setEditingHub(hub);
    setIsEditHubDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingHub) {
      setHubsList(currentHubs =>
        currentHubs.map(h => (h.id === editingHub.id ? editingHub : h))
      );
      setIsEditHubDialogOpen(false);
      setEditingHub(null); // Clear editing state
    }
  };

  const handleAddHub = () => {
    if (newHubName && newHubLocation && newHubManager && newHubPhone && newHubCapacity !== '') {
      const newId = `HUB-${String(hubsList.length > 0 ? Math.max(...hubsList.map(h => parseInt(h.id.split('-')[1])) + 1) : 1).padStart(3, '0')}`;
      const newHub: Hub = {
        id: newId,
        name: newHubName,
        location: newHubLocation,
        manager: newHubManager,
        phone: newHubPhone,
        capacity: Number(newHubCapacity),
        currentStock: 0, // Default for new hub
        activeDeliveries: 0, // Default for new hub
        status: 'operational', // Default for new hub
      };
      setHubsList(currentHubs => [...currentHubs, newHub]);
      // Clear form fields and close dialog
      setNewHubName('');
      setNewHubLocation('');
      setNewHubManager('');
      setNewHubPhone('');
      setNewHubCapacity('');
      setIsAddHubDialogOpen(false);
    } else {
      alert('Please fill all fields to add a new hub.');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Hub Management</h2>
          <p className="text-gray-500">Manage distribution hubs and inventory</p>
        </div>
        <Dialog open={isAddHubDialogOpen} onOpenChange={setIsAddHubDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-4 h-4 mr-2" />Add New Hub</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Hub</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div><Label htmlFor="newHubName">Hub Name</Label><Input id="newHubName" value={newHubName} onChange={(e) => setNewHubName(e.target.value)} /></div>
              <div><Label htmlFor="newHubLocation">Location</Label><Input id="newHubLocation" value={newHubLocation} onChange={(e) => setNewHubLocation(e.target.value)} /></div>
              <div><Label htmlFor="newHubManager">Manager</Label><Input id="newHubManager" value={newHubManager} onChange={(e) => setNewHubManager(e.target.value)} /></div>
              <div><Label htmlFor="newHubPhone">Phone</Label><Input id="newHubPhone" value={newHubPhone} onChange={(e) => setNewHubPhone(e.target.value)} /></div>
              <div><Label htmlFor="newHubCapacity">Capacity</Label><Input id="newHubCapacity" type="number" value={newHubCapacity} onChange={(e) => setNewHubCapacity(Number(e.target.value))} /></div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
              <Button type="submit" onClick={handleAddHub}>Add Hub</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Total Hubs</p>
          <p className="text-gray-900">{hubsList.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Operational</p>
          <p className="text-gray-900">{hubsList.filter(h => h.status === 'operational').length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Total Capacity</p>
          <p className="text-gray-900">{hubsList.reduce((sum, hub) => sum + hub.capacity, 0).toLocaleString()} units</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Active Deliveries</p>
          <p className="text-gray-900">{hubsList.reduce((sum, hub) => sum + hub.activeDeliveries, 0)}</p>
        </div>
      </div>

      {/* Hub Cards */}
      <div className="grid grid-cols-2 gap-4">
        {hubsList.map((hub) => (
          <div key={hub.id} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">{hub.name}</h3>
                  <p className="text-gray-500">{hub.location}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={getStatusColor(hub.status)}
              >
                {hub.status.charAt(0).toUpperCase() + hub.status.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p className="text-gray-500 mb-1">Manager</p>
                <p className="text-gray-900">{hub.manager}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Phone</p>
                <p className="text-gray-900">{hub.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-gray-500 mb-1">Capacity</p>
                <p className="text-gray-900">{hub.capacity.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Current Stock</p>
                <p className="text-gray-900">{hub.currentStock.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Deliveries</p>
                <p className="text-gray-900">{hub.activeDeliveries}</p>
              </div>
            </div>

            {/* Stock Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-500">Stock Level</span>
                <span className="text-gray-900">{Math.round((hub.currentStock / hub.capacity) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(hub.currentStock / hub.capacity) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex-1 border-gray-300" onClick={() => handleEdit(hub)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Hub
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the hub "{hub.name}".</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(hub.id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Hub Dialog */}
      <Dialog open={isEditHubDialogOpen} onOpenChange={setIsEditHubDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Hub</DialogTitle>
          </DialogHeader>
          {editingHub && (
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="editHubName">Hub Name</Label>
                <Input id="editHubName" value={editingHub.name} onChange={(e) => setEditingHub({ ...editingHub, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="editHubLocation">Location</Label>
                <Input id="editHubLocation" value={editingHub.location} onChange={(e) => setEditingHub({ ...editingHub, location: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="editHubManager">Manager</Label>
                <Input id="editHubManager" value={editingHub.manager} onChange={(e) => setEditingHub({ ...editingHub, manager: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="editHubPhone">Phone</Label>
                <Input id="editHubPhone" value={editingHub.phone} onChange={(e) => setEditingHub({ ...editingHub, phone: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="editHubCapacity">Capacity</Label>
                <Input id="editHubCapacity" type="number" value={editingHub.capacity} onChange={(e) => setEditingHub({ ...editingHub, capacity: Number(e.target.value) })} />
              </div>
              <div>
                <Label htmlFor="editHubCurrentStock">Current Stock</Label>
                <Input id="editHubCurrentStock" type="number" value={editingHub.currentStock} onChange={(e) => setEditingHub({ ...editingHub, currentStock: Number(e.target.value) })} />
              </div>
              <div>
                <Label htmlFor="editHubActiveDeliveries">Active Deliveries</Label>
                <Input id="editHubActiveDeliveries" type="number" value={editingHub.activeDeliveries} onChange={(e) => setEditingHub({ ...editingHub, activeDeliveries: Number(e.target.value) })} />
              </div>
              <div>
                <Label htmlFor="editHubStatus">Status</Label>
                <Select value={editingHub.status} onValueChange={(value) => setEditingHub({ ...editingHub, status: value as 'operational' | 'maintenance' | 'inactive' })}>
                  <SelectTrigger id="editHubStatus">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}