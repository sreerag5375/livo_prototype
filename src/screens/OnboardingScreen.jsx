import { useState } from 'react';
import './OnboardingScreen.css';

export default function OnboardingScreen({ onNext, onSkip }) {
  const [toastMessage, setToastMessage] = useState(null);

  const handleBuildPlan = () => {
    if (onNext) {
      onNext();
    } else {
      showToast('Starting your field plan...');
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      showToast('Skipping to home...');
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  return (
    <div className="onboarding-screen">
      {/* Top Bar with Skip Button */}
      <header className="onboarding-top-bar">
        <button
          type="button"
          className="onboarding-skip-btn"
          onClick={handleSkip}
          aria-label="Skip onboarding"
        >
          Skip
        </button>
      </header>

      {/* Header Section: Title & Subtitle */}
      <section className="onboarding-header">
        <h1 className="onboarding-title">
          Find the right steps for a better harvest
        </h1>
        <p className="onboarding-subtitle">
          Just 2 steps to get your field plan.
        </p>
      </section>

      {/* Artwork Section with Bottom Ground & CTA */}
      <div className="onboarding-artwork-container">
        <img
          src="/assets/images/onboarding/farming_plan_farmer.png"
          alt="Farmer with Livo Guide pointing towards farm path"
          className="onboarding-artwork-img"
          draggable="false"
        />

        {/* Floating CTA Button */}
        <div className="onboarding-cta-container">
          <button
            type="button"
            className="onboarding-cta-btn"
            onClick={handleBuildPlan}
            aria-label="Let’s Build Your Plan"
          >
            <span className="onboarding-cta-text">Let’s Build Your Plan</span>
            <div className="onboarding-cta-circle">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Interactive feedback toast */}
      {toastMessage && (
        <div className="onboarding-toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
