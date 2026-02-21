import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/* Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* Score text color */
export function getScoreColor(score: number): string {
  if (score >= 75) return "text-green-600"
  if (score >= 50) return "text-yellow-600"
  return "text-red-600"
}

/* Score background color */
export function getScoreBgColor(score: number): string {
  if (score >= 75) return "bg-green-600"
  if (score >= 50) return "bg-yellow-600"
  return "bg-red-600"
}

/* Claim severity color (for badges/buttons) */
export function getSeverityColor(
  severity: "HIGH" | "MEDIUM" | "LOW"
): string {
  switch (severity) {
    case "HIGH":
      return "destructive"
    case "MEDIUM":
      return "default"
    case "LOW":
      return "secondary"
    default:
      return "default"
  }
}

/* Claim severity background */
export function getSeverityBgColor(
  severity: "HIGH" | "MEDIUM" | "LOW"
): string {
  switch (severity) {
    case "HIGH":
      return "bg-red-100 text-red-800"
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800"
    case "LOW":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}