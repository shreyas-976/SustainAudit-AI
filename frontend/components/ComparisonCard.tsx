'use client'

import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ComparisonCardProps {
  claims?: string[]
}

export default function ComparisonCard({ claims = [] }: ComparisonCardProps) {
  if (claims.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Product Comparison</CardTitle>
          <CardDescription>No comparison data available</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Comparison</CardTitle>
        <CardDescription>
          Sustainability claims detected in the product
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {claims.map((claim, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <span className="text-gray-700">{claim}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}