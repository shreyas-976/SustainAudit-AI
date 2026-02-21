'use client'

import { useState } from 'react'
import { toast } from "sonner"

import Sidebar from '@/components/Sidebar'
import ComparisonCard from '@/components/ComparisonCard'
import { getRandomAuditResult } from '@/lib/mockData'

export default function ComparePage() {

  const [urlA, setUrlA] = useState('')
  const [urlB, setUrlB] = useState('')
  const [loading, setLoading] = useState(false)

  const [resultA, setResultA] = useState<any>(null)
  const [resultB, setResultB] = useState<any>(null)

  const handleCompare = async () => {

    if (!urlA || !urlB) {
      toast.error("Enter two product URLs")
      return
    }

    setLoading(true)

    try {

      // simulate AI comparison
      await new Promise((r) => setTimeout(r, 1500))

      setResultA(getRandomAuditResult())
      setResultB(getRandomAuditResult())

      toast.success("Comparison ready")

    } catch {
      toast.error("Comparison failed")
    }

    setLoading(false)
  }

  return (

    <div className="flex h-screen bg-gray-50">

      <Sidebar />

      <main className="flex-1 overflow-auto">

        <div className="max-w-7xl mx-auto p-10">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
              Compare Products
            </h1>

            <p className="text-gray-600 mt-2">
              Compare sustainability claims between two brands or products.
            </p>
          </div>

          {/* Inputs */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">

            <input
              type="text"
              placeholder="Product URL A"
              value={urlA}
              onChange={(e) => setUrlA(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Product URL B"
              value={urlB}
              onChange={(e) => setUrlB(e.target.value)}
              className="border rounded-lg p-3"
            />

          </div>

          <button
            onClick={handleCompare}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg mb-8 hover:opacity-90"
          >
            {loading ? "Comparing..." : "Compare"}
          </button>

          {/* Empty State */}
          {!resultA && !loading && (
            <div className="text-center py-16 text-gray-500">
              Enter two product URLs to compare sustainability.
            </div>
          )}

          {/* Results */}
          {resultA && resultB && (

            <div className="grid lg:grid-cols-2 gap-6">

              <ComparisonCard claims={resultA.claims} />

              <ComparisonCard claims={resultB.claims} />

            </div>

          )}

        </div>

      </main>

    </div>
  )
}