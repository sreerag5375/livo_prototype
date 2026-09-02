import './CameraConfirmScreen.css';

export default function CameraConfirmScreen({ onRetake, onConfirm }) {
  return (
    <div className="camera-confirm-screen">
      {/* Captured Photo Preview */}
      <div className="camera-confirm-preview" />

      {/* Bottom Control Bar */}
      <footer className="camera-confirm-bottom-bar">
        {/* Retake Button (Red X) */}
        <button
          type="button"
          className="confirm-btn retake-btn"
          onClick={onRetake}
          aria-label="Retake Photo"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Confirm Button (Green Checkmark) */}
        <button
          type="button"
          className="confirm-btn accept-btn"
          onClick={onConfirm}
          aria-label="Confirm Photo"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </footer>
    </div>
  );
}
