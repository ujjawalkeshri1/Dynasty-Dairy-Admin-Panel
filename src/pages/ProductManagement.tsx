import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';


interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: boolean;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Fresh Cow Milk (500ml)', category: 'Milk', price: 25, stock: 245, status: true, image: 'milk bottle' },
  { id: 2, name: 'Fresh Cow Milk (1L)', category: 'Milk', price: 45, stock: 180, status: true, image: 'milk bottle' },
  { id: 3, name: 'Buffalo Milk (500ml)', category: 'Milk', price: 35, stock: 120, status: true, image: 'milk bottle' },
  { id: 4, name: 'Fresh Paneer (200g)', category: 'Cheese', price: 55, stock: 85, status: true, image: 'cheese' },
  { id: 5, name: 'Fresh Paneer (500g)', category: 'Cheese', price: 125, stock: 65, status: true, image: 'cheese' },
  { id: 6, name: 'Natural Yogurt (400g)', category: 'Yogurt', price: 30, stock: 156, status: true, image: 'yogurt' },
  { id: 7, name: 'Greek Yogurt (200g)', category: 'Yogurt', price: 42, stock: 95, status: true, image: 'yogurt' },
  { id: 8, name: 'Classic Ghee (1L)', category: 'Ghee', price: 250, stock: 45, status: true, image: 'ghee jar' },
  { id: 9, name: 'Premium Ghee (500ml)', category: 'Ghee', price: 140, stock: 68, status: false, image: 'ghee jar' },
  { id: 10, name: 'Mozzarella Cheese (250g)', category: 'Cheese', price: 75, stock: 52, status: true, image: 'cheese' },
];

// FIX: Wrapped the image logic in the getProductImage function
const getProductImage = (name: string): string => {
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes('milk')) return 'https://www.shutterstock.com/shutterstock/photos/2623942015/display_1500/stock-photo-milk-packet-front-view-on-white-background-2623942015.jpg';
    if (lowerCaseName.includes('paneer')) return 'https://www.shutterstock.com/shutterstock/photos/2496872681/display_1500/stock-photo-indoor-photo-of-fresh-paneer-along-with-cooked-paneer-masala-2496872681.jpg';
    if (lowerCaseName.includes('yogurt')) return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Turkish_strained_yogurt.jpg/250px-Turkish_strained_yogurt.jpg';
    if (lowerCaseName.includes('ghee')) return 'https://keralaayurveda.biz/cdn/shop/articles/unnamed_53d6b8aa-8a09-448f-9fea-6e04472a3689.jpg?v=1752079400&width=2048';
    if (lowerCaseName.includes('mozzarella cheese')) return 'https://kraftnaturalcheese.com/wp-content/uploads/2022/07/shredded_mozzarrella_8oz.jpg';
    return 'https://via.placeholder.com/150'; // Fallback image
};

export function ProductManagement() {
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductPrice, setNewProductPrice] = useState<number | ''>('');
  const [newProductStock, setNewProductStock] = useState<number | ''>('');
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);

  const handleDelete = (id: number) => {
    setProductsList(currentProducts => currentProducts.filter(p => p.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: boolean) => {
    setProductsList(currentProducts =>
      currentProducts.map(p => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const handleEdit = (product: Product) => {
    // For now, we'll just show an alert. In a real app, you'd open a dialog.
    alert(`Editing product: ${product.name}`);
  };

  const handleAddProduct = () => {
    if (newProductName && newProductCategory && newProductPrice !== '' && newProductStock !== '') {
      const newProduct: Product = {
        id: productsList.length > 0 ? Math.max(...productsList.map(p => p.id)) + 1 : 1,
        name: newProductName,
        category: newProductCategory,
        price: Number(newProductPrice),
        stock: Number(newProductStock),
        status: true,
        image: getProductImage(newProductName),
      };
      setProductsList(currentProducts => [...currentProducts, newProduct]);
      setNewProductName('');
      setNewProductCategory('');
      setNewProductPrice('');
      setNewProductStock('');
      setIsAddProductDialogOpen(false);
    } else {
      alert('Please fill all fields to add a new product.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Product Management</h2>
          <p className="text-gray-500">Manage your dairy products inventory</p>
        </div>
        <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div><Label htmlFor="name">Product Name</Label><Input id="name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} /></div>
              <div><Label htmlFor="category">Category</Label><Input id="category" value={newProductCategory} onChange={(e) => setNewProductCategory(e.target.value)} /></div>
              <div><Label htmlFor="price">Price</Label><Input id="price" type="number" value={newProductPrice} onChange={(e) => setNewProductPrice(Number(e.target.value))} /></div>
              <div><Label htmlFor="stock">Stock</Label><Input id="stock" type="number" value={newProductStock} onChange={(e) => setNewProductStock(Number(e.target.value))} /></div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
              <Button type="submit" onClick={handleAddProduct}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 bg-gray-50">
              <tr>
                <th className="px-4 py-3"><input type="checkbox" /></th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsList.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3"><input type="checkbox" /></td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <ImageWithFallback src={getProductImage(product.name)} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{product.category}</td>
                  <td className="px-4 py-3 text-gray-600">₹{product.price.toFixed(2)}</td>
                  <td className="px-4 py-3"><Badge variant={product.stock > 20 ? 'default' : 'destructive'}>{product.stock} in stock</Badge></td>
                  <td className="px-4 py-3">
                    <Switch
                      checked={product.status}
                      onCheckedChange={(newStatus) => handleStatusChange(product.id, newStatus)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEdit(product)}><Edit className="h-4 w-4" /></Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the product "{product.name}".</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(product.id)}>Delete</AlertDialogAction>
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
    </div>
  );
}