import { useState, useEffect } from 'react';
import './AuditForm.css';

export default function AuditForm() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('vulnerabilities');
  const [progress, setProgress] = useState(0);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedCode, setPastedCode] = useState('');
  const [activeUploadMethod, setActiveUploadMethod] = useState('file');

  useEffect(() => {
    if (!isAnalyzing) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

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
      setActiveUploadMethod('file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !pastedCode) return;

    setIsAnalyzing(true);
    setError(null);
    setResults(null);
    setProgress(0);

    try {
      const formData = new FormData();

      if (file) {
        formData.append('file', file);
      } else if (pastedCode) {
        const blob = new Blob([pastedCode], { type: 'text/plain' });
        formData.append('file', blob, 'pasted_contract.sol');
      }

      const response = await fetch('http://localhost:8000/audit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Audit failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
      setProgress(100);
    } catch (err) {
      setError(err.message || "An unknown error occurred during analysis");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePasteSubmit = () => {
    if (pastedCode.trim()) {
      setShowPasteModal(false);
      setActiveUploadMethod('paste');
      setFile(new File([pastedCode], "pasted_contract.sol", { type: "text/plain" }));
    }
  };

  return (
    <div className="audit-dashboard">
      <div className="dashboard-header">
        <h1>
          <span className="gradient-text">AI-Powered</span>
          <span className="gradient-text-accent">Smart Contract Audits</span>
        </h1>
        <p className="subtitle">
          Uncover hidden vulnerabilities and optimize your Solidity code with blazing-fast, enterprise-grade security intelligence.
        </p>
      </div>


      <div className="vertical-layout">
        {/* Upload Section */}
        <div className="upload-section">
          <form onSubmit={handleSubmit} className="audit-form">
            <div className="form-header">
              <div className="form-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h2>Upload Contract</h2>
              <p className="form-description">Upload your Solidity contract for comprehensive security analysis</p>
            </div>

            <div className="upload-method-tabs">
              <button
                type="button"
                className={`method-tab ${activeUploadMethod === 'file' ? 'active' : ''}`}
                onClick={() => setActiveUploadMethod('file')}
              >
                Upload File
              </button>
              <button
                type="button"
                className={`method-tab ${activeUploadMethod === 'paste' ? 'active' : ''}`}
                onClick={() => {
                  setShowPasteModal(true);
                  setActiveUploadMethod('paste');
                }}
              >
                Paste Code
              </button>
            </div>

            {activeUploadMethod === 'file' ? (
              <div
                className={`file-upload ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <input
                  type="file"
                  id="contract-upload"
                  accept=".sol"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setActiveUploadMethod('file');
                  }}
                />
                <label htmlFor="contract-upload">
                  <div className="upload-content">
                    {file ? (
                      <>
                        <div className="file-preview">
                          <svg className="file-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                        </div>
                        <div className="file-info">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">
                            {(file.size / 1024).toFixed(2)} KB
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="upload-icon-container">
                          <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        </div>
                        <div className="upload-text-container">
                          <p className="upload-text">
                            <span className="browse-link">Click to upload</span> or drag and drop
                          </p>
                          <p className="upload-hint">Solidity (.sol) files only</p>
                        </div>
                      </>
                    )}
                  </div>
                </label>
                {file && (
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={() => {
                      setFile(null);
                      setPastedCode('');
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <div className="paste-preview">
                {file ? (
                  <div className="code-preview">
                    <pre>{pastedCode.substring(0, 200)}{pastedCode.length > 200 ? '...' : ''}</pre>
                    <button
                      type="button"
                      className="edit-paste-btn"
                      onClick={() => setShowPasteModal(true)}
                    >
                      Edit Code
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="paste-placeholder"
                    onClick={() => setShowPasteModal(true)}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                    <span>Click to paste Solidity code</span>
                  </button>
                )}
              </div>
            )}

            <button
              type="submit"
              className={`submit-btn ${(!file && !pastedCode) || isAnalyzing ? 'disabled' : ''}`}
              disabled={(!file && !pastedCode) || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg className="submit-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  Start Audit
                </>
              )}
            </button>

            {isAnalyzing && (
              <div className="progress-container">
                <div className="progress-indicator">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="progress-text">
                  Scanning for vulnerabilities... {Math.min(100, Math.round(progress))}%
                </p>
              </div>
            )}
          </form>

          {error && (
            <div className="error-message">
              <div className="error-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12" y2="16"></line>
                </svg>
              </div>
              <div className="error-content">
                <h3>Analysis Failed</h3>
                <p>{error}</p>
              </div>
              <button
                className="error-close"
                onClick={() => setError(null)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <div className="results-section">
            <div className="results-panel">
              <div className="results-header">
                <h2>
                  <span className="gradient-text">Audit</span>
                  <span className="gradient-text-accent">Results</span>
                </h2>
                <div className={`summary-badge ${results.vulnerabilities?.length ? 'critical' : 'success'}`}>
                  {results.vulnerabilities?.length ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      </svg>
                      {results.vulnerabilities.length} Issues Found
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      No Issues Found
                    </>
                  )}
                </div>
              </div>

              <div className="results-tabs">
                <button
                  className={`tab-btn ${activeTab === 'vulnerabilities' ? 'active' : ''}`}
                  onClick={() => setActiveTab('vulnerabilities')}
                >
                  Vulnerabilities
                  {results.vulnerabilities?.length > 0 && (
                    <span className="tab-badge">{results.vulnerabilities.length}</span>
                  )}
                </button>
                <button
                  className={`tab-btn ${activeTab === 'fixed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('fixed')}
                  disabled={!results.fixed_code}
                >
                  Fixed Code
                </button>
                <button
                  className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
                  onClick={() => setActiveTab('report')}
                >
                  Full Report
                </button>
              </div>

              <div className="results-content">
                {activeTab === 'vulnerabilities' && (
                  <div className="tab-pane">
                    {results.vulnerabilities?.length > 0 ? (
                      <div className="vulnerability-grid">
                        {results.vulnerabilities.map((vuln, index) => (
                          <div
                            key={index}
                            className={`vulnerability-card severity-${vuln.severity?.toLowerCase() || 'medium'}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="vulnerability-header">
                              <span className="severity-indicator"></span>
                              <h4>{vuln.vulnerability || 'Unknown Vulnerability'}</h4>
                              <span className="confidence-badge">
                                {vuln.confidence || 'N/A'} confidence
                              </span>
                            </div>
                            <div className="vulnerability-content">
                              <p>{vuln.description || 'No description available.'}</p>
                              {vuln.recommendation && (
                                <div className="recommendation">
                                  <strong>Recommendation:</strong> {vuln.recommendation}
                                </div>
                              )}
                            </div>
                            {vuln.line && (
                              <div className="vulnerability-footer">
                                <span className="location">
                                  Line {vuln.line}
                                  {vuln.contract && ` in ${vuln.contract}`}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-vulnerabilities">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3>No vulnerabilities found!</h3>
                        <p>Your contract passed all security checks</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'fixed' && results.fixed_code && (
                  <div className="tab-pane">
                    <div className="code-container">
                      <div className="code-header">
                        <span>SOLIDITY</span>
                        <div className="code-actions">
                          <button
                            className="code-action-btn"
                            onClick={() => {
                              navigator.clipboard.writeText(results.fixed_code);
                              const btn = document.querySelector('.code-action-btn');
                              btn.textContent = 'Copied!';
                              setTimeout(() => {
                                btn.innerHTML = `
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                  </svg>
                                  Copy
                                `;
                              }, 2000);
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy
                          </button>
                          <a
                            href={`http://localhost:8000/${results.fixed_contract_path}`}
                            download
                            className="code-action-btn primary"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download
                          </a>
                        </div>
                      </div>
                      <pre className="code-block">
                        <code>{results.fixed_code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {activeTab === 'report' && (
                  <div className="tab-pane">
                    <div className="report-card">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <h3>Complete Audit Report</h3>
                      <p>Download the full PDF report with detailed analysis of all findings and recommendations.</p>
                      <a
                        href={`http://localhost:8000/${results.report_path}`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="report-download-btn"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download Full Report
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Paste Code Modal */}
      {showPasteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Paste Solidity Code</h3>
              <button
                className="modal-close"
                onClick={() => setShowPasteModal(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <textarea
                className="code-textarea"
                value={pastedCode}
                onChange={(e) => setPastedCode(e.target.value)}
                placeholder="Paste your Solidity contract code here..."
                autoFocus
              />
            </div>
            <div className="modal-footer">
              <button
                className="modal-cancel"
                onClick={() => setShowPasteModal(false)}
              >
                Cancel
              </button>
              <button
                className="modal-submit"
                onClick={handlePasteSubmit}
                disabled={!pastedCode.trim()}
              >
                Submit Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}