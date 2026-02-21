import { AuditResult, WatchlistItem, ComparisonProduct } from '@/types';

export const mockWatchlist: WatchlistItem[] = [
  { name: 'GreenFit', score: 63, trend: 'down' },
  { name: 'Patagonia', score: 82, trend: 'up' },
  { name: 'EcoWear', score: 75, trend: 'stable' },
];

export const mockComparison: ComparisonProduct[] = [
  { name: 'EcoWear Organic Tee', score: 82, claims: 5, flags: 1 },
  { name: 'FastFashion Basic Tee', score: 34, claims: 3, flags: 4 },
];

export const mockAuditResults: AuditResult[] = [
  {
    score: 72,
    confidence: 87,
    claims: [
      '100% organic cotton sourcing',
      'Carbon neutral shipping since 2023',
      'Fair trade certified workforce',
      'Recyclable packaging materials',
      'Water-efficient manufacturing process'
    ],
    flags: [
      {
        severity: 'HIGH',
        title: 'Unverified Carbon Claim',
        description: 'Carbon neutrality claim has no third-party verification from recognized standards bodies'
      },
      {
        severity: 'MEDIUM',
        title: 'Vague Packaging Language',
        description: 'Recyclable packaging claim lacks specifics about materials and actual recycling rates'
      },
      {
        severity: 'LOW',
        title: 'Outdated Certification',
        description: 'Fair trade certification is valid but nearing renewal date'
      }
    ],
    evidence: [
      {
        name: 'GOTS Certification Database',
        status: 'Valid',
        url: 'https://global-standard.org'
      },
      {
        name: 'Carbon Trust Registry',
        status: 'Invalid',
        url: null
      },
      {
        name: 'Fair Trade International',
        status: 'Valid',
        url: 'https://www.fairtrade.net'
      },
      {
        name: 'Company Press Release',
        status: 'Questionable',
        url: null
      },
      {
        name: 'Environmental NGO Report',
        status: 'Valid',
        url: 'https://example.org'
      }
    ]
  },
  {
    score: 45,
    confidence: 92,
    claims: [
      'Eco-friendly materials',
      'Sustainable production',
      'Green manufacturing'
    ],
    flags: [
      {
        severity: 'HIGH',
        title: 'Vague Sustainability Claims',
        description: 'Terms like "eco-friendly" and "sustainable" lack specific, measurable criteria'
      },
      {
        severity: 'HIGH',
        title: 'No Third-Party Certifications',
        description: 'No recognized environmental certifications found'
      },
      {
        severity: 'MEDIUM',
        title: 'Missing Supply Chain Data',
        description: 'No transparency about sourcing or manufacturing locations'
      }
    ],
    evidence: [
      {
        name: 'EPA Database',
        status: 'Invalid',
        url: null
      },
      {
        name: 'Marketing Materials Only',
        status: 'Questionable',
        url: null
      }
    ]
  },
  {
    score: 88,
    confidence: 95,
    claims: [
      'B Corp certified',
      'Climate neutral certified',
      '1% for the Planet member',
      'Organic content standard verified',
      'Bluesign approved fabrics'
    ],
    flags: [
      {
        severity: 'LOW',
        title: 'Minor Documentation Gap',
        description: 'Some sustainability reports are from previous year, awaiting current year update'
      }
    ],
    evidence: [
      {
        name: 'B Corp Certification',
        status: 'Valid',
        url: 'https://www.bcorporation.net'
      },
      {
        name: 'Climate Neutral Registry',
        status: 'Valid',
        url: 'https://www.climateneutral.org'
      },
      {
        name: '1% for the Planet',
        status: 'Valid',
        url: 'https://www.onepercentfortheplanet.org'
      },
      {
        name: 'Textile Exchange',
        status: 'Valid',
        url: 'https://textileexchange.org'
      },
      {
        name: 'Bluesign Technologies',
        status: 'Valid',
        url: 'https://www.bluesign.com'
      }
    ]
  }
];

export const getRandomAuditResult = (): AuditResult => {
  return mockAuditResults[Math.floor(Math.random() * mockAuditResults.length)];
};