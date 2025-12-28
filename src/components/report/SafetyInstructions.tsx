import React from 'react';
import { IncidentType } from '@/types/incident';
import { AlertTriangle, CheckCircle, Shield, Heart } from 'lucide-react';

interface SafetyInstructionsProps {
  type: IncidentType;
}

const SafetyInstructions: React.FC<SafetyInstructionsProps> = ({ type }) => {
  const policeInstructions = [
    'Move to a safe location if possible',
    'Do not confront any suspects',
    'Note any vehicle details or descriptions',
    'Stay on the line if emergency services call back',
    'Keep doors locked if in a vehicle',
  ];

  const ambulanceInstructions = [
    'Check if the scene is safe before approaching',
    'If victim is unconscious, check for breathing',
    'Do not move the person unless absolutely necessary',
    'Apply pressure to any bleeding wounds',
    'Stay calm and wait for emergency services',
    'If trained, begin CPR if no pulse is detected',
  ];

  const instructions = type === 'police' ? policeInstructions : ambulanceInstructions;
  const Icon = type === 'police' ? Shield : Heart;
  const title = type === 'police' ? 'Police Safety Tips' : 'Medical Safety Tips';

  return (
    <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          type === 'police' ? 'bg-primary/10 text-primary' : 'bg-emergency/10 text-emergency'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">AI-generated guidance while you wait</p>
        </div>
      </div>

      <div className="space-y-3">
        {instructions.map((instruction, index) => (
          <div
            key={index}
            className="flex items-start gap-3 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">{instruction}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-warning/10 rounded-xl border border-warning/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Important</p>
            <p className="text-xs text-muted-foreground mt-1">
              These tips are for guidance only. Follow instructions from emergency services when they arrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyInstructions;
