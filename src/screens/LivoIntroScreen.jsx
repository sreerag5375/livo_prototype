import { useRef, useEffect } from 'react';
import './LivoIntroScreen.css';

export default function LivoIntroScreen({ onGetStarted, onBack, language = 'en' }) {
  const videoRef = useRef(null);
  const isMl = language === 'ml';

  useEffect(() => {
    // Ensure video plays smoothly across all mobile browsers
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay handled:', err);
      });
    }
  }, []);

  const titleNode = isMl ? (
    <>
      ഹായ്, ഞാൻ <span className="livo-intro-brand">LIVO!</span>
    </>
  ) : (
    <>
      Hi, I’m <span className="livo-intro-brand">LIVO!</span>
    </>
  );

  const subtitleText = isMl
    ? 'ഓരോ കൃഷിക്കാലത്തും നിങ്ങളോടൊപ്പമുള്ള നിങ്ങളുടെ കൃഷിക്കൂട്ടുകാരൻ.'
    : 'Your farming companion for a better harvest and better returns.';

  const ctaText = isMl ? 'തുടങ്ങാം' : 'Get Started';

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
        <h1 className="livo-intro-title">{titleNode}</h1>
        <p className="livo-intro-subtitle">{subtitleText}</p>
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
          <span className="livo-intro-cta-text">{ctaText}</span>
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
