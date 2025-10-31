// components/VolumeChart.jsx
// Komponen untuk menampilkan grafik volume tempat sampah

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '@/style/VolumeChart.css';

export default function VolumeChart({ binId, period = '7days' }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      initChart();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [binId, period]);

  const initChart = () => {
    const ctx = chartRef.current.getContext('2d');
    
    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Generate sample data based on period
    const data = generateChartData(period);

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Volume (%)',
            data: data.volumes,
            borderColor: '#42aee0',
            backgroundColor: 'rgba(66, 174, 224, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#42aee0',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 6
          },
          {
            label: 'Threshold',
            data: data.threshold,
            borderColor: '#ff9900',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [10, 5],
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
                family: 'Inter'
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#42aee0',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            displayColors: true,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y + '%';
                }
                return label;
              },
              afterLabel: function(context) {
                if (context.datasetIndex === 0) {
                  const volume = context.parsed.y;
                  if (volume >= 80) {
                    return '⚠️ Perlu dikosongkan';
                  } else if (volume >= 60) {
                    return '📊 Hampir penuh';
                  }
                  return '✅ Normal';
                }
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: function(value) {
                return value + '%';
              },
              font: {
                size: 11
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            }
          },
          x: {
            ticks: {
              font: {
                size: 11
              },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 10
            },
            grid: {
              display: false
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        elements: {
          line: {
            borderJoinStyle: 'round'
          }
        }
      }
    });
  };

  const generateChartData = (period) => {
    const now = new Date();
    const labels = [];
    const volumes = [];
    const threshold = [];

    if (period === '24hours') {
      // Data per jam untuk 24 jam terakhir
      for (let i = 23; i >= 0; i--) {
        const hour = new Date(now - i * 60 * 60 * 1000);
        labels.push(hour.getHours() + ':00');
        
        // Simulasi data volume dengan pola harian
        const baseVolume = 30;
        const variation = Math.sin((hour.getHours() - 6) * Math.PI / 12) * 30;
        const randomNoise = Math.random() * 10 - 5;
        volumes.push(Math.max(0, Math.min(100, baseVolume + variation + randomNoise + i * 2)));
        threshold.push(80);
      }
    } else if (period === '7days') {
      // Data per hari untuk 7 hari terakhir
      const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now - i * 24 * 60 * 60 * 1000);
        labels.push(days[date.getDay()]);
        
        // Simulasi data dengan tren mingguan
        const baseVolume = 40;
        const weekdayBonus = (date.getDay() >= 1 && date.getDay() <= 5) ? 20 : 0;
        const randomNoise = Math.random() * 15 - 7.5;
        volumes.push(Math.max(0, Math.min(100, baseVolume + weekdayBonus + randomNoise)));
        threshold.push(80);
      }
    } else if (period === '30days') {
      // Data per hari untuk 30 hari terakhir
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now - i * 24 * 60 * 60 * 1000);
        labels.push(date.getDate() + '/' + (date.getMonth() + 1));
        
        // Simulasi data bulanan
        const baseVolume = 45;
        const monthlyTrend = (30 - i) * 0.5;
        const randomNoise = Math.random() * 20 - 10;
        volumes.push(Math.max(0, Math.min(100, baseVolume + monthlyTrend + randomNoise)));
        threshold.push(80);
      }
    }

    return { labels, volumes, threshold };
  };

  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

