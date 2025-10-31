"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BinsPage() {
  const [bins, setBins] = useState([
    {
      id: 1,
      name: "Tempat Sampah A",
      location: "Lantai 1 - Lobby",
      volume: 75,
      status: "online",
      lastUpdated: "2 menit yang lalu",
      isOpen: false,
      batteryLevel: 85,
      temperature: 28,
      type: "organik"
    },
    {
      id: 2,
      name: "Tempat Sampah B",
      location: "Lantai 2 - Kantin",
      volume: 45,
      status: "online",
      lastUpdated: "5 menit yang lalu",
      isOpen: false,
      batteryLevel: 92,
      temperature: 27,
      type: "anorganik"
    },
    {
      id: 3,
      name: "Tempat Sampah C",
      location: "Lantai 3 - Ruang Meeting",
      volume: 90,
      status: "warning",
      lastUpdated: "1 menit yang lalu",
      isOpen: false,
      batteryLevel: 67,
      temperature: 29,
      type: "organik"
    },
    {
      id: 4,
      name: "Tempat Sampah D",
      location: "Outdoor - Parkiran",
      volume: 20,
      status: "offline",
      lastUpdated: "30 menit yang lalu",
      isOpen: false,
      batteryLevel: 45,
      temperature: 31,
      type: "campuran"
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Simulasi update data real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setBins(prevBins =>
        prevBins.map(bin => ({
          ...bin,
          volume: Math.min(100, Math.max(0, bin.volume + (Math.random() * 4 - 2))),
          lastUpdated: "Baru saja"
        }))
      );
    }, 10000); // Update setiap 10 detik

    return () => clearInterval(interval);
  }, []);

  const handleControl = async (binId, cmd) => {
    try {
      const res = await fetch("/api/control-bin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binId, cmd }),
      });
      const data = await res.json();
      console.log("Response:", data);

      // Update status bin
      setBins(prevBins =>
        prevBins.map(bin =>
          bin.id === binId
            ? { ...bin, isOpen: cmd === "open" }
            : bin
        )
      );

      alert(`Perintah "${cmd}" berhasil dikirim ke Tempat Sampah ${binId}!`);
    } catch (err) {
      console.error("Error:", err);
      alert("Gagal mengirim perintah");
    }
  };

  const getVolumeColor = (volume) => {
    if (volume >= 80) return "#ff4444";
    if (volume >= 60) return "#ff9900";
    return "#44ff44";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online": return "#44ff44";
      case "warning": return "#ff9900";
      case "offline": return "#888888";
      default: return "#888888";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "organik": return "#4CAF50";
      case "anorganik": return "#2196F3";
      case "campuran": return "#FF9800";
      default: return "#757575";
    }
  };

  const filteredBins = bins.filter(bin => {
    const matchesFilter = filter === "all" || bin.status === filter || bin.type === filter;
    const matchesSearch = bin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bins-container">
      {/* Header */}
      <div className="bins-header">
        <h1 className="bins-title">Monitoring Tempat Sampah Pintar</h1>
        <p className="bins-subtitle">Sistem Monitoring Real-time Terintegrasi IoT</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">🗑️</div>
          <div className="stat-info">
            <div className="stat-value">{bins.length}</div>
            <div className="stat-label">Total Unit</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-value">{bins.filter(b => b.status === "online").length}</div>
            <div className="stat-label">Online</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <div className="stat-value">{bins.filter(b => b.volume >= 80).length}</div>
            <div className="stat-label">Hampir Penuh</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <div className="stat-value">{Math.round(bins.reduce((acc, bin) => acc + bin.volume, 0) / bins.length)}%</div>
            <div className="stat-label">Rata-rata Volume</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Cari tempat sampah..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Semua
          </button>
          <button
            className={`filter-btn ${filter === "online" ? "active" : ""}`}
            onClick={() => setFilter("online")}
          >
            Online
          </button>
          <button
            className={`filter-btn ${filter === "offline" ? "active" : ""}`}
            onClick={() => setFilter("offline")}
          >
            Offline
          </button>
          <button
            className={`filter-btn ${filter === "organik" ? "active" : ""}`}
            onClick={() => setFilter("organik")}
          >
            Organik
          </button>
          <button
            className={`filter-btn ${filter === "anorganik" ? "active" : ""}`}
            onClick={() => setFilter("anorganik")}
          >
            Anorganik
          </button>
        </div>
      </div>

      {/* Bins Grid */}
      <div className="bins-grid">
        {filteredBins.map((bin) => (
          <div key={bin.id} className="bin-card">
            {/* Card Header */}
            <div className="bin-header">
              <div className="bin-title-section">
                <h3 className="bin-name">{bin.name}</h3>
                <div className="bin-location">📍 {bin.location}</div>
              </div>
              <div className="bin-status">
                <span
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(bin.status) }}
                ></span>
                <span className="status-text">{bin.status}</span>
              </div>
            </div>

            {/* Type Badge */}
            <div className="bin-type">
              <span
                className="type-badge"
                style={{ backgroundColor: getTypeColor(bin.type) }}
              >
                {bin.type.toUpperCase()}
              </span>
            </div>

            {/* Volume Display */}
            <div className="volume-section">
              <div className="volume-header">
                <span className="volume-label">Volume Terisi</span>
                <span className="volume-percentage" style={{ color: getVolumeColor(bin.volume) }}>
                  {bin.volume}%
                </span>
              </div>
              <div className="volume-bar-container">
                <div
                  className="volume-bar"
                  style={{
                    width: `${bin.volume}%`,
                    backgroundColor: getVolumeColor(bin.volume)
                  }}
                ></div>
              </div>
              {bin.volume >= 80 && (
                <div className="volume-warning">
                  ⚠️ Perlu dikosongkan segera!
                </div>
              )}
            </div>

            {/* Info Grid */}
            <div className="bin-info-grid">
              <div className="info-item">
                <span className="info-icon">🔋</span>
                <span className="info-label">Baterai</span>
                <span className="info-value">{bin.batteryLevel}%</span>
              </div>
              <div className="info-item">
                <span className="info-icon">🌡️</span>
                <span className="info-label">Suhu</span>
                <span className="info-value">{bin.temperature}°C</span>
              </div>
              <div className="info-item">
                <span className="info-icon">🕐</span>
                <span className="info-label">Update</span>
                <span className="info-value">{bin.lastUpdated}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="control-section">
              <div className="control-label">Kontrol Manual</div>
              <div className="control-buttons">
                <button
                  className={`control-btn open-btn ${bin.isOpen ? "active" : ""}`}
                  onClick={() => handleControl(bin.id, "open")}
                  disabled={bin.status === "offline"}
                >
                  <span className="btn-icon">📂</span>
                  Buka
                </button>
                <button
                  className={`control-btn close-btn ${!bin.isOpen ? "active" : ""}`}
                  onClick={() => handleControl(bin.id, "close")}
                  disabled={bin.status === "offline"}
                >
                  <span className="btn-icon">📁</span>
                  Tutup
                </button>
              </div>
              {bin.status === "offline" && (
                <div className="control-warning">
                  ⚠️ Device offline, kontrol tidak tersedia
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <Link href={`/dashboard/bins/${bin.id}`}>
                <button className="action-btn">📊 Detail</button>
              </Link>
              <button className="action-btn">
                📈 Riwayat
              </button>
              <button className="action-btn">
                ⚙️ Pengaturan
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBins.length === 0 && (
        <div className="no-results">
          <p>Tidak ada tempat sampah yang ditemukan</p>
        </div>
      )}
    </div>
  );
}