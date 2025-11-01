"use client";

import { useState } from "react";
import Link from "next/link";
import "@/style/settings.css";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Smart Waste Management",
    timezone: "Asia/Jakarta",
    language: "id",
    dateFormat: "DD/MM/YYYY",
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    notifyOnHighVolume: true,
    notifyOnMalfunction: true,
    notifyOnScheduledCollection: false,
    highVolumeThreshold: 85,
    criticalVolumeThreshold: 95,
    
    // Alert Settings
    alertSound: true,
    alertFrequency: "immediate",
    quietHoursEnabled: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
    
    // Collection Settings
    autoScheduleCollection: true,
    collectionTimePreference: "morning",
    minCollectionVolume: 75,
    routeOptimization: true,
    
    // Bin Settings
    defaultBinCapacity: 100,
    autoOpenEnabled: true,
    autoCloseDelay: 10,
    sensorUpdateInterval: 5,
    
    // Dashboard Settings
    refreshInterval: 30,
    showAnimations: true,
    compactMode: false,
    defaultView: "grid",
    
    // System Settings
    dataRetentionDays: 90,
    autoBackup: true,
    backupFrequency: "daily",
    maintenanceMode: false,
    
    // ML Settings
    mlPredictionsEnabled: true,
    routeOptimizationEnabled: true,
    capacityRecommendationsEnabled: true,
    predictionConfidenceThreshold: 75,
    
    // API Settings
    apiTimeout: 30,
    maxRetries: 3,
    enableRateLimiting: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginNotifications: true,
  });

  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@smartwaste.com", role: "Admin", status: "Active" },
    { id: 2, name: "Operator 1", email: "operator1@smartwaste.com", role: "Operator", status: "Active" },
    { id: 3, name: "Viewer", email: "viewer@smartwaste.com", role: "Viewer", status: "Active" },
  ]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Simulasi save settings
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      // Reset logic here
      alert("Settings reset to default!");
    }
  };

  return (
    <div className="settings-container">
      {/* Header */}
      <div className="settings-header">
        <div className="header-left">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">
            Manage your system preferences and configurations
          </p>
        </div>
        <div className="header-actions">
          <button onClick={handleResetSettings} className="btn-reset">
            🔄 Reset to Default
          </button>
          <button onClick={handleSaveSettings} className="btn-save">
            💾 Save Changes
          </button>
        </div>
      </div>

      <div className="settings-layout">
        {/* Sidebar Navigation */}
        <div className="settings-sidebar">
          <div className="sidebar-section">
            <div className="section-title">General</div>
            <button
              className={`sidebar-item ${activeSection === "general" ? "active" : ""}`}
              onClick={() => setActiveSection("general")}
            >
              <span className="item-icon">⚙️</span>
              <span>General Settings</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === "notifications" ? "active" : ""}`}
              onClick={() => setActiveSection("notifications")}
            >
              <span className="item-icon">🔔</span>
              <span>Notifications</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === "alerts" ? "active" : ""}`}
              onClick={() => setActiveSection("alerts")}
            >
              <span className="item-icon">⚠️</span>
              <span>Alerts & Warnings</span>
            </button>
          </div>

          <div className="sidebar-section">
            <div className="section-title">Operations</div>
            <button
              className={`sidebar-item ${activeSection === "collection" ? "active" : ""}`}
              onClick={() => setActiveSection("collection")}
            >
              <span className="item-icon">🗑️</span>
              <span>Collection Settings</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === "bins" ? "active" : ""}`}
              onClick={() => setActiveSection("bins")}
            >
              <span className="item-icon">📦</span>
              <span>Bin Configuration</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === "schedule" ? "active" : ""}`}
              onClick={() => setActiveSection("schedule")}
            >
              <span className="item-icon">📅</span>
              <span>Schedule Management</span>
            </button>
          </div>

          <div className="sidebar-section">
            <div className="section-title">System</div>
            <button
              className={`sidebar-item ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveSection("dashboard")}
            >
              <span className="item-icon">📊</span>
              <span>Dashboard</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === "ml" ? "active" : ""}`}
              onClick={() => setActiveSection("ml")}
            >
              <span className="item-icon">🤖</span>
              <span>Machine Learning</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === "data" ? "active" : ""}`}
              onClick={() => setActiveSection("data")}
            >
              <span className="item-icon">💾</span>
              <span>Data & Backup</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === "api" ? "active" : ""}`}
              onClick={() => setActiveSection("api")}
            >
              <span className="item-icon">🔌</span>
              <span>API Configuration</span>
            </button>
          </div>

          <div className="sidebar-section">
            <div className="section-title">Security & Users</div>
            <button
              className={`sidebar-item ${activeSection === "users" ? "active" : ""}`}
              onClick={() => setActiveSection("users")}
            >
              <span className="item-icon">👥</span>
              <span>User Management</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === "security" ? "active" : ""}`}
              onClick={() => setActiveSection("security")}
            >
              <span className="item-icon">🔒</span>
              <span>Security</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === "roles" ? "active" : ""}`}
              onClick={() => setActiveSection("roles")}
            >
              <span className="item-icon">🎭</span>
              <span>Roles & Permissions</span>
            </button>
          </div>

          <div className="sidebar-section">
            <div className="section-title">Advanced</div>
            <button
              className={`sidebar-item ${activeSection === "integrations" ? "active" : ""}`}
              onClick={() => setActiveSection("integrations")}
            >
              <span className="item-icon">🔗</span>
              <span>Integrations</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === "maintenance" ? "active" : ""}`}
              onClick={() => setActiveSection("maintenance")}
            >
              <span className="item-icon">🔧</span>
              <span>Maintenance</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === "logs" ? "active" : ""}`}
              onClick={() => setActiveSection("logs")}
            >
              <span className="item-icon">📜</span>
              <span>System Logs</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="settings-content">
          
          {/* General Settings */}
          {activeSection === "general" && (
            <div className="settings-section">
              <h2 className="section-heading">General Settings</h2>
              <p className="section-description">Configure basic system settings and preferences</p>

              <div className="settings-group">
                <label className="setting-label">Site Name</label>
                <input
                  type="text"
                  className="setting-input"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange("siteName", e.target.value)}
                />
              </div>

              <div className="settings-group">
                <label className="setting-label">Timezone</label>
                <select
                  className="setting-select"
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange("timezone", e.target.value)}
                >
                  <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                  <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                  <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                </select>
              </div>

              <div className="settings-group">
                <label className="setting-label">Language</label>
                <select
                  className="setting-select"
                  value={settings.language}
                  onChange={(e) => handleSettingChange("language", e.target.value)}
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="settings-group">
                <label className="setting-label">Date Format</label>
                <select
                  className="setting-select"
                  value={settings.dateFormat}
                  onChange={(e) => handleSettingChange("dateFormat", e.target.value)}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeSection === "notifications" && (
            <div className="settings-section">
              <h2 className="section-heading">Notification Preferences</h2>
              <p className="section-description">Manage how and when you receive notifications</p>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Email Notifications</label>
                    <p className="setting-help">Receive notifications via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Push Notifications</label>
                    <p className="setting-help">Receive push notifications in browser</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange("pushNotifications", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">SMS Notifications</label>
                    <p className="setting-help">Receive notifications via SMS (charges may apply)</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => handleSettingChange("smsNotifications", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="divider"></div>

              <h3 className="subsection-heading">Notification Triggers</h3>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">High Volume Alert</label>
                    <p className="setting-help">Notify when bins reach high volume threshold</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifyOnHighVolume}
                      onChange={(e) => handleSettingChange("notifyOnHighVolume", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Malfunction Alert</label>
                    <p className="setting-help">Notify when bin malfunction is detected</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifyOnMalfunction}
                      onChange={(e) => handleSettingChange("notifyOnMalfunction", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Collection Schedule</label>
                    <p className="setting-help">Notify about scheduled collections</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifyOnScheduledCollection}
                      onChange={(e) => handleSettingChange("notifyOnScheduledCollection", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <label className="setting-label">High Volume Threshold (%)</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={settings.highVolumeThreshold}
                    onChange={(e) => handleSettingChange("highVolumeThreshold", parseInt(e.target.value))}
                    className="setting-slider"
                  />
                  <span className="slider-value">{settings.highVolumeThreshold}%</span>
                </div>
              </div>

              <div className="settings-group">
                <label className="setting-label">Critical Volume Threshold (%)</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="80"
                    max="100"
                    value={settings.criticalVolumeThreshold}
                    onChange={(e) => handleSettingChange("criticalVolumeThreshold", parseInt(e.target.value))}
                    className="setting-slider"
                  />
                  <span className="slider-value">{settings.criticalVolumeThreshold}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Alerts Settings */}
          {activeSection === "alerts" && (
            <div className="settings-section">
              <h2 className="section-heading">Alerts & Warnings</h2>
              <p className="section-description">Configure alert behavior and quiet hours</p>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Alert Sound</label>
                    <p className="setting-help">Play sound for critical alerts</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.alertSound}
                      onChange={(e) => handleSettingChange("alertSound", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <label className="setting-label">Alert Frequency</label>
                <select
                  className="setting-select"
                  value={settings.alertFrequency}
                  onChange={(e) => handleSettingChange("alertFrequency", e.target.value)}
                >
                  <option value="immediate">Immediate</option>
                  <option value="5min">Every 5 minutes</option>
                  <option value="15min">Every 15 minutes</option>
                  <option value="30min">Every 30 minutes</option>
                  <option value="1hour">Every hour</option>
                </select>
              </div>

              <div className="divider"></div>

              <h3 className="subsection-heading">Quiet Hours</h3>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Enable Quiet Hours</label>
                    <p className="setting-help">Suppress non-critical alerts during specified hours</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.quietHoursEnabled}
                      onChange={(e) => handleSettingChange("quietHoursEnabled", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              {settings.quietHoursEnabled && (
                <>
                  <div className="settings-group">
                    <label className="setting-label">Quiet Hours Start</label>
                    <input
                      type="time"
                      className="setting-input"
                      value={settings.quietHoursStart}
                      onChange={(e) => handleSettingChange("quietHoursStart", e.target.value)}
                    />
                  </div>

                  <div className="settings-group">
                    <label className="setting-label">Quiet Hours End</label>
                    <input
                      type="time"
                      className="setting-input"
                      value={settings.quietHoursEnd}
                      onChange={(e) => handleSettingChange("quietHoursEnd", e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Collection Settings */}
          {activeSection === "collection" && (
            <div className="settings-section">
              <h2 className="section-heading">Collection Settings</h2>
              <p className="section-description">Configure waste collection preferences</p>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Auto-Schedule Collection</label>
                    <p className="setting-help">Automatically schedule collections based on volume</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.autoScheduleCollection}
                      onChange={(e) => handleSettingChange("autoScheduleCollection", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <label className="setting-label">Collection Time Preference</label>
                <select
                  className="setting-select"
                  value={settings.collectionTimePreference}
                  onChange={(e) => handleSettingChange("collectionTimePreference", e.target.value)}
                >
                  <option value="morning">Morning (06:00 - 10:00)</option>
                  <option value="afternoon">Afternoon (13:00 - 17:00)</option>
                  <option value="evening">Evening (18:00 - 22:00)</option>
                  <option value="anytime">Anytime</option>
                </select>
              </div>

              <div className="settings-group">
                <label className="setting-label">Minimum Collection Volume (%)</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="50"
                    max="95"
                    value={settings.minCollectionVolume}
                    onChange={(e) => handleSettingChange("minCollectionVolume", parseInt(e.target.value))}
                    className="setting-slider"
                  />
                  <span className="slider-value">{settings.minCollectionVolume}%</span>
                </div>
                <p className="setting-help">Bins below this threshold won't be included in scheduled collections</p>
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Route Optimization</label>
                    <p className="setting-help">Use ML to optimize collection routes</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.routeOptimization}
                      onChange={(e) => handleSettingChange("routeOptimization", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Bin Configuration */}
          {activeSection === "bins" && (
            <div className="settings-section">
              <h2 className="section-heading">Bin Configuration</h2>
              <p className="section-description">Configure default bin settings and behavior</p>

              <div className="settings-group">
                <label className="setting-label">Default Bin Capacity (Liters)</label>
                <input
                  type="number"
                  className="setting-input"
                  value={settings.defaultBinCapacity}
                  onChange={(e) => handleSettingChange("defaultBinCapacity", parseInt(e.target.value))}
                />
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Auto-Open Enabled</label>
                    <p className="setting-help">Bins automatically open when approached</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.autoOpenEnabled}
                      onChange={(e) => handleSettingChange("autoOpenEnabled", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              {settings.autoOpenEnabled && (
                <div className="settings-group">
                  <label className="setting-label">Auto-Close Delay (seconds)</label>
                  <input
                    type="number"
                    className="setting-input"
                    value={settings.autoCloseDelay}
                    onChange={(e) => handleSettingChange("autoCloseDelay", parseInt(e.target.value))}
                  />
                  <p className="setting-help">Time before bin automatically closes after opening</p>
                </div>
              )}

              <div className="settings-group">
                <label className="setting-label">Sensor Update Interval (seconds)</label>
                <select
                  className="setting-select"
                  value={settings.sensorUpdateInterval}
                  onChange={(e) => handleSettingChange("sensorUpdateInterval", parseInt(e.target.value))}
                >
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                  <option value="300">5 minutes</option>
                </select>
                <p className="setting-help">How often sensors update bin status</p>
              </div>
            </div>
          )}

          {/* Schedule Management */}
          {activeSection === "schedule" && (
            <div className="settings-section">
              <h2 className="section-heading">Schedule Management</h2>
              <p className="section-description">View and manage collection schedules</p>

              <div className="schedule-calendar">
                <div className="calendar-header">
                  <h3>This Week's Schedule</h3>
                  <button className="btn-add-schedule">+ Add Schedule</button>
                </div>
                
                <div className="schedule-list">
                  <div className="schedule-item">
                    <div className="schedule-day">Monday</div>
                    <div className="schedule-details">
                      <span className="schedule-time">08:00 AM</span>
                      <span className="schedule-location">Basement, Lantai 1, Lantai 2</span>
                    </div>
                    <button className="btn-edit">Edit</button>
                  </div>
                  <div className="schedule-item">
                    <div className="schedule-day">Wednesday</div>
                    <div className="schedule-details">
                      <span className="schedule-time">08:00 AM</span>
                      <span className="schedule-location">Lantai 3, Lantai 4, Rooftop</span>
                    </div>
                    <button className="btn-edit">Edit</button>
                  </div>
                  <div className="schedule-item">
                    <div className="schedule-day">Friday</div>
                    <div className="schedule-details">
                      <span className="schedule-time">08:00 AM</span>
                      <span className="schedule-location">All Locations</span>
                    </div>
                    <button className="btn-edit">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard Settings */}
          {activeSection === "dashboard" && (
            <div className="settings-section">
              <h2 className="section-heading">Dashboard Preferences</h2>
              <p className="section-description">Customize your dashboard experience</p>

              <div className="settings-group">
                <label className="setting-label">Auto-Refresh Interval (seconds)</label>
                <select
                  className="setting-select"
                  value={settings.refreshInterval}
                  onChange={(e) => handleSettingChange("refreshInterval", parseInt(e.target.value))}
                >
                  <option value="15">15 seconds</option>
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                  <option value="300">5 minutes</option>
                  <option value="0">Manual only</option>
                </select>
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Show Animations</label>
                    <p className="setting-help">Enable smooth transitions and animations</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.showAnimations}
                      onChange={(e) => handleSettingChange("showAnimations", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Compact Mode</label>
                    <p className="setting-help">Display more information in less space</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.compactMode}
                      onChange={(e) => handleSettingChange("compactMode", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <label className="setting-label">Default View</label>
                <select
                  className="setting-select"
                  value={settings.defaultView}
                  onChange={(e) => handleSettingChange("defaultView", e.target.value)}
                >
                  <option value="grid">Grid View</option>
                  <option value="list">List View</option>
                  <option value="map">Map View</option>
                </select>
              </div>
            </div>
          )}

          {/* Machine Learning Settings */}
          {activeSection === "ml" && (
            <div className="settings-section">
              <h2 className="section-heading">Machine Learning</h2>
              <p className="section-description">Configure ML predictions and optimizations</p>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">ML Predictions</label>
                    <p className="setting-help">Enable machine learning predictions</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.mlPredictionsEnabled}
                      onChange={(e) => handleSettingChange("mlPredictionsEnabled", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Route Optimization</label>
                    <p className="setting-help">Use ML for route optimization</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.routeOptimizationEnabled}
                      onChange={(e) => handleSettingChange("routeOptimizationEnabled", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Capacity Recommendations</label>
                    <p className="setting-help">Get ML-based capacity recommendations</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.capacityRecommendationsEnabled}
                      onChange={(e) => handleSettingChange("capacityRecommendationsEnabled", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <label className="setting-label">Prediction Confidence Threshold (%)</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="50"
                    max="99"
                    value={settings.predictionConfidenceThreshold}
                    onChange={(e) => handleSettingChange("predictionConfidenceThreshold", parseInt(e.target.value))}
                    className="setting-slider"
                  />
                  <span className="slider-value">{settings.predictionConfidenceThreshold}%</span>
                </div>
                <p className="setting-help">Minimum confidence level for displaying predictions</p>
              </div>

              <div className="ml-status-card">
                <h4>ML Model Status</h4>
                <div className="status-grid">
                  <div className="status-item">
                    <span className="status-label">Route Optimization Model</span>
                    <span className="status-badge active">Active</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Fill Prediction Model</span>
                    <span className="status-badge active">Active</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Capacity Planning Model</span>
                    <span className="status-badge active">Active</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Last Updated</span>
                    <span className="status-value">2024-10-31 14:30</span>
                  </div>
                </div>
                <button className="btn-retrain">🔄 Retrain Models</button>
              </div>
            </div>
          )}

          {/* Data & Backup */}
          {activeSection === "data" && (
            <div className="settings-section">
              <h2 className="section-heading">Data & Backup</h2>
              <p className="section-description">Manage data retention and backup settings</p>

              <div className="settings-group">
                <label className="setting-label">Data Retention Period (days)</label>
                <select
                  className="setting-select"
                  value={settings.dataRetentionDays}
                  onChange={(e) => handleSettingChange("dataRetentionDays", parseInt(e.target.value))}
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                  <option value="0">Keep all data</option>
                </select>
                <p className="setting-help">How long to keep historical data before archiving</p>
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Automatic Backup</label>
                    <p className="setting-help">Automatically backup system data</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.autoBackup}
                      onChange={(e) => handleSettingChange("autoBackup", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              {settings.autoBackup && (
                <div className="settings-group">
                  <label className="setting-label">Backup Frequency</label>
                  <select
                    className="setting-select"
                    value={settings.backupFrequency}
                    onChange={(e) => handleSettingChange("backupFrequency", e.target.value)}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              )}

              <div className="backup-actions">
                <button className="btn-action">💾 Create Backup Now</button>
                <button className="btn-action">📥 Restore from Backup</button>
                <button className="btn-action danger">🗑️ Clear Old Data</button>
              </div>

              <div className="backup-info-card">
                <h4>Backup Information</h4>
                <div className="info-row">
                  <span>Last Backup:</span>
                  <span>2024-10-31 03:00 AM</span>
                </div>
                <div className="info-row">
                  <span>Backup Size:</span>
                  <span>2.4 GB</span>
                </div>
                <div className="info-row">
                  <span>Total Backups:</span>
                  <span>30</span>
                </div>
                <div className="info-row">
                  <span>Status:</span>
                  <span className="status-success">Healthy</span>
                </div>
              </div>
            </div>
          )}

          {/* API Configuration */}
          {activeSection === "api" && (
            <div className="settings-section">
              <h2 className="section-heading">API Configuration</h2>
              <p className="section-description">Configure API endpoints and settings</p>

              <div className="settings-group">
                <label className="setting-label">API Timeout (seconds)</label>
                <input
                  type="number"
                  className="setting-input"
                  value={settings.apiTimeout}
                  onChange={(e) => handleSettingChange("apiTimeout", parseInt(e.target.value))}
                />
              </div>

              <div className="settings-group">
                <label className="setting-label">Max Retries</label>
                <input
                  type="number"
                  className="setting-input"
                  value={settings.maxRetries}
                  onChange={(e) => handleSettingChange("maxRetries", parseInt(e.target.value))}
                />
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Rate Limiting</label>
                    <p className="setting-help">Enable API rate limiting</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.enableRateLimiting}
                      onChange={(e) => handleSettingChange("enableRateLimiting", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="api-endpoints-card">
                <h4>API Endpoints</h4>
                <div className="endpoint-item">
                  <span className="endpoint-method get">GET</span>
                  <code>/api/bins</code>
                  <span className="endpoint-status active">Active</span>
                </div>
                <div className="endpoint-item">
                  <span className="endpoint-method post">POST</span>
                  <code>/api/bins/control</code>
                  <span className="endpoint-status active">Active</span>
                </div>
                <div className="endpoint-item">
                  <span className="endpoint-method get">GET</span>
                  <code>/api/ml/predictions</code>
                  <span className="endpoint-status active">Active</span>
                </div>
                <div className="endpoint-item">
                  <span className="endpoint-method post">POST</span>
                  <code>/api/schedule</code>
                  <span className="endpoint-status active">Active</span>
                </div>
              </div>

              <button className="btn-action">📄 View API Documentation</button>
            </div>
          )}

          {/* User Management */}
          {activeSection === "users" && (
            <div className="settings-section">
              <h2 className="section-heading">User Management</h2>
              <p className="section-description">Manage system users and their access</p>

              <button className="btn-add-user">+ Add New User</button>

              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.role.toLowerCase()}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${user.status.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-table-action">Edit</button>
                          <button className="btn-table-action danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <div className="settings-section">
              <h2 className="section-heading">Security Settings</h2>
              <p className="section-description">Manage security and authentication settings</p>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Two-Factor Authentication</label>
                    <p className="setting-help">Require 2FA for all users</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleSettingChange("twoFactorAuth", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <label className="setting-label">Session Timeout (minutes)</label>
                <select
                  className="setting-select"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange("sessionTimeout", parseInt(e.target.value))}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="240">4 hours</option>
                  <option value="480">8 hours</option>
                </select>
              </div>

              <div className="settings-group">
                <label className="setting-label">Password Expiry (days)</label>
                <select
                  className="setting-select"
                  value={settings.passwordExpiry}
                  onChange={(e) => handleSettingChange("passwordExpiry", parseInt(e.target.value))}
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="0">Never</option>
                </select>
              </div>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Login Notifications</label>
                    <p className="setting-help">Notify users of new login attempts</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.loginNotifications}
                      onChange={(e) => handleSettingChange("loginNotifications", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="security-actions">
                <button className="btn-action">🔑 Change Password</button>
                <button className="btn-action">📜 View Security Logs</button>
                <button className="btn-action danger">⚠️ Logout All Devices</button>
              </div>
            </div>
          )}

          {/* Roles & Permissions */}
          {activeSection === "roles" && (
            <div className="settings-section">
              <h2 className="section-heading">Roles & Permissions</h2>
              <p className="section-description">Define user roles and their permissions</p>

              <div className="roles-grid">
                <div className="role-card">
                  <h3>Admin</h3>
                  <p>Full system access</p>
                  <div className="permissions-list">
                    <div className="permission-item">✅ View Dashboard</div>
                    <div className="permission-item">✅ Monitor Bins</div>
                    <div className="permission-item">✅ Control Bins</div>
                    <div className="permission-item">✅ Manage Schedule</div>
                    <div className="permission-item">✅ View Analytics</div>
                    <div className="permission-item">✅ Manage Users</div>
                    <div className="permission-item">✅ System Settings</div>
                  </div>
                  <button className="btn-edit-role">Edit Role</button>
                </div>

                <div className="role-card">
                  <h3>Operator</h3>
                  <p>Operational access</p>
                  <div className="permissions-list">
                    <div className="permission-item">✅ View Dashboard</div>
                    <div className="permission-item">✅ Monitor Bins</div>
                    <div className="permission-item">✅ Control Bins</div>
                    <div className="permission-item">✅ Manage Schedule</div>
                    <div className="permission-item">✅ View Analytics</div>
                    <div className="permission-item">❌ Manage Users</div>
                    <div className="permission-item">❌ System Settings</div>
                  </div>
                  <button className="btn-edit-role">Edit Role</button>
                </div>

                <div className="role-card">
                  <h3>Viewer</h3>
                  <p>Read-only access</p>
                  <div className="permissions-list">
                    <div className="permission-item">✅ View Dashboard</div>
                    <div className="permission-item">✅ Monitor Bins</div>
                    <div className="permission-item">❌ Control Bins</div>
                    <div className="permission-item">❌ Manage Schedule</div>
                    <div className="permission-item">✅ View Analytics</div>
                    <div className="permission-item">❌ Manage Users</div>
                    <div className="permission-item">❌ System Settings</div>
                  </div>
                  <button className="btn-edit-role">Edit Role</button>
                </div>
              </div>

              <button className="btn-add-user">+ Create New Role</button>
            </div>
          )}

          {/* Integrations */}
          {activeSection === "integrations" && (
            <div className="settings-section">
              <h2 className="section-heading">Integrations</h2>
              <p className="section-description">Connect with third-party services</p>

              <div className="integrations-grid">
                <div className="integration-card">
                  <div className="integration-icon">📧</div>
                  <h3>Email Service</h3>
                  <p>Send notifications via email</p>
                  <div className="integration-status connected">Connected</div>
                  <button className="btn-configure">Configure</button>
                </div>

                <div className="integration-card">
                  <div className="integration-icon">💬</div>
                  <h3>Slack</h3>
                  <p>Get alerts in Slack channels</p>
                  <div className="integration-status">Not Connected</div>
                  <button className="btn-configure">Connect</button>
                </div>

                <div className="integration-card">
                  <div className="integration-icon">📱</div>
                  <h3>SMS Gateway</h3>
                  <p>Send SMS notifications</p>
                  <div className="integration-status">Not Connected</div>
                  <button className="btn-configure">Connect</button>
                </div>

                <div className="integration-card">
                  <div className="integration-icon">📊</div>
                  <h3>Google Sheets</h3>
                  <p>Export data to Google Sheets</p>
                  <div className="integration-status">Not Connected</div>
                  <button className="btn-configure">Connect</button>
                </div>

                <div className="integration-card">
                  <div className="integration-icon">🤖</div>
                  <h3>Webhook</h3>
                  <p>Custom webhook integrations</p>
                  <div className="integration-status connected">Connected</div>
                  <button className="btn-configure">Configure</button>
                </div>
              </div>
            </div>
          )}

          {/* Maintenance */}
          {activeSection === "maintenance" && (
            <div className="settings-section">
              <h2 className="section-heading">System Maintenance</h2>
              <p className="section-description">Perform system maintenance tasks</p>

              <div className="settings-group">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <label className="setting-label">Maintenance Mode</label>
                    <p className="setting-help">Put system in maintenance mode (users can't access)</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleSettingChange("maintenanceMode", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="maintenance-actions-grid">
                <div className="maintenance-action-card">
                  <h4>🔄 Clear Cache</h4>
                  <p>Clear system cache to improve performance</p>
                  <button className="btn-action">Clear Cache</button>
                </div>

                <div className="maintenance-action-card">
                  <h4>🗃️ Optimize Database</h4>
                  <p>Optimize database tables and indexes</p>
                  <button className="btn-action">Optimize</button>
                </div>

                <div className="maintenance-action-card">
                  <h4>📊 System Health Check</h4>
                  <p>Run comprehensive system diagnostics</p>
                  <button className="btn-action">Run Check</button>
                </div>

                <div className="maintenance-action-card">
                  <h4>🔄 Restart Services</h4>
                  <p>Restart all system services</p>
                  <button className="btn-action danger">Restart</button>
                </div>
              </div>

              <div className="system-info-card">
                <h4>System Information</h4>
                <div className="info-row">
                  <span>Version:</span>
                  <span>1.0.0</span>
                </div>
                <div className="info-row">
                  <span>Uptime:</span>
                  <span>15 days, 4 hours</span>
                </div>
                <div className="info-row">
                  <span>Database Size:</span>
                  <span>1.2 GB</span>
                </div>
                <div className="info-row">
                  <span>Active Connections:</span>
                  <span>24</span>
                </div>
              </div>
            </div>
          )}

          {/* System Logs */}
          {activeSection === "logs" && (
            <div className="settings-section">
              <h2 className="section-heading">System Logs</h2>
              <p className="section-description">View system activity and error logs</p>

              <div className="logs-filters">
                <select className="log-filter-select">
                  <option value="all">All Logs</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
                <input type="date" className="log-date-filter" />
                <button className="btn-refresh-logs">🔄 Refresh</button>
                <button className="btn-export-logs">📥 Export</button>
              </div>

              <div className="logs-container">
                <div className="log-entry info">
                  <span className="log-time">2024-10-31 15:30:25</span>
                  <span className="log-level">INFO</span>
                  <span className="log-message">User 'admin' logged in successfully</span>
                </div>
                <div className="log-entry info">
                  <span className="log-time">2024-10-31 15:28:10</span>
                  <span className="log-level">INFO</span>
                  <span className="log-message">Bin #4 volume updated: 92%</span>
                </div>
                <div className="log-entry warning">
                  <span className="log-time">2024-10-31 15:25:43</span>
                  <span className="log-level">WARNING</span>
                  <span className="log-message">Bin #4 approaching capacity (92%)</span>
                </div>
                <div className="log-entry info">
                  <span className="log-time">2024-10-31 15:20:15</span>
                  <span className="log-level">INFO</span>
                  <span className="log-message">Collection schedule created for 2024-11-01</span>
                </div>
                <div className="log-entry error">
                  <span className="log-time">2024-10-31 15:15:00</span>
                  <span className="log-level">ERROR</span>
                  <span className="log-message">Sensor connection failed for Bin #8</span>
                </div>
                <div className="log-entry info">
                  <span className="log-time">2024-10-31 15:10:30</span>
                  <span className="log-level">INFO</span>
                  <span className="log-message">ML prediction model updated successfully</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}