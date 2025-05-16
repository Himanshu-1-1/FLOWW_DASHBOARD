import React from 'react';
import { User } from '../../types';
import Card from '../UI/Card';
import { Edit, Save, X } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { useToast } from '../../contexts/ToastContext';
import ProfilePicture from './ProfilePicture';

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const { isEditing, setIsEditing, updateUser, loading } = useDashboard();
  const { showToast } = useToast();
  const [formData, setFormData] = React.useState({
    name: user.name,
    email: user.email
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update profile', 'error');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email
    });
    setIsEditing(false);
  };

  const handleProfilePictureUpdate = async (file: File) => {
    try {
      await updateUser({ profilePicture: URL.createObjectURL(file) });
      showToast('Profile picture updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update profile picture', 'error');
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Profile</h2>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)} 
            className="text-blue-500 hover:text-blue-700 transition-colors"
            aria-label="Edit profile"
          >
            <Edit size={18} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleCancel} 
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cancel editing"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative group">
          <ProfilePicture
            src={user.profilePicture}
            onUpdate={handleProfilePictureUpdate}
          />
          <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-xs bg-black bg-opacity-75 text-white px-2 py-1 rounded whitespace-nowrap">
              Click to change
            </div>
          </div>
        </div>
        
        {!isEditing ? (
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 w-full">
            <div className="mb-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-dark-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-dark-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} className="mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;