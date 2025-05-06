import ValueProposition from '../components/ValueProposition';
import WorkflowSteps from '../components/WorkflowSteps';
import Phase2Teaser from '../components/Phase2Teaser';
import './Home.css';

export default function Home() {
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
            <button className="primary-btn">Start Free Audit</button>
            <button className="secondary-btn">See Sample Report</button>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="section-wrapper">
        <ValueProposition />
      </section>

      {/* Workflow Steps Section */}
      <section className="section-wrapper">
        <WorkflowSteps />
      </section>

      {/* Phase 2 Teaser Section */}
      <section className="section-wrapper">
        <Phase2Teaser />
      </section>
    </main>
  );
}