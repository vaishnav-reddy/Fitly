import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const colorMap = {
  black: "#1a1a1a", white: "#f5f5f5", navy: "#1e3a5f", beige: "#d4b896",
  burgundy: "#6d1a2a", olive: "#6b7c3a", camel: "#c19a6b", grey: "#9e9e9e",
  gray: "#9e9e9e", cream: "#fffdd0", brown: "#795548", blue: "#1565c0",
  green: "#2e7d32", red: "#c62828", pink: "#e91e8c", purple: "#6a1b9a",
  orange: "#e65100", yellow: "#f9a825", teal: "#00695c", gold: "#C9A84C",
};

const getColorSwatch = (name) => {
  const key = name?.toLowerCase().split(" ").find((w) => colorMap[w]);
  return key ? colorMap[key] : null;
};

const Section = ({ title, icon, items }) => (
  <div className="card p-6 hover:border-brand-border/80 transition-colors">
    <div className="flex items-center gap-2.5 mb-4">
      <span className="text-xl">{icon}</span>
      <h3 className="font-semibold text-white">{title}</h3>
    </div>
    <ul className="space-y-2.5">
      {items?.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-brand-muted leading-relaxed">
          <span className="text-brand-gold mt-1 shrink-0">â€º</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function Results() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("analysis");
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-brand-dark">
        <div className="w-16 h-16 rounded-2xl bg-brand-card border border-brand-border flex items-center justify-center text-3xl">
          ðŸ“‹
        </div>
        <p className="text-white font-semibold text-lg">No analysis found yet</p>
        <p className="text-brand-muted text-sm">Upload a photo to get your personalized style report</p>
        <Link to="/" className="btn-gold mt-2">Upload a Photo</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="section-label mb-1 block">Your Report</span>
            <h1 className="font-display text-3xl font-bold text-white">Style Analysis</h1>
          </div>
          <Link to="/" className="btn-outline text-sm py-2 px-4">
            + New Analysis
          </Link>
        </div>

        {/* Summary Banner */}
        {data.summary && (
          <div className="relative card p-6 mb-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient" />
            <span className="section-label mb-2 block">Style Summary</span>
            <p className="text-white leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Body Shape", value: data.bodyShape, icon: "ðŸ‘¤" },
            { label: "Skin Tone", value: data.skinTone, icon: "ðŸŽ¨" },
            { label: "Face Shape", value: data.faceShape, icon: "ðŸ’Ž" },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 text-center hover:border-brand-gold/30 transition-colors">
              <span className="text-2xl block mb-2">{stat.icon}</span>
              <p className="text-xs text-brand-muted mb-1">{stat.label}</p>
              <p className="font-semibold text-white text-sm">{stat.value || "â€”"}</p>
            </div>
          ))}
        </div>

        {/* Color Palette */}
        {data.colorPalette?.length > 0 && (
          <div className="card p-6 mb-6">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-xl">ðŸŽ¨</span>
              <h3 className="font-semibold text-white">Your Color Palette</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {data.colorPalette.map((color) => {
                const swatch = getColorSwatch(color);
                return (
                  <div key={color} className="flex items-center gap-2 bg-brand-surface border border-brand-border rounded-xl px-3 py-2">
                    {swatch && (
                      <div className="w-4 h-4 rounded-full border border-white/10 shrink-0" style={{ backgroundColor: swatch }} />
                    )}
                    <span className="text-sm text-white font-medium">{color}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Outfit & Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Section title="Formal Outfits" icon="ðŸ‘”" items={data.formalOutfits} />
          <Section title="Casual Outfits" icon="ðŸ‘•" items={data.casualOutfits} />
          <Section title="Accessories" icon="ðŸ’" items={data.accessories} />
          <Section title="Grooming Tips" icon="âœ‚ï¸" items={data.groomingTips} />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link to="/gallery" className="flex-1 btn-outline text-center text-sm py-3">
            View History
          </Link>
          <Link to="/chat" className="flex-1 btn-gold text-center text-sm py-3">
            Ask Style Questions
          </Link>
        </div>
      </div>
    </div>
  );
}
