import './TreatmentPlanScreen.css';

export default function TreatmentPlanScreen({ onBack, onShare, onDownload }) {
  return (
    <div className="treatment-plan-screen">
      {/* Header */}
      <header className="treatment-plan-header">
        <button
          type="button"
          className="treatment-back-btn"
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
        <h1 className="treatment-header-title">Treatment Plan</h1>
      </header>

      <h2 className="treatment-section-heading">Immediate Actions</h2>

      {/* Action Card 1 */}
      <div className="treatment-card">
        <h3 className="treatment-for-title">For Downy Mildew</h3>

        <div className="treatment-group">
          <h4 className="group-heading">Organic Treatment</h4>
          <ul className="treatment-list">
            <li>Neem oil spray (2-3 times weekly)</li>
            <li>Neem oil spray (2-3 times weekly)</li>
          </ul>
        </div>

        <div className="treatment-group">
          <h4 className="group-heading">Chemical Treatment</h4>
          <ul className="treatment-list">
            <li>Copper-based fungicide</li>
            <li>Apply every 7-10 days</li>
          </ul>
        </div>

        <button type="button" className="add-calendar-btn">
          <span className="btn-icon">🗓</span> Add to calendar
        </button>
      </div>

      {/* Action Card 2 */}
      <div className="treatment-card">
        <h3 className="treatment-for-title">For Downy Mildew</h3>

        <div className="treatment-group">
          <h4 className="group-heading">Organic Treatment</h4>
          <ul className="treatment-list">
            <li>Neem oil spray (2-3 times weekly)</li>
            <li>Neem oil spray (2-3 times weekly)</li>
          </ul>
        </div>

        <div className="treatment-group">
          <h4 className="group-heading">Chemical Treatment</h4>
          <ul className="treatment-list">
            <li>Copper-based fungicide</li>
            <li>Apply every 7-10 days</li>
          </ul>
        </div>

        <button type="button" className="add-calendar-btn">
          <span className="btn-icon">🗓</span> Add to calendar
        </button>
      </div>

      {/* Bottom Action Footer (Download & Share) */}
      <footer className="treatment-footer">
        <button
          type="button"
          className="treatment-footer-btn download-btn"
          onClick={onDownload}
        >
          <span className="btn-icon">📥</span> Download
        </button>

        <button
          type="button"
          className="treatment-footer-btn share-btn"
          onClick={onShare}
        >
          <span className="btn-icon">🚀</span> Share
        </button>
      </footer>
    </div>
  );
}
