import './OnboardingScreen.css';

export default function OnboardingScreen({ onNext, onSkip, language = 'en' }) {
  const isMl = language === 'ml';

  const titleText = isMl
    ? 'ഈ സീസണിൽ ശരിയായ രീതിയിൽ കൃഷി ചെയ്യാം'
    : 'Find the right way to grow this season';

  const primaryCtaText = isMl ? 'LIVO മാർഗ്ഗനിർദ്ദേശം നേടൂ' : 'Get LIVO Guidance';
  const secondaryCtaText = isMl ? 'ഹോമിലേക്ക് പോകാം' : 'Skip & Go to Home';

  return (
    <div className="onboarding-screen">
      {/* Top Bar with Circular Close (X) Button */}
      <header className="onboarding-top-bar">
        <button
          type="button"
          className="onboarding-close-btn"
          onClick={onSkip}
          aria-label="Close and go to home"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1E293B"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </header>

      {/* Main Content Area */}
      <div className="onboarding-content">
        {/* Title & Dotted Path Section */}
        <section className="onboarding-header-section">
          <h1 className="onboarding-title">{titleText}</h1>

          <div className="onboarding-path-container">
            <img
              src="/assets/images/onboarding/path.png"
              alt="Guidance path illustration"
              className="onboarding-path-img"
              draggable="false"
            />
          </div>
        </section>

        {/* Hero Artwork + Overlay CTAs Section */}
        <div className="onboarding-artwork-section">
          <img
            src="/assets/images/onboarding/guidance_farmer.png"
            alt="Farmers walking in crop field"
            className="onboarding-hero-img"
            draggable="false"
          />

          <div className="onboarding-cta-overlay">
            {/* Primary CTA: Get LIVO Guidance */}
            <button
              type="button"
              className="onboarding-primary-btn"
              onClick={onNext}
            >
              <span className="onboarding-primary-text">{primaryCtaText}</span>
              <div className="onboarding-arrow-circle">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>

            {/* Secondary CTA: Skip & Go to Home */}
            <button
              type="button"
              className="onboarding-secondary-link"
              onClick={onSkip}
            >
              {secondaryCtaText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
