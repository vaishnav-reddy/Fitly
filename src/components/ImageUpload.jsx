import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "https://fitly-bcknd.onrender.com";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleFile = (selected) => {
    if (!selected) return;
    if (!selected.type.startsWith("image/")) return setError("Please select a valid image file.");
    if (selected.size > 5 * 1024 * 1024) return setError("Image must be under 5MB.");
    setError("");
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select an image first.");
    const formData = new FormData();
    formData.append("image", file);
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(`${API_BASE}/upload`, formData);
      localStorage.setItem("analysis", JSON.stringify(res.data.result));
      localStorage.setItem("analysisId", res.data.id);
      navigate("/results");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Drop Zone */}
      <div
        onClick={() => !loading && inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
          dragOver
            ? "border-brand-gold bg-brand-gold/5 shadow-gold"
            : preview
            ? "border-brand-border"
            : "border-brand-border hover:border-brand-gold/50 hover:bg-white/[0.02]"
        }`}
      >
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-full max-h-72 object-cover rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-xs text-white/80 font-medium truncate max-w-[200px]">{file?.name}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                className="text-xs text-white/60 hover:text-red-400 transition-colors bg-black/40 px-2 py-1 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-12 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center">
              <svg className="w-7 h-7 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Drop your photo here</p>
              <p className="text-sm text-brand-muted">or click to browse â€” JPEG, PNG, WEBP up to 5MB</p>
            </div>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2.5 rounded-xl">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="mt-4 w-full btn-gold flex items-center justify-center gap-2.5 py-3.5"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Analyzing your style...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
            </svg>
            Analyze My Style
          </>
        )}
      </button>
    </div>
  );
}
