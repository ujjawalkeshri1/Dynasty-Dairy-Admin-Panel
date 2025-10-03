import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Save } from 'lucide-react';

interface EditProfileProps {
  onNavigateBack: () => void;
}

export function EditProfile({ onNavigateBack }: EditProfileProps) {
  const handleSaveChanges = () => {
   
    onNavigateBack();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 text-lg font-medium mb-1">Edit Profile</h2>
        <p className="text-gray-500">Update your personal and account information.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl">SR</span>
          </div>
          <div>
            <Button variant="outline">Change Photo</Button>
            <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="Suresh Rao" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Super Admin" className="mt-1.5" disabled />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="suresh.rao@dynasty.com" className="mt-1.5" />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+91 98765 00001" className="mt-1.5" />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <Button variant="outline" onClick={onNavigateBack}>Cancel</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSaveChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}