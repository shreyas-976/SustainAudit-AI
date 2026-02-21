'use client'

import { CheckCircle2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

interface ClaimsCardProps {
  claims?: string[]
}

export default function ClaimsCard({ claims = [] }: ClaimsCardProps) {

  if (claims.length === 0) {
    return (
      <Card className="shadow-lg border bg-white">
        <CardHeader>
          <CardTitle>Key Claims Detected</CardTitle>
          <CardDescription>No sustainability claims found</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg border bg-white">
      <CardHeader>
        <CardTitle>Key Claims Detected</CardTitle>
        <CardDescription>
          Sustainability statements found in the product listing
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {claims.map((claim, index) => (
            <li
              key={index}
             className="flex items-start gap-3 text-sm p-2 rounded-lg hover:bg-gray-50"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <span className="text-gray-700">{claim}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}