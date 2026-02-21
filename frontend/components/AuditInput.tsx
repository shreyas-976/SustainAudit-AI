'use client';

import React from 'react';
import { Search, Loader2, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AnalysisStage } from '@/types';

interface AuditInputProps {
  url: string;
  setUrl: (url: string) => void;
  isAnalyzing: boolean;
  analysisStage: AnalysisStage;
  onAudit: () => void;
}

export default function AuditInput({
  url,
  setUrl,
  isAnalyzing,
  analysisStage,
  onAudit,
}: AuditInputProps) {
  const isValidUrl = url.startsWith("http");

  return (
    <Card className="mb-8 bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200">
      <CardContent className="pt-6">
        
        {/* Input Row */}
        <div className="flex gap-3 items-center">

          {/* URL Input */}
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <Input
              type="url"
              placeholder="Paste product URL (Amazon, Brand site...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !isAnalyzing && isValidUrl && onAudit()
              }
              className="pl-10 h-12 text-base"
              disabled={isAnalyzing}
            />
          </div>

          {/* Audit Button */}
          <Button
            onClick={onAudit}
            disabled={isAnalyzing || !isValidUrl}
            className="h-12 px-8 bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-90 shadow-lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Audit
              </>
            )}
          </Button>
        </div>

        {/* AI Stage Indicator */}
        {isAnalyzing && analysisStage && (
          <div className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
              <p className="text-sm font-medium text-emerald-900">
                {analysisStage}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-pulse w-2/3"></div>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}