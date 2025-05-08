import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [scrolled, setScrolled] = useState(false);
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
      } catch (err) {
        console.error('Wallet connection error:', err);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask.');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  const truncateAddress = (addr) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <img src="/AuditSmart-LOGO.png" alt="AuditSmart AI Logo" width={50} />
          </div>
          <span className="logo-text">
            <span className="gradient-text">Audit</span>Smart <span className='ai-txt'>AI</span>
          </span>
        </Link>

        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/audit" 
            className={location.pathname === '/audit' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Audit
          </Link>
          <Link 
            to="/sample-report" 
            className={location.pathname === '/sample-report' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Sample Report
          </Link>

          {walletAddress ? (
            <div className="user-profile">
              <div className="profile-badge">
                <span className="wallet-address">{truncateAddress(walletAddress)}</span>
              </div>
              <button onClick={disconnectWallet} className="logout-btn">
                <span>Disconnect</span>
              </button>
            </div>
          ) : (
            <button onClick={connectWallet} className="google-signin-btn">
              <span>Connect Wallet</span>
            </button>
          )}
        </nav>

        <button 
          className={`mobile-menu-btn ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
}