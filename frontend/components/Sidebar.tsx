'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  TrendingUp,
  AlertTriangle,
  TrendingDown,
  Minus,
  Shield
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { mockWatchlist } from "@/lib/mockData"
import { getScoreColor } from "@/lib/utils"

export default function Sidebar() {

  const pathname = usePathname()

  const navItem =
    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"

  const active =
    "bg-emerald-50 text-emerald-700"

  const inactive =
    "text-gray-600 hover:bg-gray-100"

  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col h-screen">

      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="w-8 h-8 text-emerald-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              SustainAudit
            </h1>
            <p className="text-xs text-emerald-600">
              AI
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">

          <Link
            href="/"
            className={`${navItem} ${pathname === "/" ? active : inactive}`}
          >
            <Search className="w-4 h-4" />
            Dashboard
          </Link>

          <Link
            href="/compare"
            className={`${navItem} ${pathname === "/compare" ? active : inactive}`}
          >
            <TrendingUp className="w-4 h-4" />
            Compare
          </Link>

          <Link
            href="/watchlist"
            className={`${navItem} ${pathname === "/watchlist" ? active : inactive}`}
          >
            <AlertTriangle className="w-4 h-4" />
            Watchlist
          </Link>

        </nav>
      </div>

      <Separator />

      {/* Watchlist */}
      <div className="p-6 flex-1 overflow-y-auto">

        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Watchlist
        </h3>

        <div className="space-y-2">

          {mockWatchlist.map((item) => (

            <div
              key={item.name}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >

              <div>
                <p className="text-sm font-medium text-gray-900">
                  {item.name}
                </p>

                <div className="flex items-center gap-1 mt-1">

                  <span
                    className={`text-xs font-semibold ${getScoreColor(item.score)}`}
                  >
                    {item.score}
                  </span>

                  {item.trend === "up" && (
                    <TrendingUp className="w-3 h-3 text-green-600" />
                  )}

                  {item.trend === "down" && (
                    <TrendingDown className="w-3 h-3 text-red-600" />
                  )}

                  {item.trend === "stable" && (
                    <Minus className="w-3 h-3 text-gray-400" />
                  )}

                </div>
              </div>

            </div>

          ))}

        </div>

      </div>

    </aside>
  )
}