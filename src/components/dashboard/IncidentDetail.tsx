import React from 'react';
import { Incident } from '@/types/incident';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MapPin, Clock, User, Phone, AlertTriangle, Heart, X, CheckCircle } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

interface IncidentDetailProps {
  incident: Incident | null;
  open: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Incident['status']) => void;
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({
  incident,
  open,
  onClose,
  onUpdateStatus,
}) => {
  if (!incident) return null;

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

  const TypeIcon = incident.type === 'accident' ? AlertTriangle : Heart;

  const getNextStatus = (): Incident['status'] | null => {
    switch (incident.status) {
      case 'new':
        return 'acknowledged';
      case 'acknowledged':
        return 'in_progress';
      case 'in_progress':
        return 'resolved';
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                incident.type === 'accident' ? 'bg-warning/10 text-warning' : 'bg-emergency/10 text-emergency'
              }`}>
                <TypeIcon className="w-4 h-4" />
              </div>
              Incident #{incident.id}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Severity */}
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[incident.status]}`}>
              {incident.status.replace('_', ' ').toUpperCase()}
            </span>
            <Badge className={severityColors[incident.severity]}>
              {incident.severity.toUpperCase()}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
            <p className="text-foreground">
              {incident.description || 'No description provided'}
            </p>
          </div>

          {/* Image */}
          {incident.imageUrl && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Photo Evidence</h4>
              <img
                src={incident.imageUrl}
                alt="Incident"
                className="w-full rounded-lg border border-border"
              />
            </div>
          )}

          {/* Location */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Location
            </h4>
            <p className="text-foreground">
              {incident.location.address || `${incident.location.lat.toFixed(6)}, ${incident.location.lng.toFixed(6)}`}
            </p>
            <div className="mt-2 h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm">
              Map integration coming soon
            </div>
          </div>

          {/* Reporter Info */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <User className="w-4 h-4" />
              Reported By
            </h4>
            <div className="space-y-1 text-foreground">
              {incident.reportedBy.name && <p>{incident.reportedBy.name}</p>}
              {incident.reportedBy.phone && (
                <p className="flex items-center gap-1 text-accent">
                  <Phone className="w-3 h-3" />
                  {incident.reportedBy.phone}
                </p>
              )}
              {!incident.reportedBy.name && !incident.reportedBy.phone && (
                <p className="text-muted-foreground">Anonymous report</p>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Timeline
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reported</span>
                <span className="text-foreground">{format(incident.createdAt, 'PPp')}</span>
              </div>
              {incident.acknowledgedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Acknowledged</span>
                  <span className="text-foreground">{format(incident.acknowledgedAt, 'PPp')}</span>
                </div>
              )}
              {incident.resolvedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resolved</span>
                  <span className="text-foreground">{format(incident.resolvedAt, 'PPp')}</span>
                </div>
              )}
              {incident.assignedTo && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assigned to</span>
                  <span className="text-foreground">{incident.assignedTo}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {nextStatus && (
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button
                variant="default"
                className="flex-1"
                onClick={() => onUpdateStatus(incident.id, nextStatus)}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as {nextStatus.replace('_', ' ')}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncidentDetail;
