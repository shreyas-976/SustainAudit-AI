'use client';

import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Shield, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EvidenceSource } from '@/types';

interface EvidencePanelProps {
  evidence: EvidenceSource[] | null;
}

export default function EvidencePanel({ evidence }: EvidencePanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Valid':
        return <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />;
      case 'Invalid':
        return <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />;
      case 'Questionable':
        return <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />;
      default:
        return null;
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Valid':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Invalid':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'Questionable':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default:
        return '';
    }
  };

  return (
    <aside className="w-80 bg-white/80 backdrop-blur-xlborder-l border-gray-200 overflow-auto">
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Evidence Sources</h3>
        
        {evidence ? (
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-3">
              {evidence.map((source, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-semibold text-gray-900 flex-1">
                        {source.name}
                      </h4>
                      {getStatusIcon(source.status)}
                    </div>
                    <Badge className={getBadgeVariant(source.status)}>
                      {source.status}
                    </Badge>
                    {source.url && (
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-2 text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        View source <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              Run an audit to see evidence sources
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}