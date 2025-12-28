import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ShieldIcon } from '@/components/icons/EmergencyIcons';
import EmergencyButtons from '@/components/report/EmergencyButtons';
import LocationCapture from '@/components/report/LocationCapture';
import ImageCapture from '@/components/report/ImageCapture';
import SafetyInstructions from '@/components/report/SafetyInstructions';
import { IncidentType, IncidentReport } from '@/types/incident';
import { ArrowLeft, Send, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

type ReportStep = 'select' | 'details' | 'submitting' | 'submitted';

const ReportEmergency: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ReportStep>('select');
  const [selectedType, setSelectedType] = useState<IncidentType | null>(null);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleTypeSelect = (type: IncidentType) => {
    setSelectedType(type);
    setStep('details');
  };

  const handleSubmit = async () => {
    if (!selectedType || !location) {
      toast.error('Please enable location access to submit a report');
      return;
    }

    setStep('submitting');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const report: IncidentReport = {
      type: selectedType,
      description: description || undefined,
      imageFile: imageFile || undefined,
      location,
    };

    console.log('Report submitted:', report);
    setStep('submitted');
    toast.success('Emergency reported successfully!');
  };

  const handleBack = () => {
    if (step === 'details') {
      setStep('select');
      setSelectedType(null);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <ShieldIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">SafeAlert</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {step === 'select' && (
          <div className="max-w-md mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                What type of emergency?
              </h1>
              <p className="text-muted-foreground">
                Select the appropriate service for your emergency
              </p>
            </div>
            <EmergencyButtons onSelect={handleTypeSelect} />
          </div>
        )}

        {step === 'details' && selectedType && (
          <div className="max-w-md mx-auto space-y-6 animate-slide-up">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {selectedType === 'police' ? 'Police Report' : 'Medical Emergency'}
              </h1>
              <p className="text-muted-foreground">
                Add details to help responders
              </p>
            </div>

            <LocationCapture onLocationCaptured={setLocation} />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                What happened? (optional)
              </label>
              <Textarea
                placeholder="Briefly describe the situation..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>

            <ImageCapture onImageCaptured={setImageFile} />

            <Button
              variant={selectedType === 'police' ? 'police' : 'ambulance'}
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              disabled={!location}
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Report
            </Button>
          </div>
        )}

        {step === 'submitting' && (
          <div className="max-w-md mx-auto text-center space-y-6 animate-fade-in py-16">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
              <Loader2 className="w-10 h-10 text-accent animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Sending your report...
              </h2>
              <p className="text-muted-foreground">
                Please stay where you are. Help is on the way.
              </p>
            </div>
          </div>
        )}

        {step === 'submitted' && selectedType && (
          <div className="max-w-md mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Report Submitted
                </h2>
                <p className="text-muted-foreground">
                  {selectedType === 'police'
                    ? 'Police have been notified and are responding.'
                    : 'Ambulance has been dispatched to your location.'}
                </p>
              </div>
            </div>

            <SafetyInstructions type={selectedType} />

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/')}
              >
                Return Home
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReportEmergency;
