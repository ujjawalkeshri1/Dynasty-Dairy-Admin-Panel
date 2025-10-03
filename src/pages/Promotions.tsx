import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface Promotion {
  id: number;
  title: string;
  code: string;
  discountType: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  status: boolean;
}

const promotions: Promotion[] = [
  { id: 1, title: '20% OFF First Order', code: 'WELCOME20', discountType: 'Percentage', discountValue: 20, startDate: '2025-09-01', endDate: '2025-12-31', status: true },
  { id: 2, title: 'Free Delivery on Orders Above ₹300', code: 'FREEDEL300', discountType: 'Fixed Amount', discountValue: 40, startDate: '2025-10-01', endDate: '2025-10-31', status: true },
  { id: 3, title: 'Weekend Special - 15% OFF', code: 'WEEKEND15', discountType: 'Percentage', discountValue: 15, startDate: '2025-10-05', endDate: '2025-10-06', status: true },
  { id: 4, title: 'Subscribe and Save 25%', code: 'SUBSCRIBE25', discountType: 'Percentage', discountValue: 25, startDate: '2025-09-15', endDate: '2025-12-31', status: true },
  { id: 5, title: 'Festival Special Offer', code: 'FESTIVAL30', discountType: 'Percentage', discountValue: 30, startDate: '2025-03-01', endDate: '2025-03-31', status: false },
  { id: 6, title: '₹150 OFF on Orders Above ₹900', code: 'SAVE150', discountType: 'Fixed Amount', discountValue: 150, startDate: '2025-10-01', endDate: '2025-11-30', status: true },
];

export function Promotions() {
  const [promotionsList, setPromotionsList] = useState<Promotion[]>(promotions);
  const [isAddPromotionDialogOpen, setIsAddPromotionDialogOpen] = useState(false);
  const [isEditPromotionDialogOpen, setIsEditPromotionDialogOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  // State for new promotion form
  const [newPromotionTitle, setNewPromotionTitle] = useState('');
  const [newPromotionCode, setNewPromotionCode] = useState('');
  const [newPromotionDiscountType, setNewPromotionDiscountType] = useState('Percentage');
  const [newPromotionDiscountValue, setNewPromotionDiscountValue] = useState<number | ''>('');
  const [newPromotionStartDate, setNewPromotionStartDate] = useState('');
  const [newPromotionEndDate, setNewPromotionEndDate] = useState('');

  const handleDelete = (id: number) => {
    setPromotionsList(promotionsList.filter(p => p.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: boolean) => {
    setPromotionsList(currentPromotions =>
      currentPromotions.map(p => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setIsEditPromotionDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingPromotion) {
      setPromotionsList(currentPromotions =>
        currentPromotions.map(p => (p.id === editingPromotion.id ? editingPromotion : p))
      );
      setIsEditPromotionDialogOpen(false);
      setEditingPromotion(null); // Clear editing state
    }
  };

  const handleAddPromotion = () => {
    if (newPromotionTitle && newPromotionCode && newPromotionDiscountType && newPromotionDiscountValue !== '' && newPromotionStartDate && newPromotionEndDate) {
      const newPromotion: Promotion = {
        id: promotionsList.length > 0 ? Math.max(...promotionsList.map(p => p.id)) + 1 : 1,
        title: newPromotionTitle,
        code: newPromotionCode,
        discountType: newPromotionDiscountType,
        discountValue: Number(newPromotionDiscountValue),
        startDate: newPromotionStartDate,
        endDate: newPromotionEndDate,
        status: true, // New promotions are active by default
      };
      setPromotionsList(currentPromotions => [...currentPromotions, newPromotion]);
      // Clear form fields and close dialog
      setNewPromotionTitle('');
      setNewPromotionCode('');
      setNewPromotionDiscountType('Percentage');
      setNewPromotionDiscountValue('');
      setNewPromotionStartDate('');
      setNewPromotionEndDate('');
      setIsAddPromotionDialogOpen(false);
    } else {
      alert('Please fill all fields to create a new promotion.');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Promotions</h2>
          <p className="text-gray-500">Manage promotional offers and discount codes</p>
        </div>
        <Dialog open={isAddPromotionDialogOpen} onOpenChange={setIsAddPromotionDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create New Promotion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Promotion</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="newTitle">Title</Label>
                <Input id="newTitle" placeholder="e.g., 20% OFF First Order" value={newPromotionTitle} onChange={(e) => setNewPromotionTitle(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="newCode">Code</Label>
                <Input id="newCode" placeholder="e.g., WELCOME20" value={newPromotionCode} onChange={(e) => setNewPromotionCode(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="newDiscountType">Discount Type</Label>
                <Select value={newPromotionDiscountType} onValueChange={setNewPromotionDiscountType}>
                  <SelectTrigger id="newDiscountType">
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                    <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="newDiscountValue">Discount Value</Label>
                <Input id="newDiscountValue" type="number" placeholder="e.g., 20 or 150" value={newPromotionDiscountValue} onChange={(e) => setNewPromotionDiscountValue(Number(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="newStartDate">Start Date</Label>
                <Input id="newStartDate" type="date" value={newPromotionStartDate} onChange={(e) => setNewPromotionStartDate(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="newEndDate">End Date</Label>
                <Input id="newEndDate" type="date" value={newPromotionEndDate} onChange={(e) => setNewPromotionEndDate(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleAddPromotion}>Create Promotion</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {promotionsList.map((promotion) => (
          <div key={promotion.id} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">{promotion.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {promotion.code}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    {promotion.discountType}
                  </Badge>
                </div>
              </div>
              <Switch
                checked={promotion.status}
                onCheckedChange={(newStatus) => handleStatusChange(promotion.id, newStatus)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-500 mb-1">Discount</p>
                <p className="text-gray-900">
                  {promotion.discountType === 'Percentage'
                    ? `${promotion.discountValue}%`
                    : `₹${promotion.discountValue}`}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Status</p>
                <p className={promotion.status ? 'text-green-600' : 'text-red-600'}>
                  {promotion.status ? 'Active' : 'Expired'}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-500 mb-1">Duration</p>
              <p className="text-gray-900">{promotion.startDate} - {promotion.endDate}</p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <Button variant="outline" className="flex-1 border-gray-300" onClick={() => handleEdit(promotion)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the "{promotion.title}" promotion.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(promotion.id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Promotion Dialog */}
      <Dialog open={isEditPromotionDialogOpen} onOpenChange={setIsEditPromotionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Promotion</DialogTitle>
          </DialogHeader>
          {editingPromotion && (
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="editTitle">Title</Label>
                <Input id="editTitle" value={editingPromotion.title} onChange={(e) => setEditingPromotion({ ...editingPromotion, title: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="editCode">Code</Label>
                <Input id="editCode" value={editingPromotion.code} onChange={(e) => setEditingPromotion({ ...editingPromotion, code: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="editDiscountType">Discount Type</Label>
                <Select value={editingPromotion.discountType} onValueChange={(value) => setEditingPromotion({ ...editingPromotion, discountType: value })}>
                  <SelectTrigger id="editDiscountType">
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                    <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editDiscountValue">Discount Value</Label>
                <Input id="editDiscountValue" type="number" value={editingPromotion.discountValue} onChange={(e) => setEditingPromotion({ ...editingPromotion, discountValue: Number(e.target.value) })} />
              </div>
              <div>
                <Label htmlFor="editStartDate">Start Date</Label>
                <Input id="editStartDate" type="date" value={editingPromotion.startDate} onChange={(e) => setEditingPromotion({ ...editingPromotion, startDate: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="editEndDate">End Date</Label>
                <Input id="editEndDate" type="date" value={editingPromotion.endDate} onChange={(e) => setEditingPromotion({ ...editingPromotion, endDate: e.target.value })} />
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