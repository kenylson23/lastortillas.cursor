import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, currentImage }) => {
  const [imageUrl, setImageUrl] = useState(currentImage || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url) {
      onImageUploaded(url);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Simular upload de arquivo - em produção, você faria upload para um servidor
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImageUrl(result);
        onImageUploaded(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setImageUrl('');
    onImageUploaded('');
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image-url">URL da Imagem</Label>
        <div className="flex gap-2">
          <Input
            id="image-url"
            type="url"
            placeholder="https://exemplo.com/imagem.jpg"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="flex-1"
          />
          {imageUrl && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="image-file">Ou fazer upload de arquivo</Label>
        <div className="flex gap-2">
          <Input
            id="image-file"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="flex-1"
          />
          {isUploading && (
            <Button variant="outline" disabled>
              <Upload className="h-4 w-4 animate-spin" />
            </Button>
          )}
        </div>
      </div>

      {imageUrl && (
        <div className="mt-4">
          <Label>Prévia da Imagem</Label>
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Prévia"
              className="max-w-full h-32 object-cover rounded-md border"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 