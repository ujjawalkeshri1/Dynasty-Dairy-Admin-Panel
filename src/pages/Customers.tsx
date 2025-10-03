import { Eye, Edit, Trash2, UserPlus, FileDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'; // Added Select imports for status

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  joinedDate: string;
}

const customers: Customer[] = [
  { id: 'CUST-001', name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '+91 98765 43210', location: 'Mumbai, Maharashtra', totalOrders: 45, totalSpent: 12500, status: 'active', joinedDate: 'Jan 15, 2024' },
  { id: 'CUST-002', name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43211', location: 'Delhi', totalOrders: 38, totalSpent: 9800, status: 'active', joinedDate: 'Feb 2, 2024' },
  { id: 'CUST-003', name: 'Amit Patel', email: 'amit.patel@email.com', phone: '+91 98765 43212', location: 'Bangalore, Karnataka', totalOrders: 52, totalSpent: 15600, status: 'active', joinedDate: 'Dec 10, 2023' },
  { id: 'CUST-004', name: 'Neha Desai', email: 'neha.desai@email.com', phone: '+91 98765 43213', location: 'Pune, Maharashtra', totalOrders: 28, totalSpent: 7200, status: 'active', joinedDate: 'Mar 5, 2024' },
  { id: 'CUST-005', name: 'Sanjay Reddy', email: 'sanjay.reddy@email.com', phone: '+91 98765 43214', location: 'Hyderabad, Telangana', totalOrders: 15, totalSpent: 4500, status: 'inactive', joinedDate: 'Apr 20, 2024' },
  { id: 'CUST-006', name: 'Lakshmi Iyer', email: 'lakshmi.iyer@email.com', phone: '+91 98765 43215', location: 'Chennai, Tamil Nadu', totalOrders: 62, totalSpent: 18900, status: 'active', joinedDate: 'Nov 8, 2023' },
  { id: 'CUST-007', name: 'Arjun Singh', email: 'arjun.singh@email.com', phone: '+91 98765 43216', location: 'Kolkata, West Bengal', totalOrders: 33, totalSpent: 8700, status: 'active', joinedDate: 'Jan 28, 2024' },
  { id: 'CUST-008', name: 'Kavita Gupta', email: 'kavita.gupta@email.com', phone: '+91 98765 43217', location: 'Ahmedabad, Gujarat', totalOrders: 41, totalSpent: 11200, status: 'active', joinedDate: 'Feb 14, 2024' },
];

export function Customers() {
  const [customersList, setCustomersList] = useState<Customer[]>(customers);
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const [isEditCustomerDialogOpen, setIsEditCustomerDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // State for new customer form
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerLocation, setNewCustomerLocation] = useState('');

  const handleDelete = (id: string) => {
    setCustomersList(currentCustomers => currentCustomers.filter(c => c.id !== id));
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsEditCustomerDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingCustomer) {
      setCustomersList(currentCustomers =>
        currentCustomers.map(c => (c.id === editingCustomer.id ? editingCustomer : c))
      );
      setIsEditCustomerDialogOpen(false);
      setEditingCustomer(null); // Clear editing state
    }
  };

  const handleAddCustomer = () => {
    if (newCustomerName && newCustomerEmail && newCustomerPhone && newCustomerLocation) {
      const newId = `CUST-${String(customersList.length > 0 ? Math.max(...customersList.map(c => parseInt(c.id.split('-')[1])) + 1) : 1).padStart(3, '0')}`;
      const newCustomer: Customer = {
        id: newId,
        name: newCustomerName,
        email: newCustomerEmail,
        phone: newCustomerPhone,
        location: newCustomerLocation,
        totalOrders: 0, // Default for new customer
        totalSpent: 0, // Default for new customer
        status: 'active', // Default for new customer
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      setCustomersList(currentCustomers => [...currentCustomers, newCustomer]);
      // Clear form fields and close dialog
      setNewCustomerName('');
      setNewCustomerEmail('');
      setNewCustomerPhone('');
      setNewCustomerLocation('');
      setIsAddCustomerDialogOpen(false);
    } else {
      alert('Please fill all fields to add a new customer.');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Customers</h2>
          <p className="text-gray-500">Manage your customer database</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-gray-300"><FileDown className="w-4 h-4 mr-2" />Export</Button>
          <Dialog open={isAddCustomerDialogOpen} onOpenChange={setIsAddCustomerDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white"><UserPlus className="w-4 h-4 mr-2" />Add New Customer</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Customer</DialogTitle></DialogHeader>
              <div className="grid gap-4 py-4">
                <div><Label htmlFor="newName">Full Name</Label><Input id="newName" value={newCustomerName} onChange={(e) => setNewCustomerName(e.target.value)} /></div>
                <div><Label htmlFor="newEmail">Email</Label><Input id="newEmail" type="email" value={newCustomerEmail} onChange={(e) => setNewCustomerEmail(e.target.value)} /></div>
                <div><Label htmlFor="newPhone">Phone</Label><Input id="newPhone" type="tel" value={newCustomerPhone} onChange={(e) => setNewCustomerPhone(e.target.value)} /></div>
                <div><Label htmlFor="newLocation">Location</Label><Input id="newLocation" value={newCustomerLocation} onChange={(e) => setNewCustomerLocation(e.target.value)} /></div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                <Button type="submit" onClick={handleAddCustomer}>Add Customer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Total Customers</p>
          <p className="text-gray-900">{customersList.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Active Customers</p>
          <p className="text-gray-900">{customersList.filter(c => c.status === 'active').length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Total Orders</p>
          <p className="text-gray-900">{customersList.reduce((sum, c) => sum + c.totalOrders, 0)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Total Spent</p>
          <p className="text-gray-900">₹{customersList.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-gray-700">Customer ID</th>
                <th className="px-4 py-3 text-left text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-gray-700">Contact</th>
                <th className="px-4 py-3 text-left text-gray-700">Location</th>
                <th className="px-4 py-3 text-left text-gray-700">Total Orders</th>
                <th className="px-4 py-3 text-left text-gray-700">Total Spent</th>
                <th className="px-4 py-3 text-left text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customersList.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{customer.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-gray-900">{customer.name}</p>
                      <p className="text-gray-500">{customer.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{customer.phone}</td>
                  <td className="px-4 py-3 text-gray-700">{customer.location}</td>
                  <td className="px-4 py-3 text-gray-900">{customer.totalOrders}</td>
                  <td className="px-4 py-3 text-gray-900">₹{customer.totalSpent.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={customer.status === 'active'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                      }
                    >
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* View Button - Placeholder for future functionality */}
                      <Button variant="outline" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-50">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {/* Edit Button */}
                      <Button variant="outline" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-50" onClick={() => handleEdit(customer)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {/* Delete Button with AlertDialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>This will permanently delete the customer "{customer.name}".</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(customer.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditCustomerDialogOpen} onOpenChange={setIsEditCustomerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          {editingCustomer && (
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="editName">Full Name</Label>
                <Input id="editName" value={editingCustomer.name} onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="editEmail">Email</Label>
                <Input id="editEmail" type="email" value={editingCustomer.email} onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="editPhone">Phone</Label>
                <Input id="editPhone" type="tel" value={editingCustomer.phone} onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="editLocation">Location</Label>
                <Input id="editLocation" value={editingCustomer.location} onChange={(e) => setEditingCustomer({ ...editingCustomer, location: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="editTotalOrders">Total Orders</Label>
                <Input id="editTotalOrders" type="number" value={editingCustomer.totalOrders} onChange={(e) => setEditingCustomer({ ...editingCustomer, totalOrders: Number(e.target.value) })} />
              </div>
              <div>
                <Label htmlFor="editTotalSpent">Total Spent</Label>
                <Input id="editTotalSpent" type="number" value={editingCustomer.totalSpent} onChange={(e) => setEditingCustomer({ ...editingCustomer, totalSpent: Number(e.target.value) })} />
              </div>
              <div>
                <Label htmlFor="editStatus">Status</Label>
                <Select value={editingCustomer.status} onValueChange={(value) => setEditingCustomer({ ...editingCustomer, status: value as 'active' | 'inactive' })}>
                  <SelectTrigger id="editStatus">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
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