import { useState } from 'react';
import ValueProposition from '../components/ValueProposition';
import WorkflowSteps from '../components/WorkflowSteps';
import Phase2Teaser from '../components/Phase2Teaser';
import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAuditClick = () => {
    if (contractAddress.trim()) {
      setIsAnimating(true);
      setShowComingSoon(true);
      setTimeout(() => setIsAnimating(false), 1000);
      setTimeout(() => setShowComingSoon(false), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAuditClick();
  };

  // Generate random particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.05,
    duration: Math.random() * 3 + 2
  }));

  return (
    <main className="home-container">
      {/* Full-screen overlay */}
      {showComingSoon && (
        <div className="fullscreen-overlay">
          <div className={`coming-soon-container ${isAnimating ? 'animate-in' : ''}`}>
            <div className="coming-soon-message">
              <h2 className="gradient-text">Coming Soon!</h2>
              <p>This feature will be available in Phase 2</p>
              <button 
                className="close-btn"
                onClick={() => setShowComingSoon(false)}
              >
                ×
              </button>
            </div>
            <div className="particle-overlay">
              {particles.map((particle) => (
                <div 
                  key={particle.id}
                  className="particle"
                  style={{
                    '--size': `${particle.size}px`,
                    '--x': `${particle.x}%`,
                    '--y': `${particle.y}%`,
                    '--delay': `${particle.delay}s`,
                    '--duration': `${particle.duration}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text scroll-effect">
            <h1>
              <span className="gradient-text">One-Click</span> Smart Contract Audits
            </h1>
            <p className="subtitle scroll-effect delay-1">
              AI-powered security analysis for Solidity contracts
            </p>
          </div>
          <div className="cta-container scroll-effect delay-2">
            <button className="primary-btn" onClick={() => navigate('/audit')}>
              Start Free Audit
            </button>
            <button className="secondary-btn">See Sample Report</button>
          </div>

          {/* Contract Address Input Section */}
          <div className="contract-input-container scroll-effect delay-3">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter deployed contract address (0x...)"
                className="contract-input"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className={`analyze-btn ${isAnimating ? 'pulse-effect' : ''}`}
                onClick={handleAuditClick}
              >
                Audit Contract
                <svg className="analyze-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 12H4.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p className="input-note">We support Ethereum, Polygon, BSC, and other EVM-compatible chains</p>
          </div>
        </div>
      </section>

      {/* Other sections remain the same */}
      <section className="section-wrapper">
        <ValueProposition />
      </section>
      <section className="marquee-container">
        <div className="marquee-text">
          🤝 We're excited to announce our collaboration with Layer One X to power the future of smart contract audits through AuditSmartAI!
        </div>
      </section>

      {/* Workflow Steps Section */}
      <section className="section-wrapper">
        <WorkflowSteps />
      </section>
      <section className="marquee-container">
        <div className="marquee-text">
          🤝 We're excited to announce our collaboration with Layer One X to power the future of smart contract audits through AuditSmartAI!
        </div>
      </section>

      {/* Phase 2 Teaser Section */}
      <section className="section-wrapper">
        <Phase2Teaser />
      </section>
    </main>
  );
}