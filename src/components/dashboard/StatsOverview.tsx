import React from 'react';
import { Incident } from '@/types/incident';
import { getIncidentStats } from '@/lib/mock-data';
import { AlertCircle, Clock, CheckCircle, Shield, Heart, TrendingUp } from 'lucide-react';

interface StatsOverviewProps {
  incidents: Incident[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ incidents }) => {
  const stats = getIncidentStats(incidents);

  const statCards = [
    {
      label: 'New Incidents',
      value: stats.byStatus.new,
      icon: AlertCircle,
      color: 'text-emergency',
      bgColor: 'bg-emergency/10',
    },
    {
      label: 'In Progress',
      value: stats.byStatus.acknowledged + stats.byStatus.in_progress,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      label: 'Resolved Today',
      value: stats.byStatus.resolved,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Total Reports',
      value: stats.total,
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3">{stat.label}</p>
        </div>
      ))}

      <div className="col-span-2 lg:col-span-4 grid grid-cols-2 gap-4 mt-2">
        <div className="bg-gradient-police rounded-xl p-4 text-primary-foreground">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <p className="text-2xl font-bold">{stats.byType.police}</p>
              <p className="text-sm opacity-80">Police Reports</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-ambulance rounded-xl p-4 text-emergency-foreground">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8" />
            <div>
              <p className="text-2xl font-bold">{stats.byType.ambulance}</p>
              <p className="text-sm opacity-80">Medical Reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
