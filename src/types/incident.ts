export type IncidentType = 'accident' | 'medical';

export type IncidentStatus = 'new' | 'acknowledged' | 'in_progress' | 'resolved';

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Incident {
  id: string;
  type: IncidentType;
  status: IncidentStatus;
  severity: IncidentSeverity;
  description?: string;
  imageUrl?: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  reportedBy: {
    id: string;
    name?: string;
    phone?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
  assignedTo?: string;
  notes?: string[];
}

export interface IncidentReport {
  type: IncidentType;
  description?: string;
  imageFile?: File;
  location: {
    lat: number;
    lng: number;
  };
}
