import './ScanResultScreen.css';

export default function ScanResultScreen({ onBack, onViewTreatment }) {
  return (
    <div className="scan-result-screen">
      {/* Header with Back Arrow */}
      <header className="scan-result-header">
        <button
          type="button"
          className="scan-result-back-btn"
          onClick={onBack}
          aria-label="Go back"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0f766e"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </header>

      {/* Main Title */}
      <h1 className="scan-result-title">Cauliflower</h1>

      {/* Detected Issues Section */}
      <div className="scan-result-section">
        <h2 className="section-heading">Detected Issues</h2>

        {/* Issue Card 1 */}
        <div className="issue-card">
          <div className="issue-card-header">
            <h3 className="issue-title">Downy Mildew</h3>
            <span className="severity-tag">Moderate</span>
          </div>
          <p className="issue-description">
            Pale yellow spots on upper leaf surfaces, grayish mold underside. Lower leaves show the most damage.
          </p>
          <div className="issue-metrics">
            <div className="metric-item">
              <span className="metric-icon">⚡</span>
              <div className="metric-info">
                <span className="metric-label">Severity</span>
                <span className="metric-value">Moderate</span>
              </div>
            </div>
            <div className="metric-item">
              <span className="metric-icon">🕒</span>
              <div className="metric-info">
                <span className="metric-label">Action</span>
                <span className="metric-value">Immediate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Issue Card 2 */}
        <div className="issue-card">
          <div className="issue-card-header">
            <h3 className="issue-title">Downy Mildew</h3>
            <span className="severity-tag">Moderate</span>
          </div>
          <p className="issue-description">
            Pale yellow spots on upper leaf surfaces, grayish mold underside. Lower leaves show the most damage.
          </p>
          <div className="issue-metrics">
            <div className="metric-item">
              <span className="metric-icon">⚡</span>
              <div className="metric-info">
                <span className="metric-label">Severity</span>
                <span className="metric-value">Moderate</span>
              </div>
            </div>
            <div className="metric-item">
              <span className="metric-icon">🕒</span>
              <div className="metric-info">
                <span className="metric-label">Action</span>
                <span className="metric-value">Immediate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Confidence Section */}
      <div className="confidence-card">
        <div className="confidence-header">
          <span className="confidence-label">Analysis Confidence</span>
          <span className="confidence-value">92%</span>
        </div>
        <div className="confidence-progress-bar">
          <div className="confidence-progress-fill" style={{ width: '92%' }} />
        </div>
        <div className="confidence-accuracy-badge">
          <span className="check-icon">✔</span> High Accuracy Detection
        </div>
      </div>

      {/* Bottom CTA Button */}
      <footer className="scan-result-footer">
        <button
          type="button"
          className="view-treatment-btn"
          onClick={onViewTreatment}
        >
          <span className="plant-sprout-icon">🌱</span> View Treatment Plan
        </button>
        <p className="disclaimer-text">
          LIVO shares probability-based insights. Results should be used as supportive guidance.
        </p>
      </footer>
    </div>
  );
}
