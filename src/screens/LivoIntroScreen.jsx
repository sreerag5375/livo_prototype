import { useRef, useEffect } from 'react';
import './LivoIntroScreen.css';

export default function LivoIntroScreen({ onGetStarted, onBack }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays smoothly across all mobile browsers
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay handled:', err);
      });
    }
  }, []);

  return (
    <div className="livo-intro-screen">
      {/* Top Bar with Back Button */}
      {onBack && (
        <header className="livo-intro-top-bar">
          <button
            type="button"
            className="livo-intro-back-btn"
            onClick={onBack}
            aria-label="Back to language"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00796B"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </header>
      )}

      {/* Top Header */}
      <header className="livo-intro-header">
        <h1 className="livo-intro-title">
          Hi, I’m <span className="livo-intro-brand">LIVO!</span>
        </h1>
        <p className="livo-intro-subtitle">
          Your farming companion for a better harvest and better returns.
        </p>
      </header>

      {/* Video Animation Hero */}
      <div className="livo-intro-video-container">
        <video
          ref={videoRef}
          src="/assets/images/onboarding/livo-intro.mp4"
          className="livo-intro-video"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Bottom Soil Section with CTA */}
      <div className="livo-intro-bottom-section">
        <button
          type="button"
          className="livo-intro-cta-btn"
          onClick={onGetStarted}
        >
          <span className="livo-intro-cta-text">Get Started</span>
          <span className="livo-intro-cta-icon-wrap">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
