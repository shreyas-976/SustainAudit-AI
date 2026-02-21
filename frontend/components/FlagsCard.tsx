'use client';

import React from 'react';
import { AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GreenwashingFlag } from '@/types';

interface FlagsCardProps {
  flags: GreenwashingFlag[];
}

export default function FlagsCard({ flags }: FlagsCardProps) {
  const getIcon = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'MEDIUM':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'LOW':
        return <Clock className="w-5 h-5 text-gray-600" />;
      default:
        return null;
    }
  };

  const getBadgeClass = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'LOW':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return '';
    }
  };

  if (!flags || flags.length === 0) return null;

  return (
    <Card className="shadow-lg border bg-white">
      <CardHeader>
        <CardTitle>Greenwashing Flags</CardTitle>
        <CardDescription>
          Potential issues detected by AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {flags.map((flag, index) => (
            <div 
              key={index} 
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                {getIcon(flag.severity)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getBadgeClass(flag.severity)}>
                      {flag.severity}
                    </Badge>
                    <h4 className="font-semibold text-gray-900">{flag.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{flag.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}