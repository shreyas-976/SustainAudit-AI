'use client'

import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 mt-6">

      {/* Score Card */}
      <div className="p-6 bg-white rounded-xl border shadow-sm space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-3 w-full" />
      </div>

      {/* Claims */}
      <div className="p-6 bg-white rounded-xl border shadow-sm space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Flags */}
      <div className="p-6 bg-white rounded-xl border shadow-sm space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

    </div>
  )
}