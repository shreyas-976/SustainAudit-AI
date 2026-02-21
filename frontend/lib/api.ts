export interface AuditRequest {
  url: string
}

export interface AuditResponse {
  score: number
  confidence: number
  claims: string[]
  flags: {
    label: string
    severity: "HIGH" | "MEDIUM" | "LOW"
  }[]
  evidence: {
    source: string
    status: "valid" | "invalid" | "questionable"
    url: string
  }[]
}

export async function runAudit(url: string): Promise<AuditResponse> {
  const res = await fetch("http://localhost:8000/audit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url })
  })

  if (!res.ok) {
    throw new Error("Audit failed")
  }

  return res.json()
}