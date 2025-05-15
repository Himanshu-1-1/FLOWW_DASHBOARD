import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { Camera } from 'lucide-react';

interface ProfilePictureProps {
  src: string;
  onUpdate: (file: File) => Promise<void>;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ src, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setTempImage(reader.result as string);
        setIsEditing(true);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false
  });

  const handleSave = async (croppedImage: File) => {
    try {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      await onUpdate(croppedImage);
      
      clearInterval(interval);
      setUploadProgress(100);
      setTimeout(() => {
        setUploadProgress(0);
        setIsEditing(false);
        setTempImage(null);
      }, 500);
    } catch {
      setError('Failed to update profile picture');
      setUploadProgress(0);
    }
  };

  return (
    <div className="relative group">
      <div
        {...getRootProps()}
        className={`relative w-20 h-20 rounded-full overflow-hidden cursor-pointer 
          ${isDragActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      >
        <input {...getInputProps()} />
        <img
          src={src}
          alt="Profile"
          className="w-full h-full object-cover transition-opacity duration-200"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Camera className="text-white" size={24} />
        </div>
      </div>

      {uploadProgress > 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
        <div className="bg-white rounded-full p-1 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <Camera size={16} className="text-gray-600" />
        </div>
      </div>

      {isEditing && tempImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-96">
            <div className="relative h-64 mb-4">
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setTempImage(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(new File([], 'profile.jpg'))}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;