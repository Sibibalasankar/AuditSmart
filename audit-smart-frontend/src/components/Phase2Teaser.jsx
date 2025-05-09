import { Key, Wand2, PieChart, Lock, X } from 'lucide-react'
import './Phase2Teaser.css'
import { useEffect, useRef, useState } from 'react'

export default function Phase2Teaser() {
  const tokenRef = useRef(null)
  const tokenContainerRef = useRef(null)
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  useEffect(() => {
    const token = tokenRef.current
    const container = tokenContainerRef.current
    if (!token || !container) return

    // Floating animation
    const floatAnimation = () => {
      const time = Date.now() * 0.001
      const y = Math.sin(time * 0.5) * 8
      const rotation = Math.sin(time * 0.3) * 8
      token.style.transform = `translateY(${y}px) rotate(${rotation}deg)`
      requestAnimationFrame(floatAnimation)
    }

    floatAnimation()

    // 3D transform on mouse move
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateY = (x - centerX) / 20
      const rotateX = (centerY - y) / 20
      const scale = 1.1
      
      token.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
        translateZ(30px)
      `
      token.style.filter = 'drop-shadow(0 0 20px rgba(110, 72, 170, 0.8))'
      token.style.transition = 'transform 0.1s ease, filter 0.3s ease'
    }

    const handleMouseLeave = () => {
      token.style.transform = ''
      token.style.filter = 'drop-shadow(0 0 12px rgba(110, 72, 170, 0.5))'
      token.style.transition = 'transform 0.5s ease, filter 0.3s ease'
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(floatAnimation)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Submitted email:', email)
    setSubmitted(true)
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
      setShowWaitlistModal(false)
    }, 3000)
  }

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
        <div className='main-cont'>
          {/* Animated Token Image */}
          <div className="token-container" ref={tokenContainerRef}>
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
        <button 
          className="waitlist-btn"
          onClick={() => setShowWaitlistModal(true)}
        >
          Join Waitlist
        </button>
      </div>

      {/* Waitlist Modal */}
<div className={`waitlist-modal ${showWaitlistModal ? 'active' : ''}`}>
  <div className="waitlist-modal-content">
    <button 
      className="close-modal"
      onClick={() => setShowWaitlistModal(false)}
    >
      <X size={24} />
    </button>
    
    <h3>Join the AST Waitlist</h3>
    
    {submitted ? (
      <div className="success-message">
        <p>Thank you for joining the waitlist!</p>
        <p>We'll notify you when AST launches.</p>
      </div>
    ) : (
      <>
        <p>Be the first to get access to AuditSmart Tokens when we launch.</p>
        <p>Early subscribers will receive exclusive benefits.</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
        
        <div className="waitlist-benefits">
          <h4>Waitlist Benefits:</h4>
          <ul>
            <li>Early access to token purchase</li>
            <li>Bonus tokens for early subscribers</li>
            <li>Exclusive NFT airdrop opportunity</li>
            <li>Priority access to premium features</li>
          </ul>
        </div>
      </>
    )}
  </div>
</div>
    </section>
  )
}