import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldIcon, AlertIcon } from '@/components/icons/EmergencyIcons';
import { useNavigate } from 'react-router-dom';
import { Shield, Phone, Clock, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 pt-20 pb-16">
        {/* Header */}
        <header className="flex items-center justify-between mb-16 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <ShieldIcon className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SafeAlert</h1>
              <p className="text-xs text-muted-foreground">Emergency Response System</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/authority/login')}
            className="hidden sm:flex"
          >
            Authority Login
          </Button>
        </header>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emergency/10 text-emergency text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emergency"></span>
              </span>
              24/7 Emergency Response
            </span>
          </div>

          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            Report Emergencies
            <br />
            <span className="text-gradient-primary">Faster Than Ever</span>
          </h2>

          <p 
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            One tap to alert authorities. Your location, image, and report sent instantly. 
            Help arrives faster when every second counts.
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate('/report')}
              className="group"
            >
              <AlertIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              Report Emergency
            </Button>
            <Button
              variant="hero-outline"
              size="xl"
              onClick={() => navigate('/authority/login')}
            >
              Authority Dashboard
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20 animate-slide-up"
          style={{ animationDelay: '0.5s' }}
        >
          {[
            { icon: Clock, label: 'Avg Response', value: '< 3 min' },
            { icon: Shield, label: 'Reports Today', value: '247' },
            { icon: Users, label: 'Active Units', value: '89' },
            { icon: Phone, label: 'Resolved', value: '98.5%' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-6 shadow-md border border-border/50 text-center hover:shadow-lg transition-shadow"
            >
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div 
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20 animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          {[
            {
              title: 'Instant Location',
              description: 'GPS coordinates captured automatically. No need to describe where you are.',
              icon: '📍',
            },
            {
              title: 'Photo Evidence',
              description: 'Capture and send images directly to authorities for faster assessment.',
              icon: '📸',
            },
            {
              title: 'Real-time Updates',
              description: 'Track response status and receive AI-powered safety instructions.',
              icon: '⚡',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-8 shadow-md border border-border/50 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
