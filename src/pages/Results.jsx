import React, { useEffect, useState } from "react";

export default function Results() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const analysis = localStorage.getItem("analysis");
    if (analysis) {
      setData(JSON.parse(analysis));
    }
  }, []);

  if (!data) return <div className="p-4">No analysis found.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Your Style Analysis</h2>
      <ul className="list-disc pl-6">
        <li><strong>Body Shape:</strong> {data.bodyShape}</li>
        <li><strong>Skin Tone:</strong> {data.skinTone}</li>
        <li><strong>Face Type:</strong> {data.faceType}</li>
        <li><strong>Suggestions:</strong> {data.suggestions}</li>
      </ul>
    </div>
  );
}
