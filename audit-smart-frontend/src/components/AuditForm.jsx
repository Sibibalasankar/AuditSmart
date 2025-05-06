import { useState } from 'react';
import './AuditForm.css';

export default function AuditForm() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="audit-form">
      <div 
        className={`file-upload ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="contract-upload" 
          accept=".sol"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="contract-upload">
          <div className="upload-content">
            {file ? (
              <>
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </>
            ) : (
              <>
                <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p className="upload-text">
                  Drag & drop your Solidity file here<br />
                  or <span className="browse-link">browse files</span>
                </p>
                <p className="upload-hint">Supports .sol files only</p>
              </>
            )}
          </div>
        </label>
      </div>

      <button 
        type="submit" 
        className={`submit-btn ${!file || isAnalyzing ? 'disabled' : ''}`}
        disabled={!file || isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <span className="spinner"></span>
            Analyzing...
          </>
        ) : 'Start Audit'}
      </button>

      {isAnalyzing && (
        <div className="progress-container">
          <div className="progress-indicator">
            <div className="progress-bar"></div>
          </div>
          <p className="progress-text">Scanning for vulnerabilities...</p>
        </div>
      )}
    </form>
  );
}