import { Incident } from '@/types/incident';

export const mockIncidents: Incident[] = [
  {
    id: '1',
    type: 'accident',
    status: 'new',
    severity: 'critical',
    description: 'Multi-vehicle collision on NH-48, near Manesar toll plaza. Two trucks and a car involved.',
    imageUrl: '/placeholder.svg',
    location: {
      lat: 28.3595,
      lng: 76.9349,
      address: 'NH-48, Manesar Toll Plaza, Gurugram, Haryana',
    },
    reportedBy: {
      id: 'user1',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: '2',
    type: 'accident',
    status: 'acknowledged',
    severity: 'high',
    description: 'Bike skidded on wet road. Rider injured, conscious but unable to move.',
    imageUrl: '/placeholder.svg',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Bandra-Worli Sea Link, Mumbai, Maharashtra',
    },
    reportedBy: {
      id: 'user2',
      name: 'Priya Sharma',
      phone: '+91 87654 32109',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 5),
    assignedTo: 'Ambulance Unit 112-MH',
  },
  {
    id: '3',
    type: 'accident',
    status: 'in_progress',
    severity: 'high',
    description: 'Auto-rickshaw overturned after collision with bus. Multiple passengers injured.',
    imageUrl: '/placeholder.svg',
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'MG Road Metro Station, Bengaluru, Karnataka',
    },
    reportedBy: {
      id: 'user3',
      name: 'Vikram Reddy',
      phone: '+91 99887 76655',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 10),
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 12),
    assignedTo: 'Traffic Police Unit KA-03',
  },
  {
    id: '4',
    type: 'medical',
    status: 'in_progress',
    severity: 'critical',
    description: 'Pedestrian hit by speeding car near school zone. Victim unconscious.',
    imageUrl: '/placeholder.svg',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'Connaught Place, New Delhi',
    },
    reportedBy: {
      id: 'user4',
      name: 'Amit Singh',
      phone: '+91 98123 45678',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 12), // 12 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 8),
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 10),
    assignedTo: 'AIIMS Ambulance DL-108',
  },
  {
    id: '5',
    type: 'accident',
    status: 'new',
    severity: 'medium',
    description: 'Minor fender bender between two cars. No injuries reported.',
    imageUrl: '/placeholder.svg',
    location: {
      lat: 22.5726,
      lng: 88.3639,
      address: 'Park Street, Kolkata, West Bengal',
    },
    reportedBy: {
      id: 'user5',
      name: 'Suman Das',
      phone: '+91 90001 23456',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '6',
    type: 'accident',
    status: 'resolved',
    severity: 'high',
    description: 'Truck hit divider on expressway. Driver rescued safely.',
    imageUrl: '/placeholder.svg',
    location: {
      lat: 23.0225,
      lng: 72.5714,
      address: 'Ahmedabad-Vadodara Expressway, Gujarat',
    },
    reportedBy: {
      id: 'user6',
      name: 'Kiran Patel',
      phone: '+91 94567 89012',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 55),
    resolvedAt: new Date(Date.now() - 1000 * 60 * 30),
    assignedTo: 'Highway Patrol GJ-01',
  },
  {
    id: '7',
    type: 'medical',
    status: 'acknowledged',
    severity: 'critical',
    description: 'Head-on collision between bus and tempo. Multiple casualties reported.',
    imageUrl: '/placeholder.svg',
    location: {
      lat: 26.9124,
      lng: 75.7873,
      address: 'Jaipur-Delhi Highway NH-48, Rajasthan',
    },
    reportedBy: {
      id: 'user7',
      name: 'Mahesh Yadav',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 1),
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 1),
    assignedTo: 'SMS Hospital Ambulance RJ-108',
  },
  {
    id: '8',
    type: 'accident',
    status: 'new',
    severity: 'high',
    description: 'Car fell into roadside ditch during heavy rain. Passengers trapped inside.',
    imageUrl: '/placeholder.svg',
    location: {
      lat: 13.0827,
      lng: 80.2707,
      address: 'OMR Road, Chennai, Tamil Nadu',
    },
    reportedBy: {
      id: 'user8',
      name: 'Lakshmi Narayanan',
      phone: '+91 98411 22334',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 1),
  },
  {
    id: '9',
    type: 'accident',
    status: 'resolved',
    severity: 'medium',
    description: 'Two-wheeler collision with electric pole. Minor injuries to rider.',
    imageUrl: '/placeholder.svg',
    location: {
      lat: 17.3850,
      lng: 78.4867,
      address: 'Hitech City, Hyderabad, Telangana',
    },
    reportedBy: {
      id: 'user9',
      name: 'Venkat Rao',
      phone: '+91 99490 11223',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 20),
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 40),
    resolvedAt: new Date(Date.now() - 1000 * 60 * 20),
    assignedTo: 'Traffic Police TS-07',
  },
  {
    id: '10',
    type: 'medical',
    status: 'in_progress',
    severity: 'high',
    description: 'Elderly person injured in hit-and-run near market area.',
    imageUrl: '/placeholder.svg',
    location: {
      lat: 18.5204,
      lng: 73.8567,
      address: 'FC Road, Pune, Maharashtra',
    },
    reportedBy: {
      id: 'user10',
      name: 'Sneha Kulkarni',
      phone: '+91 98900 55667',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 6),
    acknowledgedAt: new Date(Date.now() - 1000 * 60 * 8),
    assignedTo: 'Sassoon Hospital Ambulance MH-108',
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
    accident: incidents.filter(i => i.type === 'accident').length,
    medical: incidents.filter(i => i.type === 'medical').length,
  };
  const bySeverity = {
    critical: incidents.filter(i => i.severity === 'critical').length,
    high: incidents.filter(i => i.severity === 'high').length,
    medium: incidents.filter(i => i.severity === 'medium').length,
    low: incidents.filter(i => i.severity === 'low').length,
  };

  return { total, byStatus, byType, bySeverity };
};
