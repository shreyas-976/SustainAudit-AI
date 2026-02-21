import { mockWatchlist } from "@/lib/mockData"

export default function WatchlistPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Watchlist</h1>

      {mockWatchlist.map(item => (
        <div key={item.name} className="p-4 border rounded-lg mb-4">
          {item.name} — {item.score}
        </div>
      ))}
    </main>
  )
}