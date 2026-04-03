import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://fitly-bcknd.onrender.com";

const SUGGESTIONS = [
  "What colors suit a warm skin tone?",
  "How to dress for a job interview?",
  "Outfits for a rectangle body shape?",
  "Tips for accessorizing minimalist looks?",
];

function MessageText({ text }) {
  return (
    <div className="space-y-1">
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return null;
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-sm leading-relaxed">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </p>
        );
      })}
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi, I am Fitly your personal AI stylist. Ask me anything about fashion, outfits, or color matching." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text) {
    const msg = (text !== undefined ? text : input).trim();
    if (!msg || loading) return;
    setInput("");
    const updated = [...messages, { role: "user", text: msg }];
    setMessages(updated);
    setLoading(true);
    try {
      const history = updated.slice(1).map((m) => ({ role: m.role, text: m.text }));
      const res = await axios.post(API_BASE + "/chat", { message: msg, history });
      setMessages([...updated, { role: "model", text: res.data.reply }]);
    } catch {
      setMessages([...updated, { role: "model", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.focus();
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col pt-20">
      <div className="max-w-3xl w-full mx-auto flex flex-col px-4 py-6" style={{ height: "calc(100vh - 80px)" }}>
        <div className="flex items-center gap-3 mb-6 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center text-brand-dark font-bold text-sm">F</div>
          <div>
            <p className="font-semibold text-white">Fitly AI Stylist</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-brand-muted">Online</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
          {messages.map((msg, i) => (
            <div key={i} className={"flex items-end gap-2.5 " + (msg.role === "user" ? "justify-end" : "justify-start")}>
              {msg.role === "model" && (
                <div className="w-7 h-7 rounded-lg bg-gold-gradient flex items-center justify-center text-brand-dark font-bold text-xs shrink-0 mb-0.5">F</div>
              )}
              <div className={"max-w-[78%] px-4 py-3 rounded-2xl " + (msg.role === "user" ? "bg-brand-gold text-brand-dark font-medium rounded-br-sm text-sm" : "bg-brand-card border border-brand-border text-white rounded-bl-sm")}>
                {msg.role === "model" ? <MessageText text={msg.text} /> : msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-end gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-lg bg-gold-gradient flex items-center justify-center text-brand-dark font-bold text-xs shrink-0">F</div>
              <div className="bg-brand-card border border-brand-border px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1.5 items-center">
                  {[0,1,2].map((n) => <div key={n} className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: n * 0.15 + "s" }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mb-3 shrink-0">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => sendMessage(s)} className="text-xs text-brand-muted border border-brand-border px-3 py-1.5 rounded-full hover:border-brand-gold hover:text-brand-gold transition-all bg-brand-surface">{s}</button>
            ))}
          </div>
        )}
        <div className="flex gap-2 bg-brand-card border border-brand-border rounded-2xl p-2 shrink-0">
          <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Ask about fashion, outfits, colors..." className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-brand-muted focus:outline-none" />
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="btn-gold py-2 px-4 rounded-xl text-sm disabled:opacity-40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
