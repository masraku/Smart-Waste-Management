"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import '@/style/dashboard.css';

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Data tempat sampah untuk lingkungan perkantoran
  const recentBins = [
    { 
      id: 1,
      location: "Lantai 1 - Lobby", 
      fillLevel: 85, 
      status: "warning", 
      lastUpdate: "5 menit lalu",
      type: "campuran",
      temperature: 28
    },
    { 
      id: 2,
      location: "Lantai 2 - Kantin", 
      fillLevel: 92, 
      status: "critical", 
      lastUpdate: "2 menit lalu",
      type: "organik",
      temperature: 30
    },
    { 
      id: 3,
      location: "Lantai 3 - R. Meeting", 
      fillLevel: 45, 
      status: "normal", 
      lastUpdate: "15 menit lalu",
      type: "anorganik",
      temperature: 27
    },
    { 
      id: 4,
      location: "Lantai 4 - Workspace", 
      fillLevel: 68, 
      status: "normal", 
      lastUpdate: "8 menit lalu",
      type: "anorganik",
      temperature: 26
    },
    { 
      id: 5,
      location: "Basement - Parkiran", 
      fillLevel: 78, 
      status: "warning", 
      lastUpdate: "12 menit lalu",
      type: "campuran",
      temperature: 31
    },
    { 
      id: 6,
      location: "Rooftop - Garden", 
      fillLevel: 35, 
      status: "normal", 
      lastUpdate: "20 menit lalu",
      type: "organik",
      temperature: 29
    }
  ];

  // Activity log data
  const activityLog = [
    { time: "08:30", action: "Dikosongkan", location: "Lantai 2 - Kantin", operator: "Ahmad S." },
    { time: "09:15", action: "Maintenance", location: "Basement - Parkiran", operator: "Tim Teknis" },
    { time: "10:45", action: "Alert Penuh", location: "Lantai 1 - Lobby", operator: "System" },
    { time: "11:00", action: "Dikosongkan", location: "Lantai 1 - Lobby", operator: "Budi R." },
    { time: "13:30", action: "Sensor Check", location: "Rooftop - Garden", operator: "System" }
  ];

  // Environmental impact data
  const environmentalImpact = {
    co2Saved: "124.5", // kg
    wasteRecycled: "89", // %
    energySaved: "456", // kWh
    waterSaved: "2,340" // liters
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "critical": return "status-critical";
      case "warning": return "status-warning";
      case "normal": return "status-normal";
      default: return "status-default";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "organik": return "#4CAF50";
      case "anorganik": return "#42aee0";
      case "campuran": return "#FF9800";
      default: return "#757575";
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">Dashboard Monitoring</h1>
          <p className="dashboard-subtitle">
            Smart Waste Management System - Gedung Perkantoran
          </p>
        </div>
        <div className="header-right">
          <div className="system-status">
            <small>Status Sistem</small>
            <div className="status-indicator">
              <span className="status-dot online"></span>
              <span>Online</span>
            </div>
          </div>
          <div className="current-time">
            <small>Waktu Saat Ini</small>
            <div className="time-display">
              {currentTime.toLocaleTimeString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Total Tempat Sampah</p>
              <h3 className="stat-value">24</h3>
              <span className="stat-change positive">+2 minggu ini</span>
            </div>
            <div className="stat-icon-wrapper blue">
              <span className="stat-icon">🗑️</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Perlu Dikosongkan</p>
              <h3 className="stat-value">5</h3>
              <span className="stat-change negative">3 critical</span>
            </div>
            <div className="stat-icon-wrapper red">
              <span className="stat-icon">⚠️</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Dikosongkan Hari Ini</p>
              <h3 className="stat-value">12</h3>
              <span className="stat-change">Target: 15</span>
            </div>
            <div className="stat-icon-wrapper green">
              <span className="stat-icon">✅</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Efisiensi Sistem</p>
              <h3 className="stat-value">92%</h3>
              <span className="stat-change positive">↑ 5%</span>
            </div>
            <div className="stat-icon-wrapper purple">
              <span className="stat-icon">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* ML Prediction & Environmental Impact */}
      <div className="analytics-row">
        {/* ML Predictions */}
        <div className="analytics-card">
          <div className="card-header">
            <h3 className="card-title">🤖 Prediksi AI/ML</h3>
            <span className="badge ai-badge">AI Powered</span>
          </div>
          
          <div className="prediction-box primary">
            <div className="prediction-header">
              <span className="prediction-label">Prediksi Penuh Berikutnya</span>
              <span className="prediction-urgency">Urgent</span>
            </div>
            <h4 className="prediction-time">2 Jam 15 Menit</h4>
            <p className="prediction-location">📍 Lantai 2 - Kantin</p>
            <div className="prediction-details">
              <span>Fill Rate: 12%/jam</span>
              <span>Current: 92%</span>
            </div>
          </div>

          <div className="prediction-box secondary">
            <div className="prediction-header">
              <span className="prediction-label">Optimasi Rute Harian</span>
            </div>
            <div className="optimization-stats">
              <div className="opt-item">
                <span className="opt-value">-35%</span>
                <span className="opt-label">Waktu</span>
              </div>
              <div className="opt-item">
                <span className="opt-value">8</span>
                <span className="opt-label">Stops</span>
              </div>
              <div className="opt-item">
                <span className="opt-value">2.5km</span>
                <span className="opt-label">Jarak</span>
              </div>
            </div>
          </div>

          <div className="ai-insights">
            <h5>💡 AI Insights</h5>
            <ul className="insights-list">
              <li>Peak hours detected: 12:00-14:00 (Kantin)</li>
              <li>Low activity weekend pattern detected</li>
              <li>Recommend maintenance for Bin #7</li>
            </ul>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="analytics-card">
          <div className="card-header">
            <h3 className="card-title">🌱 Environmental Impact</h3>
            <span className="badge eco-badge">Eco Friendly</span>
          </div>

          <div className="impact-grid">
            <div className="impact-item">
              <div className="impact-icon co2">🌍</div>
              <div className="impact-info">
                <h4>{environmentalImpact.co2Saved}</h4>
                <span>kg CO₂ Saved</span>
              </div>
            </div>
            <div className="impact-item">
              <div className="impact-icon recycle">♻️</div>
              <div className="impact-info">
                <h4>{environmentalImpact.wasteRecycled}%</h4>
                <span>Waste Recycled</span>
              </div>
            </div>
            <div className="impact-item">
              <div className="impact-icon energy">⚡</div>
              <div className="impact-info">
                <h4>{environmentalImpact.energySaved}</h4>
                <span>kWh Saved</span>
              </div>
            </div>
            <div className="impact-item">
              <div className="impact-icon water">💧</div>
              <div className="impact-info">
                <h4>{environmentalImpact.waterSaved}</h4>
                <span>Liters Saved</span>
              </div>
            </div>
          </div>

          {/* Weekly Chart Placeholder */}
          <div className="weekly-chart">
            <h5>Weekly Waste Trend</h5>
            <div className="mini-chart">
              {[45, 60, 35, 80, 55, 70, 40].map((height, i) => (
                <div key={i} className="chart-bar-wrapper">
                  <div 
                    className="chart-bar"
                    style={{ 
                      height: `${height}%`,
                      background: height > 60 ? '#ff9800' : '#4CAF50'
                    }}
                  ></div>
                  <span className="chart-label">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="activity-log">
            <h5>Recent Activity</h5>
            <div className="log-items">
              {activityLog.slice(0, 3).map((log, i) => (
                <div key={i} className="log-item">
                  <span className="log-time">{log.time}</span>
                  <span className="log-action">{log.action}</span>
                  <span className="log-operator">{log.operator}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bins Status */}
      <div className="bins-section">
        <div className="section-header">
          <h3 className="section-title">Status Tempat Sampah Terkini</h3>
          <Link href="/bins">
            <button className="view-all-btn">
              Lihat Semua →
            </button>
          </Link>
        </div>
        
        <div className="bins-status-grid">
          {recentBins.map((bin) => (
            <div key={bin.id} className="bin-status-card">
              <div className="bin-card-header">
                <div className="bin-info">
                  <h6 className="bin-location">{bin.location}</h6>
                  <small className="bin-update">Update: {bin.lastUpdate}</small>
                </div>
                <span className={`bin-badge ${getStatusClass(bin.status)}`}>
                  {bin.status === "critical" ? "Penuh" : 
                   bin.status === "warning" ? "Hampir Penuh" : "Normal"}
                </span>
              </div>

              <div className="bin-type-badge" style={{ backgroundColor: getTypeColor(bin.type) }}>
                {bin.type.toUpperCase()}
              </div>

              <div className="fill-level-section">
                <div className="fill-level-header">
                  <span className="fill-label">Tingkat Isi</span>
                  <span className={`fill-percentage ${bin.status}`}>
                    {bin.fillLevel}%
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className={`progress-bar-fill ${bin.status}`}
                    style={{ width: `${bin.fillLevel}%` }}
                  ></div>
                </div>
              </div>

              <div className="bin-stats">
                <div className="bin-stat">
                  <span className="stat-icon">🌡️</span>
                  <span>{bin.temperature}°C</span>
                </div>
                <div className="bin-stat">
                  <span className="stat-icon">🔋</span>
                  <span>85%</span>
                </div>
              </div>

              <Link href={`/bins/${bin.id}`}>
                <button className="bin-detail-btn">
                  Detail →
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3 className="section-title">Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-card">
            <span className="action-icon">📋</span>
            <span className="action-label">Generate Report</span>
          </button>
          <button className="action-card">
            <span className="action-icon">🔔</span>
            <span className="action-label">Alert Settings</span>
          </button>
          <button className="action-card">
            <span className="action-icon">📊</span>
            <span className="action-label">Analytics</span>
          </button>
          <button className="action-card">
            <span className="action-icon">⚙️</span>
            <span className="action-label">System Config</span>
          </button>
        </div>
      </div>
    </div>
  );
}