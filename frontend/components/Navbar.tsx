export default function Navbar() {
  return (
    <div className="w-full border-b bg-white px-8 py-4 flex items-center justify-between">

      <div className="font-semibold text-lg">
        SustainAudit AI
      </div>

      <div className="flex gap-6 text-sm text-gray-600">
        <button>Dashboard</button>
        <button>Compare</button>
        <button>Watchlist</button>
      </div>

    </div>
  );
}