import './CameraScanScreen.css';

export default function CameraScanScreen({ onClose, onCapture }) {
  return (
    <div className="camera-scan-screen">
      {/* Top Close Button */}
      <button
        type="button"
        className="camera-close-btn"
        onClick={onClose}
        aria-label="Close camera"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Camera Viewfinder Bracket Overlay */}
      <div className="camera-viewfinder">
        <div className="viewfinder-corner top-left" />
        <div className="viewfinder-corner top-right" />
        <div className="viewfinder-corner bottom-left" />
        <div className="viewfinder-corner bottom-right" />
        <div className="viewfinder-scan-line" />
      </div>

      {/* Bottom Control Bar */}
      <footer className="camera-bottom-bar">
        <button type="button" className="camera-gallery-btn" aria-label="Gallery">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </button>

        {/* Shutter Capture Button */}
        <button
          type="button"
          className="camera-shutter-btn"
          onClick={onCapture}
          aria-label="Take Photo"
        >
          <div className="shutter-inner" />
        </button>

        {/* Scan Counter Badge */}
        <div className="camera-scan-badge">
          1/5 SCAN
        </div>
      </footer>
    </div>
  );
}
