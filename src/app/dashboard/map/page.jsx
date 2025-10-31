"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import '@/style/map.css';


// Mock data untuk bins di gedung perkantoran
async function fetchBinsData() {
  // Simulasi delay network
  await new Promise(r => setTimeout(r, 200));
  
  return [
    // Lantai 1 - Lobby & Reception
    { 
      id: 1, 
      name: "Lobby Utama - Entrance", 
      floor: 1, 
      x: 150, 
      y: 200, 
      status: "normal",
      volume: 45,
      type: "campuran",
      lastUpdate: "5 menit lalu",
      temperature: 28,
      battery: 92
    },
    { 
      id: 2, 
      name: "Reception Desk", 
      floor: 1, 
      x: 380, 
      y: 180, 
      status: "warning",
      volume: 78,
      type: "anorganik",
      lastUpdate: "2 menit lalu",
      temperature: 27,
      battery: 88
    },
    { 
      id: 3, 
      name: "Waiting Area", 
      floor: 1, 
      x: 520, 
      y: 320, 
      status: "normal",
      volume: 32,
      type: "campuran",
      lastUpdate: "15 menit lalu",
      temperature: 26,
      battery: 95
    },
    
    // Lantai 2 - Kantin & Dining Area
    { 
      id: 4, 
      name: "Kantin - Food Court", 
      floor: 2, 
      x: 200, 
      y: 250, 
      status: "critical",
      volume: 92,
      type: "organik",
      lastUpdate: "1 menit lalu",
      temperature: 30,
      battery: 75
    },
    { 
      id: 5, 
      name: "Dining Area A", 
      floor: 2, 
      x: 450, 
      y: 200, 
      status: "warning",
      volume: 68,
      type: "organik",
      lastUpdate: "8 menit lalu",
      temperature: 29,
      battery: 82
    },
    { 
      id: 6, 
      name: "Coffee Corner", 
      floor: 2, 
      x: 600, 
      y: 350, 
      status: "normal",
      volume: 25,
      type: "anorganik",
      lastUpdate: "20 menit lalu",
      temperature: 27,
      battery: 90
    },
    
    // Lantai 3 - Meeting Rooms
    { 
      id: 7, 
      name: "Meeting Room A", 
      floor: 3, 
      x: 180, 
      y: 150, 
      status: "normal",
      volume: 38,
      type: "anorganik",
      lastUpdate: "12 menit lalu",
      temperature: 25,
      battery: 87
    },
    { 
      id: 8, 
      name: "Conference Hall", 
      floor: 3, 
      x: 400, 
      y: 280, 
      status: "warning",
      volume: 72,
      type: "campuran",
      lastUpdate: "6 menit lalu",
      temperature: 26,
      battery: 79
    },
    { 
      id: 9, 
      name: "Breakout Area", 
      floor: 3, 
      x: 580, 
      y: 180, 
      status: "normal",
      volume: 41,
      type: "anorganik",
      lastUpdate: "18 menit lalu",
      temperature: 25,
      battery: 91
    },
    
    // Lantai 4 - Workspace
    { 
      id: 10, 
      name: "Open Office Area", 
      floor: 4, 
      x: 250, 
      y: 200, 
      status: "normal",
      volume: 55,
      type: "anorganik",
      lastUpdate: "10 menit lalu",
      temperature: 24,
      battery: 85
    },
    { 
      id: 11, 
      name: "Pantry", 
      floor: 4, 
      x: 500, 
      y: 150, 
      status: "warning",
      volume: 81,
      type: "organik",
      lastUpdate: "3 menit lalu",
      temperature: 28,
      battery: 73
    },
    { 
      id: 12, 
      name: "Collaboration Space", 
      floor: 4, 
      x: 350, 
      y: 350, 
      status: "normal",
      volume: 42,
      type: "campuran",
      lastUpdate: "25 menit lalu",
      temperature: 24,
      battery: 94
    },
    
    // Basement - Parking
    { 
      id: 13, 
      name: "Parking Area A", 
      floor: 0, 
      x: 200, 
      y: 280, 
      status: "normal",
      volume: 48,
      type: "campuran",
      lastUpdate: "14 menit lalu",
      temperature: 31,
      battery: 81
    },
    { 
      id: 14, 
      name: "Parking Area B", 
      floor: 0, 
      x: 500, 
      y: 280, 
      status: "warning",
      volume: 76,
      type: "campuran",
      lastUpdate: "7 menit lalu",
      temperature: 30,
      battery: 77
    },
    
    // Rooftop - Garden
    { 
      id: 15, 
      name: "Rooftop Garden", 
      floor: 5, 
      x: 350, 
      y: 250, 
      status: "normal",
      volume: 35,
      type: "organik",
      lastUpdate: "22 menit lalu",
      temperature: 32,
      battery: 68
    }
  ];
}

export default function MapsPage() {
  const [bins, setBins] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedBin, setSelectedBin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapDimensions, setMapDimensions] = useState({ width: 800, height: 500 });
  const [filterStatus, setFilterStatus] = useState('all');
  const mapContainerRef = useRef(null);

  // Floor configuration untuk gedung perkantoran
  const floors = [
    { id: 0, name: "Basement - Parkiran", image: "/assets/maps/basement.png", totalBins: 2 },
    { id: 1, name: "Lantai 1 - Lobby", image: "/assets/maps/lantai1.png", totalBins: 3 },
    { id: 2, name: "Lantai 2 - Kantin", image: "/assets/maps/lantai2.png", totalBins: 3 },
    { id: 3, name: "Lantai 3 - Meeting Rooms", image: "/assets/maps/lantai3.png", totalBins: 3 },
    { id: 4, name: "Lantai 4 - Workspace", image: "/assets/maps/lantai4.png", totalBins: 3 },
    { id: 5, name: "Rooftop - Garden", image: "/assets/maps/rooftop.png", totalBins: 1 }
  ];

  useEffect(() => {
    loadBinsData();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    if (mapContainerRef.current) {
      const width = mapContainerRef.current.offsetWidth;
      setMapDimensions({
        width: width,
        height: width * 0.625 // Maintain aspect ratio
      });
    }
  };

  const loadBinsData = async () => {
    setLoading(true);
    try {
      const data = await fetchBinsData();
      setBins(data);
    } catch (error) {
      console.error("Error loading bins data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredBins = () => {
    let filtered = bins.filter(bin => bin.floor === selectedFloor);
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(bin => bin.status === filterStatus);
    }
    
    return filtered;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return '#ff4444';
      case 'warning': return '#ff9900';
      case 'normal': return '#4CAF50';
      default: return '#888888';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'organik': return '#4CAF50';
      case 'anorganik': return '#42aee0';
      case 'campuran': return '#FF9800';
      default: return '#757575';
    }
  };

  const handleBinClick = (bin) => {
    setSelectedBin(bin);
  };

  const getFloorStats = (floorId) => {
    const floorBins = bins.filter(bin => bin.floor === floorId);
    const critical = floorBins.filter(bin => bin.status === 'critical').length;
    const warning = floorBins.filter(bin => bin.status === 'warning').length;
    const normal = floorBins.filter(bin => bin.status === 'normal').length;
    
    return { total: floorBins.length, critical, warning, normal };
  };

  const currentFloorBins = getFilteredBins();
  const stats = getFloorStats(selectedFloor);

  return (
    <div className="maps-container">
      {/* Header */}
      <div className="maps-header">
        <div className="header-content">
          <h1 className="maps-title">Peta Lokasi Tempat Sampah</h1>
          <p className="maps-subtitle">Monitoring real-time posisi dan status bins di gedung perkantoran</p>
        </div>
        <div className="header-actions">
          <button onClick={loadBinsData} className="refresh-btn">
            🔄 Refresh
          </button>
          <Link href="/dashboard/bins">
            <button className="view-list-btn">
              📋 List View
            </button>
          </Link>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="map-stats-grid">
        <div className="map-stat-card">
          <span className="stat-icon">🗑️</span>
          <div className="stat-content">
            <span className="stat-value">{bins.length}</span>
            <span className="stat-label">Total Bins</span>
          </div>
        </div>
        <div className="map-stat-card critical">
          <span className="stat-icon">🚨</span>
          <div className="stat-content">
            <span className="stat-value">{bins.filter(b => b.status === 'critical').length}</span>
            <span className="stat-label">Perlu Dikosongkan</span>
          </div>
        </div>
        <div className="map-stat-card warning">
          <span className="stat-icon">⚠️</span>
          <div className="stat-content">
            <span className="stat-value">{bins.filter(b => b.status === 'warning').length}</span>
            <span className="stat-label">Hampir Penuh</span>
          </div>
        </div>
        <div className="map-stat-card normal">
          <span className="stat-icon">✅</span>
          <div className="stat-content">
            <span className="stat-value">{bins.filter(b => b.status === 'normal').length}</span>
            <span className="stat-label">Status Normal</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="maps-main">
        {/* Sidebar - Floor Selection */}
        <div className="floor-sidebar">
          <h3 className="sidebar-title">Pilih Lantai</h3>
          <div className="floor-buttons">
            {floors.map(floor => {
              const floorStats = getFloorStats(floor.id);
              return (
                <button
                  key={floor.id}
                  className={`floor-btn ${selectedFloor === floor.id ? 'active' : ''}`}
                  onClick={() => setSelectedFloor(floor.id)}
                >
                  <div className="floor-info">
                    <span className="floor-name">{floor.name}</span>
                    <span className="floor-bins">{floorStats.total} bins</span>
                  </div>
                  <div className="floor-indicators">
                    {floorStats.critical > 0 && (
                      <span className="indicator critical">{floorStats.critical}</span>
                    )}
                    {floorStats.warning > 0 && (
                      <span className="indicator warning">{floorStats.warning}</span>
                    )}
                    {floorStats.normal > 0 && (
                      <span className="indicator normal">{floorStats.normal}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Filter by Status */}
          <div className="filter-section">
            <h4 className="filter-title">Filter Status</h4>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="status"
                  value="all"
                  checked={filterStatus === 'all'}
                  onChange={(e) => setFilterStatus(e.target.value)}
                />
                <span>Semua</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="status"
                  value="critical"
                  checked={filterStatus === 'critical'}
                  onChange={(e) => setFilterStatus(e.target.value)}
                />
                <span>Critical</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="status"
                  value="warning"
                  checked={filterStatus === 'warning'}
                  onChange={(e) => setFilterStatus(e.target.value)}
                />
                <span>Warning</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="status"
                  value="normal"
                  checked={filterStatus === 'normal'}
                  onChange={(e) => setFilterStatus(e.target.value)}
                />
                <span>Normal</span>
              </label>
            </div>
          </div>

          {/* Floor Statistics */}
          <div className="floor-stats">
            <h4 className="stats-title">Statistik {floors[selectedFloor]?.name}</h4>
            <div className="stats-bars">
              <div className="stat-bar">
                <div className="bar-label">
                  <span>Critical</span>
                  <span>{stats.critical}</span>
                </div>
                <div className="bar-track">
                  <div 
                    className="bar-fill critical"
                    style={{ width: `${(stats.critical / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="stat-bar">
                <div className="bar-label">
                  <span>Warning</span>
                  <span>{stats.warning}</span>
                </div>
                <div className="bar-track">
                  <div 
                    className="bar-fill warning"
                    style={{ width: `${(stats.warning / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="stat-bar">
                <div className="bar-label">
                  <span>Normal</span>
                  <span>{stats.normal}</span>
                </div>
                <div className="bar-track">
                  <div 
                    className="bar-fill normal"
                    style={{ width: `${(stats.normal / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Display */}
        <div className="map-content">
          <div className="map-container" ref={mapContainerRef}>
            {loading ? (
              <div className="map-loading">
                <div className="loading-spinner"></div>
                <p>Loading map data...</p>
              </div>
            ) : (
              <div className="map-wrapper">
                {/* Floor Map Image */}
                <div className="floor-map">
                  <img 
                    src={floors[selectedFloor]?.image || "/assets/maps/default.png"}
                    alt={`Floor ${selectedFloor}`}
                    className="map-image"
                  />
                  
                  {/* Bin Markers */}
                  <div className="bin-markers">
                    {currentFloorBins.map(bin => (
                      <div
                        key={bin.id}
                        className={`bin-marker ${bin.status} ${selectedBin?.id === bin.id ? 'selected' : ''}`}
                        style={{
                          left: `${(bin.x / 800) * 100}%`,
                          top: `${(bin.y / 500) * 100}%`,
                          '--marker-color': getStatusColor(bin.status)
                        }}
                        onClick={() => handleBinClick(bin)}
                      >
                        <div className="marker-icon">
                          <span className="marker-emoji">🗑️</span>
                          <div className="marker-pulse"></div>
                        </div>
                        <div className="marker-tooltip">
                          <strong>{bin.name}</strong>
                          <div>Volume: {bin.volume}%</div>
                          <div>Type: {bin.type}</div>
                          <div>Update: {bin.lastUpdate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="map-legend">
                  <h4>Legend</h4>
                  <div className="legend-items">
                    <div className="legend-item">
                      <span className="legend-dot critical"></span>
                      <span>Critical (≥90%)</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot warning"></span>
                      <span>Warning (≥70%)</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot normal"></span>
                      <span>Normal (70%)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Selected Bin Details */}
          {selectedBin && (
            <div className="bin-details-panel">
              <div className="panel-header">
                <h3>Detail Tempat Sampah</h3>
                <button 
                  className="close-panel"
                  onClick={() => setSelectedBin(null)}
                >
                  ✕
                </button>
              </div>
              <div className="panel-content">
                <h4>{selectedBin.name}</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Status</span>
                    <span className={`detail-value status-${selectedBin.status}`}>
                      {selectedBin.status === 'critical' ? 'Penuh' :
                       selectedBin.status === 'warning' ? 'Hampir Penuh' : 'Normal'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Volume</span>
                    <span className="detail-value">{selectedBin.volume}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Tipe</span>
                    <span 
                      className="detail-value type-badge"
                      style={{ backgroundColor: getTypeColor(selectedBin.type) }}
                    >
                      {selectedBin.type}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Suhu</span>
                    <span className="detail-value">{selectedBin.temperature}°C</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Baterai</span>
                    <span className="detail-value">{selectedBin.battery}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Update</span>
                    <span className="detail-value">{selectedBin.lastUpdate}</span>
                  </div>
                </div>
                <div className="panel-actions">
                  <Link href={`/dashboard/bins/${selectedBin.id}`}>
                    <button className="action-btn primary">
                      📊 View Details
                    </button>
                  </Link>
                  <button className="action-btn secondary">
                    🔄 Request Empty
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}