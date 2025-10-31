"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VolumeChart from "@/components/VolumeChart";
import "@/style/bindetail.css";

export default function BinDetailPage({ params }) {
  const router = useRouter();
  const binId = params.id;
  
  const [activeTab, setActiveTab] = useState("detail");
  const [binData, setBinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({
    alertThreshold: 80,
    autoOpen: false,
    scheduledEmpty: "07:00",
    notifications: true,
    maintenanceMode: false
  });

  // Fetch bin detail data
  useEffect(() => {
    fetchBinDetail();
    if (activeTab === "riwayat") {
      fetchHistory();
    }
  }, [binId, activeTab]);

  const fetchBinDetail = async () => {
    try {
      // Simulasi data - ganti dengan API call sebenarnya
      const mockData = {
        id: binId,
        name: `Tempat Sampah ${binId}`,
        location: "Lantai 2 - Kantin",
        type: "organik",
        volume: 65,
        status: "online",
        lastUpdated: "2 menit yang lalu",
        isOpen: false,
        batteryLevel: 85,
        temperature: 28,
        humidity: 65,
        weight: 12.5,
        capacity: 100, // liter
        installedDate: "2024-01-15",
        lastMaintenance: "2024-10-01",
        deviceId: `device_00${binId}`,
        firmware: "v2.1.0",
        network: "WiFi",
        signalStrength: -45,
        totalEmptied: 156,
        averageFillRate: 8.5, // % per hour
        peakHours: "12:00 - 14:00",
        odorLevel: "Normal"
      };
      
      setBinData(mockData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bin detail:", error);
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      // Simulasi history data
      const mockHistory = [
        {
          id: 1,
          timestamp: "2024-10-31 14:30",
          action: "Dikosongkan",
          volume: { before: 92, after: 0 },
          operator: "Ahmad S.",
          duration: "5 menit"
        },
        {
          id: 2,
          timestamp: "2024-10-31 10:15",
          action: "Peringatan Penuh",
          volume: { before: 85, after: 85 },
          operator: "System",
          duration: "-"
        },
        {
          id: 3,
          timestamp: "2024-10-30 16:45",
          action: "Dikosongkan",
          volume: { before: 88, after: 0 },
          operator: "Budi R.",
          duration: "4 menit"
        },
        {
          id: 4,
          timestamp: "2024-10-30 08:00",
          action: "Maintenance",
          volume: { before: 45, after: 45 },
          operator: "Tim Teknis",
          duration: "30 menit"
        },
        {
          id: 5,
          timestamp: "2024-10-29 15:20",
          action: "Dikosongkan",
          volume: { before: 95, after: 0 },
          operator: "Ahmad S.",
          duration: "6 menit"
        }
      ];
      
      setHistory(mockHistory);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = async () => {
    try {
      // API call untuk save settings
      const response = await fetch(`/api/bins/${binId}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      
      if (response.ok) {
        alert("Pengaturan berhasil disimpan!");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Gagal menyimpan pengaturan");
    }
  };

  const handleManualControl = async (action) => {
    try {
      const response = await fetch("/api/control-bin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ binId, cmd: action })
      });
      
      if (response.ok) {
        alert(`Berhasil ${action === 'open' ? 'membuka' : 'menutup'} tempat sampah`);
        fetchBinDetail(); // Refresh data
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengirim perintah");
    }
  };

  const getVolumeColor = (volume) => {
    if (volume >= 80) return "#ff4444";
    if (volume >= 60) return "#ff9900";
    return "#4CAF50";
  };

  if (loading) {
    return (
      <div className="bin-detail-loading">
        <div className="loading-spinner"></div>
        <p>Memuat data...</p>
      </div>
    );
  }

  if (!binData) {
    return (
      <div className="bin-detail-error">
        <p>Data tidak ditemukan</p>
        <Link href="/dashboard/bins">
          <button className="btn-back">Kembali</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bin-detail-container">
      {/* Header */}
      <div className="bin-detail-header">
        <div className="header-left">
          <Link href="/dashboard/bins">
            <button className="btn-back-icon">
              <span>←</span> Kembali
            </button>
          </Link>
          <div className="header-info">
            <h1 className="bin-detail-title">{binData.name}</h1>
            <p className="bin-detail-location">📍 {binData.location}</p>
          </div>
        </div>
        <div className="header-right">
          <div className={`status-badge ${binData.status}`}>
            <span className="status-dot"></span>
            {binData.status}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-icon">🗑️</span>
          <div className="stat-content">
            <span className="stat-value" style={{ color: getVolumeColor(binData.volume) }}>
              {binData.volume}%
            </span>
            <span className="stat-label">Volume</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🔋</span>
          <div className="stat-content">
            <span className="stat-value">{binData.batteryLevel}%</span>
            <span className="stat-label">Baterai</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌡️</span>
          <div className="stat-content">
            <span className="stat-value">{binData.temperature}°C</span>
            <span className="stat-label">Suhu</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">⚖️</span>
          <div className="stat-content">
            <span className="stat-value">{binData.weight} kg</span>
            <span className="stat-label">Berat</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📶</span>
          <div className="stat-content">
            <span className="stat-value">{binData.signalStrength} dBm</span>
            <span className="stat-label">Sinyal</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === "detail" ? "active" : ""}`}
          onClick={() => setActiveTab("detail")}
        >
          📊 Detail
        </button>
        <button 
          className={`tab-btn ${activeTab === "riwayat" ? "active" : ""}`}
          onClick={() => setActiveTab("riwayat")}
        >
          📈 Riwayat
        </button>
        <button 
          className={`tab-btn ${activeTab === "pengaturan" ? "active" : ""}`}
          onClick={() => setActiveTab("pengaturan")}
        >
          ⚙️ Pengaturan
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Detail Tab */}
        {activeTab === "detail" && (
          <div className="detail-tab">
            {/* Volume Chart */}
            <div className="detail-card">
              <h3 className="card-title">Status Volume</h3>
              <div className="volume-display">
                <div className="volume-circle">
                  <svg viewBox="0 0 100 100" className="volume-svg">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e0e0e0"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={getVolumeColor(binData.volume)}
                      strokeWidth="10"
                      strokeDasharray={`${binData.volume * 2.83} 283`}
                      transform="rotate(-90 50 50)"
                      className="volume-progress"
                    />
                  </svg>
                  <div className="volume-text">
                    <span className="volume-number">{binData.volume}</span>
                    <span className="volume-percent">%</span>
                  </div>
                </div>
                <div className="volume-info">
                  <p>Kapasitas: {binData.capacity} Liter</p>
                  <p>Estimasi penuh: {Math.round((100 - binData.volume) / binData.averageFillRate)} jam</p>
                  <p>Rata-rata pengisian: {binData.averageFillRate}% / jam</p>
                </div>
              </div>
            </div>

            {/* Device Info */}
            <div className="detail-card">
              <h3 className="card-title">Informasi Perangkat</h3>
              <div className="info-grid">
                <div className="info-row">
                  <span className="info-label">Device ID:</span>
                  <span className="info-value">{binData.deviceId}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Tipe:</span>
                  <span className="info-value type-badge" style={{ 
                    backgroundColor: binData.type === 'organik' ? '#4CAF50' : '#42aee0' 
                  }}>
                    {binData.type.toUpperCase()}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Firmware:</span>
                  <span className="info-value">{binData.firmware}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Network:</span>
                  <span className="info-value">{binData.network}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Installed:</span>
                  <span className="info-value">{new Date(binData.installedDate).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Last Maintenance:</span>
                  <span className="info-value">{new Date(binData.lastMaintenance).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* Sensor Data */}
            <div className="detail-card">
              <h3 className="card-title">Data Sensor</h3>
              <div className="sensor-grid">
                <div className="sensor-item">
                  <span className="sensor-icon">💧</span>
                  <span className="sensor-label">Kelembaban</span>
                  <span className="sensor-value">{binData.humidity}%</span>
                </div>
                <div className="sensor-item">
                  <span className="sensor-icon">👃</span>
                  <span className="sensor-label">Level Bau</span>
                  <span className="sensor-value">{binData.odorLevel}</span>
                </div>
                <div className="sensor-item">
                  <span className="sensor-icon">📊</span>
                  <span className="sensor-label">Total Dikosongkan</span>
                  <span className="sensor-value">{binData.totalEmptied}x</span>
                </div>
                <div className="sensor-item">
                  <span className="sensor-icon">⏰</span>
                  <span className="sensor-label">Jam Sibuk</span>
                  <span className="sensor-value">{binData.peakHours}</span>
                </div>
              </div>
            </div>

            {/* Control Panel */}
            <div className="detail-card">
              <h3 className="card-title">Kontrol Manual</h3>
              <div className="control-panel">
                <button 
                  className="control-btn-large open"
                  onClick={() => handleManualControl('open')}
                  disabled={binData.status === 'offline'}
                >
                  <span className="btn-icon">📂</span>
                  Buka Tutup
                </button>
                <button 
                  className="control-btn-large close"
                  onClick={() => handleManualControl('close')}
                  disabled={binData.status === 'offline'}
                >
                  <span className="btn-icon">📁</span>
                  Tutup
                </button>
                <button className="control-btn-large maintenance">
                  <span className="btn-icon">🔧</span>
                  Request Maintenance
                </button>
                <button className="control-btn-large empty">
                  <span className="btn-icon">♻️</span>
                  Request Kosongkan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Riwayat Tab */}
        {activeTab === "riwayat" && (
          <div className="history-tab">
            {/* Volume Chart */}
            <div className="chart-section">
              <div className="chart-header">
                <h3 className="chart-title">Grafik Volume</h3>
                <div className="chart-controls">
                  <button className="chart-btn active">24 Jam</button>
                  <button className="chart-btn">7 Hari</button>
                  <button className="chart-btn">30 Hari</button>
                </div>
              </div>
              <div className="chart-wrapper">
                {/* Uncomment when VolumeChart component is imported */}
                <VolumeChart binId={binId} period="7days" />
                
                {/* Temporary placeholder chart */}
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    {[65, 78, 82, 71, 88, 92, 75].map((height, index) => (
                      <div key={index} className="bar-wrapper">
                        <div 
                          className="bar" 
                          style={{ 
                            height: `${height}%`,
                            background: height >= 80 ? '#ff9900' : '#42aee0'
                          }}
                        >
                          <span className="bar-value">{height}%</span>
                        </div>
                        <span className="bar-label">
                          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="history-filters">
              <select className="filter-select">
                <option value="all">Semua Aktivitas</option>
                <option value="emptied">Dikosongkan</option>
                <option value="maintenance">Maintenance</option>
                <option value="alert">Peringatan</option>
              </select>
              <input 
                type="date" 
                className="date-filter"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="history-list">
              {history.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-icon">
                    {item.action === "Dikosongkan" && "♻️"}
                    {item.action === "Maintenance" && "🔧"}
                    {item.action === "Peringatan Penuh" && "⚠️"}
                  </div>
                  <div className="history-content">
                    <div className="history-header">
                      <h4>{item.action}</h4>
                      <span className="history-time">{item.timestamp}</span>
                    </div>
                    <div className="history-details">
                      {item.volume && (
                        <span className="volume-change">
                          Volume: {item.volume.before}% → {item.volume.after}%
                        </span>
                      )}
                      <span className="operator">Oleh: {item.operator}</span>
                      {item.duration !== "-" && (
                        <span className="duration">Durasi: {item.duration}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="history-stats">
              <h3>Statistik Bulan Ini</h3>
              <div className="stats-grid">
                <div className="stat-card-small">
                  <span className="stat-number">24</span>
                  <span className="stat-desc">Total Dikosongkan</span>
                </div>
                <div className="stat-card-small">
                  <span className="stat-number">3.5</span>
                  <span className="stat-desc">Rata-rata per Hari</span>
                </div>
                <div className="stat-card-small">
                  <span className="stat-number">85%</span>
                  <span className="stat-desc">Avg Volume Saat Kosongkan</span>
                </div>
                <div className="stat-card-small">
                  <span className="stat-number">2</span>
                  <span className="stat-desc">Maintenance</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pengaturan Tab */}
        {activeTab === "pengaturan" && (
          <div className="settings-tab">
            <div className="settings-card">
              <h3 className="card-title">Pengaturan Notifikasi</h3>
              <div className="settings-group">
                <div className="setting-item">
                  <div className="setting-info">
                    <label htmlFor="alertThreshold">Threshold Peringatan Volume (%)</label>
                    <small>Kirim notifikasi saat volume mencapai nilai ini</small>
                  </div>
                  <input 
                    type="number" 
                    id="alertThreshold"
                    value={settings.alertThreshold}
                    onChange={(e) => handleSettingChange('alertThreshold', e.target.value)}
                    min="50"
                    max="100"
                    className="setting-input"
                  />
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <label htmlFor="notifications">Aktifkan Notifikasi</label>
                    <small>Terima notifikasi real-time untuk tempat sampah ini</small>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      id="notifications"
                      checked={settings.notifications}
                      onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-card">
              <h3 className="card-title">Pengaturan Operasional</h3>
              <div className="settings-group">
                <div className="setting-item">
                  <div className="setting-info">
                    <label htmlFor="autoOpen">Auto-Open</label>
                    <small>Buka otomatis saat ada yang mendekat</small>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      id="autoOpen"
                      checked={settings.autoOpen}
                      onChange={(e) => handleSettingChange('autoOpen', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <label htmlFor="scheduledEmpty">Jadwal Kosongkan</label>
                    <small>Waktu rutin untuk pengosongan</small>
                  </div>
                  <input 
                    type="time" 
                    id="scheduledEmpty"
                    value={settings.scheduledEmpty}
                    onChange={(e) => handleSettingChange('scheduledEmpty', e.target.value)}
                    className="setting-input"
                  />
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <label htmlFor="maintenanceMode">Mode Maintenance</label>
                    <small>Nonaktifkan sementara untuk perawatan</small>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      id="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button className="btn-save" onClick={saveSettings}>
                💾 Simpan Pengaturan
              </button>
              <button className="btn-reset">
                🔄 Reset ke Default
              </button>
            </div>

            {/* Danger Zone */}
            <div className="settings-card danger-zone">
              <h3 className="card-title">Zona Berbahaya</h3>
              <div className="danger-actions">
                <button className="btn-danger">
                  🔄 Restart Device
                </button>
                <button className="btn-danger">
                  📡 Reset Network
                </button>
                <button className="btn-danger">
                  🗑️ Hapus Device
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}