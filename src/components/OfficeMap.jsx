// components/CampusMap.jsx
// Reusable map component for displaying floor plans with bin markers

import { useState, useEffect, useRef } from 'react';

export default function CampusMap({ 
  floors, 
  fetchBins, 
  initialFloor = 1,
  onBinClick,
  filterStatus = 'all' 
}) {
  const [bins, setBins] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(initialFloor);
  const [loading, setLoading] = useState(true);
  const [hoveredBin, setHoveredBin] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    loadBins();
  }, []);

  const loadBins = async () => {
    setLoading(true);
    try {
      const data = await fetchBins();
      setBins(data);
    } catch (error) {
      console.error("Error loading bins:", error);
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
    const colors = {
      critical: '#ff4444',
      warning: '#ff9900',
      normal: '#4CAF50',
      default: '#888888'
    };
    return colors[status] || colors.default;
  };

  const handleMarkerClick = (e, bin) => {
    e.stopPropagation();
    if (onBinClick) {
      onBinClick(bin);
    }
  };

  const currentBins = getFilteredBins();

  if (loading) {
    return (
      <div className="campus-map-loading">
        <div className="loading-spinner"></div>
        <p>Loading map data...</p>
      </div>
    );
  }

  return (
    <div className="campus-map">
      {/* Floor Selector */}
      <div className="floor-selector">
        {floors.map((floor, index) => (
          <button
            key={index}
            className={`floor-select-btn ${selectedFloor === index ? 'active' : ''}`}
            onClick={() => setSelectedFloor(index)}
          >
            Lantai {index === 0 ? 'Basement' : index}
          </button>
        ))}
      </div>

      {/* Map Display */}
      <div className="map-display" ref={mapRef}>
        <img 
          src={floors[selectedFloor]} 
          alt={`Floor ${selectedFloor}`}
          className="floor-image"
        />
        
        {/* Bin Markers */}
        <div className="markers-container">
          {currentBins.map(bin => (
            <div
              key={bin.id}
              className={`map-marker ${bin.status}`}
              style={{
                left: `${(bin.x / 800) * 100}%`,
                top: `${(bin.y / 500) * 100}%`,
                '--color': getStatusColor(bin.status)
              }}
              onClick={(e) => handleMarkerClick(e, bin)}
              onMouseEnter={() => setHoveredBin(bin)}
              onMouseLeave={() => setHoveredBin(null)}
            >
              <div className="marker-dot">
                <span className="marker-icon">🗑️</span>
                {bin.status === 'critical' && (
                  <span className="marker-alert">!</span>
                )}
              </div>
              
              {/* Hover Tooltip */}
              {hoveredBin?.id === bin.id && (
                <div className="marker-hover-tooltip">
                  <strong>{bin.name}</strong>
                  <div className="tooltip-info">
                    <span>Volume: {bin.volume}%</span>
                    <span>Status: {bin.status}</span>
                    <span>Type: {bin.type}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Map Controls */}
      <div className="map-controls">
        <button onClick={loadBins} className="refresh-map-btn">
          🔄 Refresh
        </button>
        <div className="map-info">
          <span className="info-item">
            <span className="info-dot critical"></span>
            Critical: {bins.filter(b => b.status === 'critical').length}
          </span>
          <span className="info-item">
            <span className="info-dot warning"></span>
            Warning: {bins.filter(b => b.status === 'warning').length}
          </span>
          <span className="info-item">
            <span className="info-dot normal"></span>
            Normal: {bins.filter(b => b.status === 'normal').length}
          </span>
        </div>
      </div>
    </div>
  );
}

const campusMapStyles = `
.campus-map {
  width: 100%;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.campus-map-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #42aee0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.floor-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.floor-select-btn {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 2px solid transparent;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.floor-select-btn:hover {
  background: white;
  border-color: #42aee0;
}

.floor-select-btn.active {
  background: linear-gradient(90deg, #1BA7D6 0%, #2DBBEA 100%);
  color: white;
  border-color: transparent;
}

.map-display {
  position: relative;
  width: 100%;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  min-height: 400px;
}

.floor-image {
  width: 100%;
  height: auto;
  display: block;
}

.markers-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.map-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
}

.marker-dot {
  position: relative;
  width: 36px;
  height: 36px;
  background: white;
  border: 3px solid var(--color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.map-marker:hover .marker-dot {
  transform: scale(1.15);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.marker-icon {
  font-size: 1.1rem;
}

.marker-alert {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4444;
  color: white;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.marker-hover-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-bottom: 8px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 20;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.marker-hover-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.9);
}

.marker-hover-tooltip strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
}

.tooltip-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.75rem;
}

.map-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #f0f0f0;
}

.refresh-map-btn {
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid #42aee0;
  border-radius: 8px;
  color: #42aee0;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refresh-map-btn:hover {
  background: #42aee0;
  color: white;
}

.map-info {
  display: flex;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;
}

.info-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.info-dot.critical {
  background: #ff4444;
}

.info-dot.warning {
  background: #ff9900;
}

.info-dot.normal {
  background: #4CAF50;
}

@media (max-width: 768px) {
  .floor-selector {
    justify-content: center;
  }
  
  .map-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .map-info {
    flex-wrap: wrap;
    justify-content: center;
  }
}
`;