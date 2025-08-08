import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <a href="/" className="hover:text-gray-300">Home</a>
      <a href="/results" className="hover:text-gray-300">Results</a>
      <a href="/gallery" className="hover:text-gray-300">Gallery</a>
      <a href="/chat" className="hover:text-gray-300">Chat</a>
      <a href="/admin" className="hover:text-gray-300">Admin</a>
    </nav>
  );
}
