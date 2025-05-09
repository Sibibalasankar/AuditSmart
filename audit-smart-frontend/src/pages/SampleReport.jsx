import React from 'react'
import './SampleReport.css'

const SampleReport = () => {
  // Sample data for the report
  const reportData = [
    { id: 1, metric: 'Total Users', value: '1,245', change: '+12%', trend: 'up' },
    { id: 2, metric: 'Conversion Rate', value: '3.2%', change: '+0.4%', trend: 'up' },
    { id: 3, metric: 'Avg. Session', value: '2m 45s', change: '-15s', trend: 'down' },
    { id: 4, metric: 'Bounce Rate', value: '42%', change: '-3%', trend: 'down' },
  ];

  return (
    <div className="report-container">


      <header className="report-header">
        <h1 className="gradient-text">Analytics Dashboard</h1>
        <p className="subtitle">Monthly Performance Report - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </header>

      <div className="metrics-grid">
        {reportData.map(item => (
          <div key={item.id} className="metric-card">
            <div className="metric-info">
              <h3>{item.metric}</h3>
              <p className="metric-value">{item.value}</p>
            </div>
            <div className={`metric-change ${item.trend}`}>
              <span>{item.change}</span>
              <span className={`trend-icon ${item.trend}`}>
                {item.trend === 'up' ? '↑' : '↓'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <h2>User Growth Over Time</h2>
        <div className="chart-placeholder">
          <div className="chart-visualization">
            {/* X-axis */}
            <div className="chart-axis x-axis">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>

            {/* Y-axis */}
            <div className="chart-axis y-axis">
              <span>2K</span>
              <span>1.5K</span>
              <span>1K</span>
              <span>500</span>
              <span>0</span>
            </div>

            {/* Chart grid */}
            <div className="chart-grid">
              {[...Array(5)].map((_, i) => (
                <div key={`grid-line-${i}`} className="grid-line"></div>
              ))}
            </div>

            {/* Data line with animation */}
            <div className="data-line">
              <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
                <path
                  d="M0,200 L50,150 L100,180 L150,120 L200,100 L250,80 L300,50 L350,100 L400,70 L450,30 L500,60"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  className="animate-line"
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6e45e2" />
                    <stop offset="100%" stopColor="#88d3ce" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Data points */}
            <div className="data-points">
              {[50, 150, 180, 120, 100, 80, 50, 100, 70, 30, 60].map((value, i) => (
                <div
                  key={`point-${i}`}
                  className="data-point"
                  style={{
                    left: `${i * 10}%`,
                    bottom: `${value}px`
                  }}
                >
                  <div className="point-tooltip">{`${1000 - value} users`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      <div className="report-footer">
        <div className="cta-container">
          <button className="primary-btn">Export Full Report</button>
          <button className="secondary-btn">Schedule Delivery</button>
        </div>
      </div>
    </div>
  )
}

export default SampleReport


