import React, { useState, useEffect } from 'react';
import ImageUpload from '@/components/common/ImageUpload';
import { UseFormReturn } from 'react-hook-form';
import { XIcon } from 'lucide-react';

interface UserImageUploadProps {
  name: string;
  form: UseFormReturn<any>;
  label?: string;
  existingImageUrl?: string | null;
}

const UserImageUpload: React.FC<UserImageUploadProps> = ({
  name,
  form,
  label = 'Image Upload',
  existingImageUrl,
}) => {
  const [preview, setPreview] = useState<string | null>(existingImageUrl || null);
  const { setValue } = form;

  useEffect(() => {
    setPreview(existingImageUrl || null);
  }, [existingImageUrl]);

  const handleChange = (file: File | null) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setValue(name, null);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {preview ? (
        <div className="relative w-full h-[350px]">
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <ImageUpload name={name} form={form} label={label} onChange={handleChange} />
      )}
    </div>
  );
};

export default UserImageUpload;