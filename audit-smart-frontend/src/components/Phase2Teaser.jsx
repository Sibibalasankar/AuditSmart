import { Key, Wand2, PieChart, Lock } from 'lucide-react'
import './Phase2Teaser.css'

export default function Phase2Teaser() {
  const features = [
    {
      icon: <Key size={24} />,
      title: "Premium Reports",
      description: "Full detailed audit reports"
    },
    {
      icon: <Wand2 size={24} />,
      title: "Auto-Fixed Contracts",
      description: "One-click corrected versions"
    },
    {
      icon: <PieChart size={24} />,
      title: "Advanced Analytics",
      description: "Security scoring over time"
    },
    {
      icon: <Lock size={24} />,
      title: "NFT-Gated Access",
      description: "Special features for DAOs"
    }
  ]

  return (
    <section className="phase2-teaser">
      <div className="container">
        <h2>Coming Soon: <span className="gradient-text">AuditSmart Tokens (AST)</span></h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <button className="waitlist-btn">Join Waitlist</button>
      </div>
    </section>
  )
}