import React from 'react';
import { Incident } from '@/types/incident';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, User, Shield, Heart, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface IncidentCardProps {
  incident: Incident;
  onView: (incident: Incident) => void;
  onUpdateStatus: (id: string, status: Incident['status']) => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onView, onUpdateStatus }) => {
  const statusColors = {
    new: 'bg-emergency/10 text-emergency border-emergency/20',
    acknowledged: 'bg-warning/10 text-warning border-warning/20',
    in_progress: 'bg-info/10 text-info border-info/20',
    resolved: 'bg-success/10 text-success border-success/20',
  };

  const severityColors = {
    critical: 'bg-emergency text-emergency-foreground',
    high: 'bg-destructive text-destructive-foreground',
    medium: 'bg-warning text-warning-foreground',
    low: 'bg-muted text-muted-foreground',
  };

  const TypeIcon = incident.type === 'police' ? Shield : Heart;

  return (
    <div 
      className="bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-all duration-200 hover:border-accent/30 cursor-pointer group"
      onClick={() => onView(incident)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            incident.type === 'police' ? 'bg-primary/10 text-primary' : 'bg-emergency/10 text-emergency'
          }`}>
            <TypeIcon className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${statusColors[incident.status]}`}>
                {incident.status.replace('_', ' ').toUpperCase()}
              </span>
              <Badge className={`${severityColors[incident.severity]} text-xs`}>
                {incident.severity}
              </Badge>
            </div>
            
            <p className="text-sm font-medium text-foreground mt-2 line-clamp-2">
              {incident.description || `${incident.type === 'police' ? 'Police' : 'Medical'} incident reported`}
            </p>
            
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(incident.createdAt, { addSuffix: true })}
              </span>
              {incident.location.address && (
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{incident.location.address}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
      </div>

      {incident.status === 'new' && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus(incident.id, 'acknowledged');
            }}
          >
            Acknowledge
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onView(incident);
            }}
          >
            View Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default IncidentCard;
