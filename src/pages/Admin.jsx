import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://fitly-bcknd.onrender.com";

const StatCard = ({ label, value, icon, sub }) => (
  <div className="card p-5 hover:border-brand-gold/30 transition-all duration-300">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-xl">
        {icon}
      </div>
    </div>
    <p className="text-2xl font-bold text-white mb-0.5">{value ?? "â€”"}</p>
    <p className="text-sm text-brand-muted">{label}</p>
    {sub && <p className="text-xs text-brand-gold mt-1">{sub}</p>}
  </div>
);

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API_BASE}/admin/stats`)
      .then((res) => setStats(res.data))
      .catch(() => setError("Failed to load stats."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-brand-muted text-sm">Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span className="section-label mb-1 block">Overview</span>
          <h1 className="font-display text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {stats && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Analyses" value={stats.totalAnalyses} icon="ðŸ“Š" />
              <StatCard label="Today" value={stats.todayAnalyses} icon="ðŸ“…" sub="analyses today" />
              <StatCard label="Body Shapes" value={Object.keys(stats.bodyShapeDistribution || {}).length} icon="ðŸ‘¤" sub="unique types" />
              <StatCard label="API Status" value="Live" icon="ðŸŸ¢" sub="All systems normal" />
            </div>

            {/* Body Shape Distribution */}
            {Object.keys(stats.bodyShapeDistribution || {}).length > 0 && (
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="text-lg">ðŸ“ˆ</span>
                  <h2 className="font-semibold text-white">Body Shape Distribution</h2>
                </div>
                <div className="space-y-4">
                  {Object.entries(stats.bodyShapeDistribution).map(([shape, count]) => {
                    const pct = Math.round((count / stats.totalAnalyses) * 100);
                    return (
                      <div key={shape}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-white font-medium">{shape}</span>
                          <span className="text-brand-muted">{count} <span className="text-brand-gold">({pct}%)</span></span>
                        </div>
                        <div className="w-full bg-brand-surface rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-1.5 rounded-full bg-gold-gradient transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent Activity Table */}
            {stats.recentActivity?.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="text-lg">ðŸ•</span>
                  <h2 className="font-semibold text-white">Recent Activity</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-brand-border">
                        <th className="pb-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">File</th>
                        <th className="pb-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">Body Shape</th>
                        <th className="pb-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">Skin Tone</th>
                        <th className="pb-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {stats.recentActivity.map((entry) => (
                        <tr key={entry.id} className="hover:bg-brand-surface/50 transition-colors">
                          <td className="py-3 text-white font-medium max-w-[140px] truncate">{entry.filename}</td>
                          <td className="py-3">
                            <span className="text-xs bg-brand-surface border border-brand-border text-white px-2 py-1 rounded-full">
                              {entry.result?.bodyShape || "â€”"}
                            </span>
                          </td>
                          <td className="py-3 text-brand-muted">{entry.result?.skinTone || "â€”"}</td>
                          <td className="py-3 text-brand-muted text-xs">
                            {new Date(entry.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
