export interface WatchlistItem {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
}

export interface AuditResult {
  score: number;
  confidence: number;
  claims: string[];
  flags: GreenwashingFlag[];
  evidence: EvidenceSource[];
}

export interface GreenwashingFlag {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
}

export interface EvidenceSource {
  name: string;
  status: 'Valid' | 'Invalid' | 'Questionable';
  url: string | null;
}

export interface ComparisonProduct {
  name: string;
  score: number;
  claims: number;
  flags: number;
}

export type AnalysisStage = string