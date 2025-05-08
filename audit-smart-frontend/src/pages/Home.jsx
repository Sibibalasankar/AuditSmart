import ValueProposition from '../components/ValueProposition';
import WorkflowSteps from '../components/WorkflowSteps';
import Phase2Teaser from '../components/Phase2Teaser';
import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="home-container">
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
              />
              <button className="analyze-btn">
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
     

      {/* Value Proposition Section */}
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