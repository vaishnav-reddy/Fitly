import React from "react";
import ImageUpload from "../components/ImageUpload";
import { Link } from "react-router-dom";

const steps = [
  {
    num: "01",
    title: "Upload a Photo",
    desc: "Take or upload a clear full-body or portrait photo for best results.",
  },
  {
    num: "02",
    title: "AI Analysis",
    desc: "Gemini Vision AI analyzes your body shape, skin tone, and facial features.",
  },
  {
    num: "03",
    title: "Get Your Style",
    desc: "Receive a personalized style report with outfits, colors, and accessory tips.",
  },
];

const features = [
  { icon: "ðŸŽ¨", label: "Color Palette" },
  { icon: "ðŸ‘”", label: "Formal Outfits" },
  { icon: "ðŸ‘•", label: "Casual Looks" },
  { icon: "ðŸ’", label: "Accessories" },
  { icon: "âœ‚ï¸", label: "Grooming Tips" },
  { icon: "ðŸ’¬", label: "AI Chat Stylist" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left â€” Copy */}
          <div>
            <span className="section-label mb-4 block">AI-Powered Fashion Stylist</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
              Discover Your{" "}
              <span className="gold-text">Perfect</span>
              <br />Personal Style
            </h1>
            <p className="text-brand-muted text-lg leading-relaxed mb-8 max-w-md">
              Upload a photo and let our AI analyze your unique features to deliver a tailored style report â€” outfits, colors, and more.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {features.map((f) => (
                <span key={f.label} className="flex items-center gap-1.5 text-xs font-medium text-brand-muted border border-brand-border px-3 py-1.5 rounded-full bg-brand-surface">
                  <span>{f.icon}</span> {f.label}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link to="/gallery" className="btn-outline text-sm py-2.5 px-5">
                View History
              </Link>
              <Link to="/chat" className="text-sm text-brand-muted hover:text-brand-gold transition-colors flex items-center gap-1.5">
                Chat with AI
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right â€” Upload Card */}
          <div className="card p-8 shadow-gold">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-sm text-brand-muted font-medium">Ready to analyze</span>
            </div>
            <ImageUpload />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <span className="section-label mb-3 block">The Process</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="card p-8 group hover:border-brand-gold/30 hover:shadow-gold-sm transition-all duration-300">
              <span className="font-display text-5xl font-bold text-brand-border group-hover:text-brand-gold/20 transition-colors block mb-4">
                {step.num}
              </span>
              <h3 className="font-semibold text-white text-lg mb-2">{step.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gold-gradient flex items-center justify-center text-brand-dark font-bold text-xs">F</div>
            <span className="font-display font-semibold text-white">Fitly</span>
          </div>
          <p className="text-xs text-brand-muted">Powered by Google Gemini AI Â· Built with React & Node.js</p>
        </div>
      </footer>
    </div>
  );
}
