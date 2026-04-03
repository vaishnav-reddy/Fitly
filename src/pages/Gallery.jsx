import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "https://fitly-bcknd.onrender.com";

export default function Gallery() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/history`);
      setHistory(res.data.history || []);
    } catch {
      setError("Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this analysis?")) return;
    try {
      await axios.delete(`${API_BASE}/history/${id}`);
      setHistory((prev) => prev.filter((h) => h.id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  const loadToResults = (result) => {
    localStorage.setItem("analysis", JSON.stringify(result));
    navigate("/results");
  };

  useEffect(() => { fetchHistory(); }, []);

  if (loading) return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-brand-muted text-sm">Loading history...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="section-label mb-1 block">Your Analyses</span>
            <h1 className="font-display text-3xl font-bold text-white">History</h1>
          </div>
          <Link to="/" className="btn-gold text-sm py-2.5 px-5">
            + New Analysis
          </Link>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {history.length === 0 ? (
          <div className="card flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center text-3xl mb-4">
              ðŸ“‚
            </div>
            <p className="text-white font-semibold text-lg mb-2">No analyses yet</p>
            <p className="text-brand-muted text-sm mb-6">Upload your first photo to get started</p>
            <Link to="/" className="btn-gold text-sm">Upload a Photo</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((entry) => (
              <div
                key={entry.id}
                onClick={() => loadToResults(entry.result)}
                className="card p-5 cursor-pointer hover:border-brand-gold/30 hover:shadow-gold-sm transition-all duration-300 group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">{entry.filename}</p>
                    <p className="text-xs text-brand-muted mt-0.5">
                      {new Date(entry.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, entry.id)}
                    className="ml-2 p-1.5 rounded-lg text-brand-muted hover:text-red-400 hover:bg-red-400/10 transition-all"
                    aria-label="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  {[
                    ["Body Shape", entry.result?.bodyShape],
                    ["Skin Tone", entry.result?.skinTone],
                    ["Face Shape", entry.result?.faceShape],
                  ].filter(([, v]) => v).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-xs text-brand-muted">{k}</span>
                      <span className="text-xs font-medium text-white bg-brand-surface border border-brand-border px-2 py-0.5 rounded-full">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-brand-gold group-hover:text-brand-gold-light transition-colors font-medium">
                  <span>View full report</span>
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
