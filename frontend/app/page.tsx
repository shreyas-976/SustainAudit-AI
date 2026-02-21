'use client'

import { useState } from 'react'
import { toast } from "sonner"

import Sidebar from '@/components/Sidebar'
import AuditInput from '@/components/AuditInput'
import ScoreCard from '@/components/ScoreCard'
import ClaimsCard from '@/components/ClaimsCard'
import FlagsCard from '@/components/FlagsCard'
import ComparisonCard from '@/components/ComparisonCard'
import EvidencePanel from '@/components/EvidencePanel'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import ThemeToggle from '@/components/ThemeToggle'

import { getRandomAuditResult } from '@/lib/mockData'
import { AuditResult, AnalysisStage } from '@/types'

export default function Home() {

  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStage, setAnalysisStage] = useState<AnalysisStage>('')

  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState('')

  const isValidUrl = (value: string) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  const handleAudit = async () => {

    if (!url) {
      toast.error("Please enter a URL")
      return
    }

    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL")
      return
    }

    setIsAnalyzing(true)
    setResult(null)
    setError('')

    try {

      setAnalysisStage('Planning: Extracting claims and certifications...')
      await new Promise((r) => setTimeout(r, 1200))

      setAnalysisStage('Execution: Verifying sustainability databases...')
      await new Promise((r) => setTimeout(r, 1200))

      setAnalysisStage('Execution: Checking third-party evidence...')
      await new Promise((r) => setTimeout(r, 1200))

      setAnalysisStage('Finalizing AI audit report...')
      await new Promise((r) => setTimeout(r, 1000))

      const auditResult = getRandomAuditResult()
      setResult(auditResult)

      toast.success("Audit Completed")
      setAnalysisStage('')

    } catch (err) {

      console.error('Audit failed', err)
      setError('Failed to analyze URL')
      toast.error("Audit Failed")
      setAnalysisStage('')

    } finally {
      setIsAnalyzing(false)
    }
  }

  return (

    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-black">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">

          {/* Header */}
          <div className="mb-10 flex items-start justify-between">

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Audit a Product or Brand
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Enter a product URL to verify sustainability claims and detect greenwashing.
              </p>
            </div>

            <ThemeToggle />

          </div>

          {/* Input */}
          <AuditInput
            url={url}
            setUrl={setUrl}
            isAnalyzing={isAnalyzing}
            analysisStage={analysisStage}
            onAudit={handleAudit}
          />

          {/* Error */}
          {error && (
            <div className="mb-6 text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Loading */}
          {isAnalyzing && <LoadingSkeleton />}

          {/* Empty */}
          {!result && !isAnalyzing && !error && (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              Paste a product URL to start analysis
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6 mt-6">

              <ScoreCard
                score={result.score}
                confidence={result.confidence}
              />

              <ClaimsCard
                claims={result?.claims ?? []}
              />

              <FlagsCard
                flags={result.flags}
              />

              <ComparisonCard
                claims={result?.claims ?? []}
              />

            </div>
          )}

        </div>

      </main>

      {/* Evidence Panel */}
      <EvidencePanel evidence={result?.evidence ?? null} />

    </div>
  )
}