import React from 'react';
import { Button } from '@/components/ui/button';
import { IncidentType } from '@/types/incident';
import { Shield, Heart } from 'lucide-react';

interface EmergencyButtonsProps {
  onSelect: (type: IncidentType) => void;
  disabled?: boolean;
}

const EmergencyButtons: React.FC<EmergencyButtonsProps> = ({ onSelect, disabled }) => {
  return (
    <div className="grid grid-cols-1 gap-6 w-full max-w-md mx-auto">
      <Button
        variant="police"
        size="emergency"
        onClick={() => onSelect('police')}
        disabled={disabled}
        className="relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <div className="flex flex-col items-center gap-3">
          <Shield className="w-12 h-12" />
          <span className="text-2xl font-bold">Report to Police</span>
          <span className="text-sm opacity-80 font-normal">Crime, accident, emergency</span>
        </div>
      </Button>

      <Button
        variant="ambulance"
        size="emergency"
        onClick={() => onSelect('ambulance')}
        disabled={disabled}
        className="relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emergency-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <div className="flex flex-col items-center gap-3">
          <Heart className="w-12 h-12" />
          <span className="text-2xl font-bold">Call Ambulance</span>
          <span className="text-sm opacity-80 font-normal">Medical emergency, injury</span>
        </div>
      </Button>
    </div>
  );
};

export default EmergencyButtons;
