'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getScoreColor } from '@/lib/utils';

interface ScoreCardProps {
  score: number;
  confidence: number;
}

export default function ScoreCard({ score, confidence }: ScoreCardProps) {
  return (
    <Card className="shadow-lg border bg-white">
      <CardHeader>
        <CardTitle>Sustainability Score</CardTitle>
        <CardDescription>
          Overall assessment based on claims verification and evidence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                {score}
              </span>
              <span className="text-gray-500">/100</span>
            </div>
            <Progress value={score} className="h-3" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              Confidence: <strong>{confidence}%</strong>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}