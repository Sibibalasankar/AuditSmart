import './Footer.css';

// Make sure you have DEFAULT export
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} AuditSmart. All rights reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}