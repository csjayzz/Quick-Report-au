import React from 'react';
import { Button } from '@/components/ui/button';
import { IncidentStatus, IncidentType } from '@/types/incident';
import { Filter, Heart, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface IncidentFiltersProps {
  statusFilter: IncidentStatus | 'all';
  typeFilter: IncidentType | 'all';
  onStatusChange: (status: IncidentStatus | 'all') => void;
  onTypeChange: (type: IncidentType | 'all') => void;
}

const IncidentFilters: React.FC<IncidentFiltersProps> = ({
  statusFilter,
  typeFilter,
  onStatusChange,
  onTypeChange,
}) => {
  const statusOptions: { value: IncidentStatus | 'all'; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <Filter className="w-4 h-4" /> },
    { value: 'new', label: 'New', icon: <AlertCircle className="w-4 h-4" /> },
    { value: 'acknowledged', label: 'Acknowledged', icon: <Clock className="w-4 h-4" /> },
    { value: 'in_progress', label: 'In Progress', icon: <Clock className="w-4 h-4" /> },
    { value: 'resolved', label: 'Resolved', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const typeOptions: { value: IncidentType | 'all'; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All Types', icon: <Filter className="w-4 h-4" /> },
    { value: 'accident', label: 'Accident', icon: <AlertCircle className="w-4 h-4" /> },
    { value: 'medical', label: 'Medical', icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={statusFilter === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onStatusChange(option.value)}
              className="gap-1.5"
            >
              {option.icon}
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">Type</p>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((option) => (
            <Button
              key={option.value}
              variant={typeFilter === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTypeChange(option.value)}
              className="gap-1.5"
            >
              {option.icon}
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidentFilters;
