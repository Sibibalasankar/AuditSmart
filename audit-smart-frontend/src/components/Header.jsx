import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Option 1: Use Firebase authentication
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setIsOpen(false);
      
      // Option 2: Or decode JWT directly if not using Firebase
      // const decoded = jwtDecode(credentialResponse.credential);
      // console.log(decoded);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('Logout success');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="AuditSmart-LOGO.png" alt="Logo" className="logo-img" width={45} />
          <span className="gradient-text">Audit</span>Smart
        </Link>
        
        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/audit">Audit</Link>
          <Link to="/sample-report">Sample Report</Link>
          
          {user ? (
            <div className="user-profile">
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="profile-pic"
                referrerPolicy="no-referrer"
              />
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com">
              <div className="google-login-container">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.log('Login Failed')}
                  useOneTap
                  theme="filled_black"
                  shape="pill"
                  size="medium"
                  text="signin_with"
                  locale="en"
                />
              </div>
            </GoogleOAuthProvider>
          )}
        </nav>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}