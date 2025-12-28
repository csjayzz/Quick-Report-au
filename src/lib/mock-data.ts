import { Incident } from '@/types/incident';

export const mockIncidents: Incident[] = [
  {
    id: '1',
    type: 'police',
    status: 'new',
    severity: 'high',
    description: 'Traffic accident on Main Street',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Main Street, New York, NY',
    },
    reportedBy: {
      id: 'user1',
      name: 'John Doe',
      phone: '+1 555-0123',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '2',
    type: 'ambulance',
    status: 'acknowledged',
    severity: 'critical',
    description: 'Person collapsed at park',
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: 'Central Park, New York, NY',
    },
    reportedBy: {
      id: 'user2',
      name: 'Jane Smith',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 10),
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 10),
    assignedTo: 'Unit 42',
  },
  {
    id: '3',
    type: 'police',
    status: 'in_progress',
    severity: 'medium',
    description: 'Suspicious activity reported',
    location: {
      lat: 40.7484,
      lng: -73.9857,
      address: '350 5th Avenue, New York, NY',
    },
    reportedBy: {
      id: 'user3',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 20),
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 25),
    assignedTo: 'Officer Johnson',
  },
  {
    id: '4',
    type: 'ambulance',
    status: 'resolved',
    severity: 'low',
    description: 'Minor injury at workplace',
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: '30 Rockefeller Plaza, New York, NY',
    },
    reportedBy: {
      id: 'user4',
      name: 'Bob Wilson',
      phone: '+1 555-0456',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60),
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
    resolvedAt: new Date(Date.now() - 1000 * 60 * 60),
    assignedTo: 'EMT Unit 7',
  },
  {
    id: '5',
    type: 'police',
    status: 'new',
    severity: 'high',
    description: 'Break-in reported at store',
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: '151 W 34th Street, New York, NY',
    },
    reportedBy: {
      id: 'user5',
      name: 'Store Manager',
      phone: '+1 555-0789',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 2),
  },
];

export const getIncidentStats = (incidents: Incident[]) => {
  const total = incidents.length;
  const byStatus = {
    new: incidents.filter(i => i.status === 'new').length,
    acknowledged: incidents.filter(i => i.status === 'acknowledged').length,
    in_progress: incidents.filter(i => i.status === 'in_progress').length,
    resolved: incidents.filter(i => i.status === 'resolved').length,
  };
  const byType = {
    police: incidents.filter(i => i.type === 'police').length,
    ambulance: incidents.filter(i => i.type === 'ambulance').length,
  };
  const bySeverity = {
    critical: incidents.filter(i => i.severity === 'critical').length,
    high: incidents.filter(i => i.severity === 'high').length,
    medium: incidents.filter(i => i.severity === 'medium').length,
    low: incidents.filter(i => i.severity === 'low').length,
  };

  return { total, byStatus, byType, bySeverity };
};
