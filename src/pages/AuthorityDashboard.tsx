import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldIcon } from '@/components/icons/EmergencyIcons';
import StatsOverview from '@/components/dashboard/StatsOverview';
import IncidentCard from '@/components/dashboard/IncidentCard';
import IncidentFilters from '@/components/dashboard/IncidentFilters';
import IncidentDetail from '@/components/dashboard/IncidentDetail';
import { mockIncidents } from '@/lib/mock-data';
import { Incident, IncidentStatus, IncidentType } from '@/types/incident';
import { LogOut, RefreshCw, Bell } from 'lucide-react';
import { toast } from 'sonner';

const AuthorityDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<IncidentType | 'all'>('all');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredIncidents = incidents.filter((incident) => {
    if (statusFilter !== 'all' && incident.status !== statusFilter) return false;
    if (typeFilter !== 'all' && incident.type !== typeFilter) return false;
    return true;
  });

  const handleUpdateStatus = (id: string, newStatus: IncidentStatus) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === id
          ? {
              ...incident,
              status: newStatus,
              updatedAt: new Date(),
              acknowledgedAt:
                newStatus === 'acknowledged' ? new Date() : incident.acknowledgedAt,
              resolvedAt:
                newStatus === 'resolved' ? new Date() : incident.resolvedAt,
            }
          : incident
      )
    );
    toast.success(`Incident ${id} marked as ${newStatus.replace('_', ' ')}`);
    setDetailOpen(false);
  };

  const handleViewIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    setDetailOpen(true);
  };

  const handleRefresh = () => {
    toast.success('Dashboard refreshed');
  };

  const handleLogout = () => {
    navigate('/');
    toast.success('Logged out successfully');
  };

  const newIncidentsCount = incidents.filter((i) => i.status === 'new').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
                <ShieldIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">Quick Report</h1>
                <p className="text-xs text-muted-foreground">Authority Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                className="relative"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="relative"
              >
                <Bell className="w-4 h-4" />
                {newIncidentsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-emergency text-emergency-foreground text-xs rounded-full flex items-center justify-center font-medium">
                    {newIncidentsCount}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <section className="animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">Overview</h2>
          <StatsOverview incidents={incidents} />
        </section>

        {/* Filters */}
        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <IncidentFilters
            statusFilter={statusFilter}
            typeFilter={typeFilter}
            onStatusChange={setStatusFilter}
            onTypeChange={setTypeFilter}
          />
        </section>

        {/* Incidents List */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Incidents ({filteredIncidents.length})
            </h2>
          </div>

          {filteredIncidents.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <p className="text-muted-foreground">No incidents match your filters</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredIncidents
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((incident) => (
                  <IncidentCard
                    key={incident.id}
                    incident={incident}
                    onView={handleViewIncident}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
            </div>
          )}
        </section>
      </main>

      <IncidentDetail
        incident={selectedIncident}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default AuthorityDashboard;
