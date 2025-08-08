import React, { useState } from "react";
import axios from "axios";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(""); // Clear previous result
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      console.log("📤 Uploading image to /upload...");

      const uploadRes = await axios.post("https://fitly-bcknd.onrender.com/upload", formData);
      console.log("✅ Upload response:", uploadRes.data);

      // ✅ Set result from response
      if (uploadRes.data?.message) {
        setResult(uploadRes.data.message);
      } else {
        setResult("No result received from API.");
      }
    } catch (err) {
      console.error("❌ Error occurred:", err);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>👗 Upload an Image for Fashion Recommendation</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px" }}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f4f4f4",
            borderRadius: "8px",
            whiteSpace: "pre-wrap",
          }}
        >
          <strong>💡 Recommendation:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
