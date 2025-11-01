"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import '@/style/analytic.css';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("7days");
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [loading, setLoading] = useState(false);
  const [mlPredictions, setMlPredictions] = useState(null);

  // Mock ML Predictions - akan diganti dengan API call ke Python backend
  const fetchMLPredictions = async () => {
    setLoading(true);
    try {
      // Simulasi API call ke Python ML backend
      // const response = await fetch('/api/ml/predictions');
      // const data = await response.json();
      
      // Mock data untuk development
      const mockData = {
        routeOptimization: {
          currentRoute: [
            { id: 1, name: "Lantai 2 - Kantin", estimatedTime: "08:00", volume: 92 },
            { id: 2, name: "Lantai 1 - Lobby", estimatedTime: "08:15", volume: 85 },
            { id: 3, name: "Lantai 4 - Pantry", estimatedTime: "08:30", volume: 81 },
            { id: 4, name: "Lantai 3 - Conference", estimatedTime: "08:45", volume: 78 },
            { id: 5, name: "Basement - Parking", estimatedTime: "09:00", volume: 76 }
          ],
          optimizedRoute: [
            { id: 1, name: "Lantai 2 - Kantin", estimatedTime: "08:00", volume: 92 },
            { id: 3, name: "Lantai 4 - Pantry", estimatedTime: "08:10", volume: 81 },
            { id: 2, name: "Lantai 1 - Lobby", estimatedTime: "08:20", volume: 85 },
            { id: 4, name: "Lantai 3 - Conference", estimatedTime: "08:30", volume: 78 },
            { id: 5, name: "Basement - Parking", estimatedTime: "08:40", volume: 76 }
          ],
          savings: {
            time: "20 menit",
            distance: "1.2 km",
            efficiency: "+18%"
          }
        },
        fillPredictions: {
          nextHour: [
            { binId: 4, name: "Kantin - Food Court", currentVolume: 92, predictedVolume: 98, timeToFull: "25 menit" },
            { binId: 11, name: "Pantry", currentVolume: 81, predictedVolume: 89, timeToFull: "1.5 jam" },
            { binId: 2, name: "Reception Desk", currentVolume: 78, predictedVolume: 83, timeToFull: "2 jam" }
          ],
          peakHours: [
            { hour: "12:00-13:00", location: "Kantin", avgFillRate: "25%/jam" },
            { hour: "09:00-10:00", location: "Lobby", avgFillRate: "15%/jam" },
            { hour: "15:00-16:00", location: "Pantry", avgFillRate: "18%/jam" }
          ],
          weeklyPattern: {
            days: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
            avgVolumes: [72, 75, 78, 76, 80, 45, 30]
          }
        },
        capacityRecommendations: [
          {
            binId: 4,
            name: "Kantin - Food Court",
            currentCapacity: "100L",
            recommendedCapacity: "150L",
            reason: "Rata-rata penuh 3x sehari, peak hour tinggi",
            fillFrequency: "3x/hari",
            avgDailyVolume: "280L",
            confidence: 92
          },
          {
            binId: 11,
            name: "Pantry Lantai 4",
            currentCapacity: "80L",
            recommendedCapacity: "120L",
            reason: "Sering mencapai kapasitas maksimal saat jam makan siang",
            fillFrequency: "2x/hari",
            avgDailyVolume: "150L",
            confidence: 87
          },
          {
            binId: 8,
            name: "Conference Hall",
            currentCapacity: "100L",
            recommendedCapacity: "80L",
            reason: "Jarang penuh, bisa dikurangi untuk efisiensi",
            fillFrequency: "0.5x/hari",
            avgDailyVolume: "40L",
            confidence: 78
          }
        ]
      };
      
      setMlPredictions(mockData);
    } catch (error) {
      console.error("Error fetching ML predictions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMLPredictions();
  }, [dateRange, selectedFloor]);

  // Data untuk charts
  const volumeTrendData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
    datasets: [
      {
        label: "Kantin",
        data: [20, 15, 45, 95, 60, 35, 25],
        color: "#ff6b6b"
      },
      {
        label: "Lobby",
        data: [30, 25, 60, 75, 70, 45, 35],
        color: "#4CAF50"
      },
      {
        label: "Office",
        data: [25, 20, 55, 65, 75, 40, 30],
        color: "#42aee0"
      }
    ]
  };

  const wasteComposition = [
    { type: "Organik", value: 45, color: "#4CAF50" },
    { type: "Anorganik", value: 35, color: "#42aee0" },
    { type: "Campuran", value: 20, color: "#FF9800" }
  ];

  const performanceMetrics = {
    collectionEfficiency: 92,
    avgResponseTime: "15 menit",
    totalCollections: 156,
    missedCollections: 3,
    avgFillLevel: 68,
    peakUtilization: 95
  };

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <div className="header-left">
          <h1 className="analytics-title">Analytics & Insights</h1>
          <p className="analytics-subtitle">
            Machine Learning Predictions & Data Analysis
          </p>
        </div>
        <div className="header-controls">
          <select 
            className="date-range-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="24hours">24 Jam</option>
            <option value="7days">7 Hari</option>
            <option value="30days">30 Hari</option>
            <option value="90days">90 Hari</option>
          </select>
          <select 
            className="floor-select"
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
          >
            <option value="all">Semua Lantai</option>
            <option value="basement">Basement</option>
            <option value="1">Lantai 1</option>
            <option value="2">Lantai 2</option>
            <option value="3">Lantai 3</option>
            <option value="4">Lantai 4</option>
            <option value="rooftop">Rooftop</option>
          </select>
          <button onClick={fetchMLPredictions} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="analytics-tabs">
        <button 
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === "route" ? "active" : ""}`}
          onClick={() => setActiveTab("route")}
        >
          🛣️ Route Optimization
        </button>
        <button 
          className={`tab-btn ${activeTab === "predictions" ? "active" : ""}`}
          onClick={() => setActiveTab("predictions")}
        >
          🔮 Fill Predictions
        </button>
        <button 
          className={`tab-btn ${activeTab === "capacity" ? "active" : ""}`}
          onClick={() => setActiveTab("capacity")}
        >
          📏 Capacity Planning
        </button>
        <button 
          className={`tab-btn ${activeTab === "reports" ? "active" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          📈 Reports
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="overview-tab">
            {/* KPI Cards */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-icon">📊</span>
                  <span className="kpi-label">Collection Efficiency</span>
                </div>
                <div className="kpi-value">{performanceMetrics.collectionEfficiency}%</div>
                <div className="kpi-trend positive">↑ 5% vs last week</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-icon">⏱️</span>
                  <span className="kpi-label">Avg Response Time</span>
                </div>
                <div className="kpi-value">{performanceMetrics.avgResponseTime}</div>
                <div className="kpi-trend positive">↓ 3 min improvement</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-icon">🗑️</span>
                  <span className="kpi-label">Total Collections</span>
                </div>
                <div className="kpi-value">{performanceMetrics.totalCollections}</div>
                <div className="kpi-trend">This month</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-icon">📈</span>
                  <span className="kpi-label">Peak Utilization</span>
                </div>
                <div className="kpi-value">{performanceMetrics.peakUtilization}%</div>
                <div className="kpi-trend negative">↑ Critical level</div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
              {/* Volume Trend Chart */}
              <div className="chart-card">
                <h3 className="chart-title">Volume Trend (24 Hours)</h3>
                <div className="line-chart">
                  <div className="chart-y-axis">
                    <span>100%</span>
                    <span>75%</span>
                    <span>50%</span>
                    <span>25%</span>
                    <span>0%</span>
                  </div>
                  <div className="chart-area">
                    {volumeTrendData.labels.map((label, i) => (
                      <div key={i} className="chart-column">
                        {volumeTrendData.datasets.map((dataset, j) => (
                          <div 
                            key={j}
                            className="chart-point"
                            style={{
                              bottom: `${dataset.data[i]}%`,
                              backgroundColor: dataset.color
                            }}
                            title={`${dataset.label}: ${dataset.data[i]}%`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="chart-x-axis">
                    {volumeTrendData.labels.map((label, i) => (
                      <span key={i}>{label}</span>
                    ))}
                  </div>
                </div>
                <div className="chart-legend">
                  {volumeTrendData.datasets.map((dataset, i) => (
                    <div key={i} className="legend-item">
                      <span 
                        className="legend-color"
                        style={{ backgroundColor: dataset.color }}
                      />
                      <span>{dataset.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Waste Composition */}
              <div className="chart-card">
                <h3 className="chart-title">Waste Composition</h3>
                <div className="pie-chart">
                  <div className="pie-container">
                    {/* Simple bar representation */}
                    <div className="composition-bars">
                      {wasteComposition.map((item, i) => (
                        <div key={i} className="comp-bar-item">
                          <div className="comp-bar-label">
                            <span>{item.type}</span>
                            <span>{item.value}%</span>
                          </div>
                          <div className="comp-bar-track">
                            <div 
                              className="comp-bar-fill"
                              style={{
                                width: `${item.value}%`,
                                backgroundColor: item.color
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="composition-stats">
                    <div className="comp-stat">
                      <span className="comp-label">Total Volume Today</span>
                      <span className="comp-value">1,250 L</span>
                    </div>
                    <div className="comp-stat">
                      <span className="comp-label">Recycling Rate</span>
                      <span className="comp-value">65%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Heatmap */}
            <div className="heatmap-card">
              <h3 className="chart-title">Weekly Activity Heatmap</h3>
              <div className="heatmap">
                <div className="heatmap-labels-y">
                  <span>Basement</span>
                  <span>Lantai 1</span>
                  <span>Lantai 2</span>
                  <span>Lantai 3</span>
                  <span>Lantai 4</span>
                  <span>Rooftop</span>
                </div>
                <div className="heatmap-grid">
                  {[...Array(6)].map((_, floor) => (
                    <div key={floor} className="heatmap-row">
                      {[...Array(7)].map((_, day) => {
                        const intensity = Math.random();
                        return (
                          <div 
                            key={day}
                            className="heatmap-cell"
                            style={{
                              backgroundColor: `rgba(66, 174, 224, ${intensity})`,
                            }}
                            title={`${Math.round(intensity * 100)}% activity`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="heatmap-labels-x">
                  <span>Sen</span>
                  <span>Sel</span>
                  <span>Rab</span>
                  <span>Kam</span>
                  <span>Jum</span>
                  <span>Sab</span>
                  <span>Min</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Route Optimization Tab */}
        {activeTab === "route" && (
          <div className="route-tab">
            <div className="route-header">
              <h2>🛣️ Optimasi Rute Pengambilan</h2>
              <p>Powered by Machine Learning Algorithm</p>
            </div>

            {mlPredictions?.routeOptimization && (
              <>
                {/* Savings Summary */}
                <div className="savings-summary">
                  <div className="savings-card">
                    <span className="savings-icon">⏱️</span>
                    <div className="savings-info">
                      <span className="savings-value">{mlPredictions.routeOptimization.savings.time}</span>
                      <span className="savings-label">Waktu Hemat</span>
                    </div>
                  </div>
                  <div className="savings-card">
                    <span className="savings-icon">📍</span>
                    <div className="savings-info">
                      <span className="savings-value">{mlPredictions.routeOptimization.savings.distance}</span>
                      <span className="savings-label">Jarak Hemat</span>
                    </div>
                  </div>
                  <div className="savings-card">
                    <span className="savings-icon">⚡</span>
                    <div className="savings-info">
                      <span className="savings-value">{mlPredictions.routeOptimization.savings.efficiency}</span>
                      <span className="savings-label">Efisiensi</span>
                    </div>
                  </div>
                </div>

                {/* Route Comparison */}
                <div className="route-comparison">
                  <div className="route-column">
                    <h3>🔴 Rute Saat Ini</h3>
                    <div className="route-list">
                      {mlPredictions.routeOptimization.currentRoute.map((stop, i) => (
                        <div key={i} className="route-stop">
                          <div className="stop-number">{i + 1}</div>
                          <div className="stop-info">
                            <div className="stop-name">{stop.name}</div>
                            <div className="stop-details">
                              <span>⏰ {stop.estimatedTime}</span>
                              <span>📊 {stop.volume}%</span>
                            </div>
                          </div>
                          {i < mlPredictions.routeOptimization.currentRoute.length - 1 && (
                            <div className="route-connector">↓</div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="route-summary">
                      Total: 1 jam | 5.2 km
                    </div>
                  </div>

                  <div className="route-arrow">
                    <span>➜</span>
                    <span className="optimize-label">OPTIMIZE</span>
                  </div>

                  <div className="route-column optimized">
                    <h3>🟢 Rute Optimal (ML)</h3>
                    <div className="route-list">
                      {mlPredictions.routeOptimization.optimizedRoute.map((stop, i) => (
                        <div key={i} className="route-stop">
                          <div className="stop-number">{i + 1}</div>
                          <div className="stop-info">
                            <div className="stop-name">{stop.name}</div>
                            <div className="stop-details">
                              <span>⏰ {stop.estimatedTime}</span>
                              <span>📊 {stop.volume}%</span>
                            </div>
                          </div>
                          {i < mlPredictions.routeOptimization.optimizedRoute.length - 1 && (
                            <div className="route-connector">↓</div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="route-summary success">
                      Total: 40 menit | 4 km
                    </div>
                  </div>
                </div>

                <div className="route-actions">
                  <button className="btn-apply-route">
                    ✅ Terapkan Rute Optimal
                  </button>
                  <button className="btn-export-route">
                    📥 Export to Navigation
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Fill Predictions Tab */}
        {activeTab === "predictions" && (
          <div className="predictions-tab">
            <div className="predictions-header">
              <h2>🔮 Prediksi Waktu Penuh</h2>
              <p>Real-time predictions based on historical patterns</p>
            </div>

            {mlPredictions?.fillPredictions && (
              <>
                {/* Critical Predictions */}
                <div className="critical-predictions">
                  <h3>⚠️ Perlu Perhatian Segera</h3>
                  <div className="prediction-cards">
                    {mlPredictions.fillPredictions.nextHour.map((pred, i) => (
                      <div key={i} className="prediction-card critical">
                        <div className="pred-header">
                          <span className="pred-name">{pred.name}</span>
                          <span className="pred-time">{pred.timeToFull}</span>
                        </div>
                        <div className="pred-progress">
                          <div className="pred-bar-bg">
                            <div 
                              className="pred-bar-current"
                              style={{ width: `${pred.currentVolume}%` }}
                            />
                            <div 
                              className="pred-bar-predicted"
                              style={{ width: `${pred.predictedVolume}%` }}
                            />
                          </div>
                          <div className="pred-labels">
                            <span>Saat ini: {pred.currentVolume}%</span>
                            <span>Prediksi: {pred.predictedVolume}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Peak Hours Analysis */}
                <div className="peak-hours">
                  <h3>🕐 Peak Hours Analysis</h3>
                  <div className="peak-grid">
                    {mlPredictions.fillPredictions.peakHours.map((peak, i) => (
                      <div key={i} className="peak-card">
                        <div className="peak-time">{peak.hour}</div>
                        <div className="peak-location">{peak.location}</div>
                        <div className="peak-rate">
                          <span className="rate-icon">📈</span>
                          <span>{peak.avgFillRate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Pattern */}
                <div className="weekly-pattern">
                  <h3>📅 Pola Mingguan</h3>
                  <div className="pattern-chart">
                    <div className="pattern-bars">
                      {mlPredictions.fillPredictions.weeklyPattern.days.map((day, i) => (
                        <div key={i} className="pattern-bar">
                          <div 
                            className="bar-fill"
                            style={{ 
                              height: `${mlPredictions.fillPredictions.weeklyPattern.avgVolumes[i]}%`,
                              backgroundColor: mlPredictions.fillPredictions.weeklyPattern.avgVolumes[i] > 70 ? '#ff9900' : '#4CAF50'
                            }}
                          >
                            <span className="bar-value">
                              {mlPredictions.fillPredictions.weeklyPattern.avgVolumes[i]}%
                            </span>
                          </div>
                          <span className="bar-day">{day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Capacity Planning Tab */}
        {activeTab === "capacity" && (
          <div className="capacity-tab">
            <div className="capacity-header">
              <h2>📏 Rekomendasi Kapasitas</h2>
              <p>ML-based capacity optimization recommendations</p>
            </div>

            {mlPredictions?.capacityRecommendations && (
              <div className="capacity-recommendations">
                {mlPredictions.capacityRecommendations.map((rec, i) => (
                  <div key={i} className={`capacity-card ${rec.recommendedCapacity > rec.currentCapacity ? 'increase' : 'decrease'}`}>
                    <div className="capacity-header">
                      <h4>{rec.name}</h4>
                      <div className="confidence-badge">
                        Confidence: {rec.confidence}%
                      </div>
                    </div>
                    
                    <div className="capacity-comparison">
                      <div className="current-capacity">
                        <span className="cap-label">Saat Ini</span>
                        <span className="cap-value">{rec.currentCapacity}</span>
                      </div>
                      <div className="arrow-change">
                        {rec.recommendedCapacity > rec.currentCapacity ? '→📈' : '→📉'}
                      </div>
                      <div className="recommended-capacity">
                        <span className="cap-label">Rekomendasi</span>
                        <span className="cap-value">{rec.recommendedCapacity}</span>
                      </div>
                    </div>

                    <div className="capacity-reason">
                      <span className="reason-icon">💡</span>
                      <span>{rec.reason}</span>
                    </div>

                    <div className="capacity-stats">
                      <div className="cap-stat">
                        <span className="stat-label">Frekuensi Penuh</span>
                        <span className="stat-value">{rec.fillFrequency}</span>
                      </div>
                      <div className="cap-stat">
                        <span className="stat-label">Volume Harian</span>
                        <span className="stat-value">{rec.avgDailyVolume}</span>
                      </div>
                    </div>

                    <button className="btn-implement">
                      Terapkan Rekomendasi
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Cost-Benefit Analysis */}
            <div className="cost-benefit">
              <h3>💰 Analisis Cost-Benefit</h3>
              <div className="benefit-grid">
                <div className="benefit-card">
                  <span className="benefit-label">Estimasi Penghematan</span>
                  <span className="benefit-value">Rp 2.5 Juta/bulan</span>
                </div>
                <div className="benefit-card">
                  <span className="benefit-label">ROI Period</span>
                  <span className="benefit-value">3 Bulan</span>
                </div>
                <div className="benefit-card">
                  <span className="benefit-label">Efficiency Gain</span>
                  <span className="benefit-value">+23%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="reports-tab">
            <div className="reports-header">
              <h2>📈 Generate Reports</h2>
              <p>Comprehensive analytics reports</p>
            </div>

            <div className="report-types">
              <div className="report-card">
                <span className="report-icon">📊</span>
                <h3>Performance Report</h3>
                <p>Monthly performance metrics and KPIs</p>
                <button className="btn-generate">Generate PDF</button>
              </div>
              <div className="report-card">
                <span className="report-icon">🔮</span>
                <h3>Prediction Accuracy</h3>
                <p>ML model accuracy and improvements</p>
                <button className="btn-generate">Generate PDF</button>
              </div>
              <div className="report-card">
                <span className="report-icon">💰</span>
                <h3>Cost Analysis</h3>
                <p>Operational costs and savings</p>
                <button className="btn-generate">Generate PDF</button>
              </div>
              <div className="report-card">
                <span className="report-icon">🌱</span>
                <h3>Sustainability Report</h3>
                <p>Environmental impact and recycling rates</p>
                <button className="btn-generate">Generate PDF</button>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="recent-reports">
              <h3>Recent Generated Reports</h3>
              <div className="reports-list">
                <div className="report-item">
                  <span className="report-date">2024-10-31</span>
                  <span className="report-name">October Performance Report</span>
                  <button className="btn-download">📥 Download</button>
                </div>
                <div className="report-item">
                  <span className="report-date">2024-10-24</span>
                  <span className="report-name">Weekly Analytics</span>
                  <button className="btn-download">📥 Download</button>
                </div>
                <div className="report-item">
                  <span className="report-date">2024-10-15</span>
                  <span className="report-name">Q3 Sustainability Report</span>
                  <button className="btn-download">📥 Download</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ML Integration Notice */}
      <div className="ml-integration-notice">
        <div className="notice-icon">🤖</div>
        <div className="notice-content">
          <strong>Machine Learning Integration</strong>
          <p>
            This page is ready for Python ML model integration via API endpoints.
            Connect your models to: <code>/api/ml/predictions</code>, <code>/api/ml/route</code>, <code>/api/ml/capacity</code>
          </p>
        </div>
      </div>
    </div>
  );
}