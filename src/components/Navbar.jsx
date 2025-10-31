"use client";

import { useState } from "react";
import Link from "next/link";
import "@/style/globals.css";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LEFT - Search Bar */}
        <div className="navbar-left">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <svg
                className="search-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* CENTER-RIGHT - Navigation Links */}
        <div className="navbar-right">
          <div className="nav-links">
            <Link href="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link href="/dashboard/bins" className="nav-link">
              Bins
            </Link>
            <Link href="/dashboard/map" className="nav-link">
              Maps
            </Link>
            <Link href="/dashboard/analytic" className="nav-link">
              Analytics
            </Link>
            <Link href="/dashboard/settings" className="nav-link">
              Settings
            </Link>
          </div>

          {/* PROFILE - Far Right */}
          <Link href="/profile" className="profile-link">
            <div className="profile-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
