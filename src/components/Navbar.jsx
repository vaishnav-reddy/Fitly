import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/results", label: "Results" },
  { path: "/gallery", label: "Gallery" },
  { path: "/chat", label: "Chat" },
  { path: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-brand-dark/95 backdrop-blur-md border-b border-brand-border shadow-card" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center text-brand-dark font-bold text-sm">F</div>
          <span className="font-display text-xl font-semibold tracking-wide text-white group-hover:text-brand-gold transition-colors">
            Fitly
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-all duration-200 relative group ${
                location.pathname === link.path ? "text-brand-gold" : "text-brand-muted hover:text-white"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold-gradient rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link to="/" className="hidden md:inline-flex btn-gold text-sm py-2 px-5">
            Get Styled
          </Link>
          <button
            className="md:hidden text-brand-muted hover:text-white transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-surface border-t border-brand-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-1 transition-colors ${
                location.pathname === link.path ? "text-brand-gold" : "text-brand-muted hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/" onClick={() => setMenuOpen(false)} className="btn-gold text-sm text-center mt-2">
            Get Styled
          </Link>
        </div>
      )}
    </nav>
  );
}
