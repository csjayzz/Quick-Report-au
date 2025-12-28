import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationCaptureProps {
  onLocationCaptured: (location: { lat: number; lng: number }) => void;
}

const LocationCapture: React.FC<LocationCaptureProps> = ({ onLocationCaptured }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string>('');

  const captureLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setError('Geolocation is not supported by your browser');
      return;
    }

    setStatus('loading');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(loc);
        setStatus('success');
        onLocationCaptured(loc);
      },
      (err) => {
        setStatus('error');
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Please enable location access to report emergencies');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information unavailable');
            break;
          case err.TIMEOUT:
            setError('Location request timed out');
            break;
          default:
            setError('An error occurred while getting location');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    captureLocation();
  }, []);

  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            status === 'success'
              ? 'bg-success/10 text-success'
              : status === 'error'
              ? 'bg-destructive/10 text-destructive'
              : status === 'loading'
              ? 'bg-accent/10 text-accent'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {status === 'loading' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : status === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : status === 'error' ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            {status === 'loading'
              ? 'Getting your location...'
              : status === 'success'
              ? 'Location captured'
              : status === 'error'
              ? 'Location error'
              : 'Location'}
          </p>
          {status === 'success' && location && (
            <p className="text-xs text-muted-foreground">
              {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          )}
          {status === 'error' && (
            <p className="text-xs text-destructive">{error}</p>
          )}
        </div>

        {status === 'error' && (
          <Button variant="outline" size="sm" onClick={captureLocation}>
            Retry
          </Button>
        )}
      </div>
    </div>
  );
};

export default LocationCapture;
