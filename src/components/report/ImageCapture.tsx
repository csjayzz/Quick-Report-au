import React, { useState, useRef } from 'react';
import { Camera, X, Image as ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageCaptureProps {
  onImageCaptured: (file: File | null) => void;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({ onImageCaptured }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [captureMode, setCaptureMode] = useState<'camera' | 'upload'>('camera');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageCaptured(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageCaptured(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  if (preview) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-border shadow-sm">
        <img
          src={preview}
          alt="Captured incident"
          className="w-full h-48 object-cover"
        />
        <button
          onClick={clearImage}
          className="absolute top-2 right-2 w-8 h-8 bg-foreground/80 text-background rounded-full flex items-center justify-center hover:bg-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-2 left-2 px-3 py-1 bg-success/90 text-success-foreground rounded-full text-xs font-medium flex items-center gap-1">
          <ImageIcon className="w-3 h-3" />
          Image attached
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          variant={captureMode === 'camera' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCaptureMode('camera')}
          className="flex-1"
        >
          <Camera className="w-4 h-4 mr-2" />
          Camera
        </Button>
        <Button
          variant={captureMode === 'upload' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCaptureMode('upload')}
          className="flex-1"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      <div
        className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
        onClick={() =>
          captureMode === 'camera'
            ? cameraInputRef.current?.click()
            : fileInputRef.current?.click()
        }
      >
        {captureMode === 'camera' ? (
          <>
            <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">Take a photo</p>
            <p className="text-xs text-muted-foreground mt-1">
              Tap to open camera
            </p>
          </>
        ) : (
          <>
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">Upload image</p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG up to 10MB
            </p>
          </>
        )}
      </div>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <p className="text-xs text-center text-muted-foreground">
        Optional but helps responders assess the situation
      </p>
    </div>
  );
};

export default ImageCapture;
