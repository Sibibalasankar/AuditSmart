import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isHoveringConnect, setIsHoveringConnect] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setIsOpen(false);
        
        // Add success animation class temporarily
        const btn = document.querySelector('.connect-wallet-btn');
        btn.classList.add('success-animation');
        setTimeout(() => btn.classList.remove('success-animation'), 2000);
      } catch (err) {
        console.error('Wallet connection error:', err);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask.');
    }
  };

  const disconnectWallet = () => {
    // Add disconnect animation
    const btn = document.querySelector('.user-profile');
    btn.classList.add('disconnect-animation');
    setTimeout(() => {
      setWalletAddress(null);
      btn.classList.remove('disconnect-animation');
    }, 500);
  };

  const truncateAddress = (addr) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-decoration"></div>
      <div className="container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <img 
              src="/AuditSmart-LOGO.png" 
              alt="AuditSmart AI Logo" 
              width={50} 
              className="logo-pulse"
            />
          </div>
          <span className="logo-text">
            <span className="gradient-text">Audit</span><span>Smart</span><span className='ai-txt'>AI</span>
          </span>
        </Link>

        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/audit" 
            className={`nav-link ${location.pathname === '/audit' ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Audit
          </Link>
          <Link 
            to="/sample-report" 
            className={`nav-link ${location.pathname === '/sample-report' ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Sample Report
          </Link>

          {walletAddress ? (
            <div className="user-profile">
              <div className="profile-badge glow-on-hover">
                <span className="wallet-address">{truncateAddress(walletAddress)}</span>
              </div>
              <button onClick={disconnectWallet} className="logout-btn gradient-hover">
                <span>Disconnect</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={connectWallet} 
              className="connect-wallet-btn gradient-hover"
              onMouseEnter={() => setIsHoveringConnect(true)}
              onMouseLeave={() => setIsHoveringConnect(false)}
            >
              <span>Connect Wallet</span>
              {isHoveringConnect && (
                <div className="connect-ripple"></div>
              )}
            </button>
          )}
        </nav>

        <button 
          className={`mobile-menu-btn ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={28} className="menu-icon-animate" />
          ) : (
            <Menu size={28} className="menu-icon-animate" />
          )}
        </button>
      </div>
    </header>
  );
}