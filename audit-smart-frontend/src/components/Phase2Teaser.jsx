import { Key, Wand2, PieChart, Lock } from 'lucide-react'
import './Phase2Teaser.css'
import { useEffect, useRef } from 'react'

export default function Phase2Teaser() {
  const tokenRef = useRef(null)
  
  useEffect(() => {
    const token = tokenRef.current
    if (!token) return

    // Floating animation
    const floatAnimation = () => {
      const time = Date.now() * 0.001
      const y = Math.sin(time * 0.5) * 8 // Increased float distance
      const rotation = Math.sin(time * 0.3) * 8 // Slightly more rotation
      token.style.transform = `translateY(${y}px) rotate(${rotation}deg)`
      requestAnimationFrame(floatAnimation)
    }

    floatAnimation()

    // Glow effect on hover
    const handleMouseEnter = () => {
      token.style.filter = 'drop-shadow(0 0 20px rgba(110, 72, 170, 0.8))'
      token.style.transition = 'filter 0.3s ease, transform 0.3s ease'
      token.style.transform = 'scale(1.1)'
    }

    const handleMouseLeave = () => {
      token.style.filter = 'drop-shadow(0 0 12px rgba(110, 72, 170, 0.5))'
      token.style.transform = ''
    }

    token.addEventListener('mouseenter', handleMouseEnter)
    token.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(floatAnimation)
      token.removeEventListener('mouseenter', handleMouseEnter)
      token.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

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
      <div className="container ">
        <div className='main-cont'>
          {/* Animated Token Image */}
        <div className="token-container">
          <img 
            ref={tokenRef}
            src="/AS Token.png" 
            alt="AuditSmart Token" 
            className="animated-token"
          />
        </div>
        <h2>Coming Soon: <span className="gradient-text">AuditSmart Tokens (AST)</span></h2>
        
        
        </div>
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