import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import './SuccessScreen.css';

export default function SuccessScreen({ onComplete, onBack, activeFlow, language = 'en' }) {
  const [checkmarkDone, setCheckmarkDone] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const isMl = language === 'ml';
  const titleText = isMl ? 'നിങ്ങളുടെ അക്കൗണ്ട് തയ്യാറായി!' : 'Your account is ready!';
  const subtitleText = isMl
    ? 'ഇനി നമുക്ക് ഒരുമിച്ച് കൃഷി തുടങ്ങാം.'
    : 'Let’s get farming together.';

  useEffect(() => {
    // Play video once (no loop for webm)
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log('Video play handled', e));
    }

    let intervalId = null;

    // Start confetti immediately without delay (50ms to allow canvas sizing)
    const confettiTimer = setTimeout(() => {
      if (canvasRef.current) {
        const myConfetti = confetti.create(canvasRef.current, {
          resize: true,
          useWorker: true,
        });

        // 1. Initial moderate, elegant shower directly DOWN (angle: 270)
        myConfetti({
          particleCount: 36,
          angle: 270,
          spread: 90,
          origin: { x: 0.5, y: -0.02 },
          startVelocity: 18,
          gravity: 0.95,
          ticks: 260,
          colors: ['#FFD54F', '#FFA000', '#0288D1', '#00BCD4', '#FF7043', '#4CAF50'],
          scalar: 1.05,
        });

        // 2. Light, gentle downward trickle for 1.8 seconds
        const duration = 1800;
        const end = Date.now() + duration;

        intervalId = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(intervalId);
            return;
          }

          // Gentle single particle drops across the top width
          myConfetti({
            particleCount: 1,
            angle: 270,
            spread: 45,
            origin: { x: 0.12 + Math.random() * 0.76, y: -0.02 },
            startVelocity: 14 + Math.random() * 6,
            colors: ['#FFD54F', '#FFA000', '#0288D1', '#00BCD4', '#FF7043'],
            gravity: 0.95,
            ticks: 240,
            scalar: 1.0,
          });
        }, 140);
      }
    }, 50);

    // Checkmark pulse completion
    const checkmarkTimer = setTimeout(() => {
      setCheckmarkDone(true);
    }, 280);

    // Auto-advance to challenges after celebration (3.2s)
    const advanceTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3200);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(checkmarkTimer);
      clearTimeout(advanceTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [onComplete]);

  const handleScreenClick = (e) => {
    if (e.target.closest('.success-back-btn')) return;
    if (onComplete) {
      onComplete();
    }
  };

  if (activeFlow === 3) {
    return (
      <div
        className="success-screen modal-style"
        onClick={handleScreenClick}
        role="button"
        tabIndex={0}
        aria-label="Tap to continue"
      >
        {/* Canvas Confetti Layer covering the entire phone screen */}
        <canvas ref={canvasRef} className="success-confetti-canvas" />

        {/* Top Header Bar */}
        <header className="success-modal-top-bar">
          <button
            type="button"
            className="success-back-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (onBack) onBack();
            }}
            aria-label="Go back"
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
          <h1 className="success-modal-header-title">Create Account</h1>
        </header>

        {/* Hero Section: Video Animation + Dynamic Speech Bubble */}
        <div className="success-modal-hero-container">
          <video
            ref={videoRef}
            src="/assets/images/onboarding/create_account.mp4"
            className="success-modal-hero-video"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Floating Speech Bubble */}
          <div className="success-modal-speech-bubble">
            <p className="success-modal-speech-text">
              {isMl ? 'ആദ്യം നിങ്ങളുടെ നമ്പർ നൽകാം.' : "Let's get connected first."}
            </p>
            <div className="success-modal-speech-arrow" />
          </div>
        </div>

        {/* Bottom Sheet Container */}
        <div className="success-modal-bottom-sheet">
          <div className="success-modal-content">
            {/* Glowing Checkmark Circle */}
            <div className={`success-check-circle ${checkmarkDone ? 'burst' : ''}`}>
              <div className="success-check-glow" />
              <svg
                className="success-check-svg"
                viewBox="0 0 52 52"
                fill="none"
              >
                <circle
                  className="success-check-base"
                  cx="26"
                  cy="26"
                  r="24"
                  fill="url(#goldGradientModal)"
                />
                <path
                  className="success-check-path"
                  d="M16 26.5L22.8 33.3L36.5 19.5"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="goldGradientModal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD54F" />
                    <stop offset="50%" stopColor="#FFB300" />
                    <stop offset="100%" stopColor="#FFA000" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Headline & Subtitle */}
            <h1 className="success-modal-title">{titleText}</h1>
            <p className="success-modal-subtitle">{subtitleText}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="success-screen"
      onClick={handleScreenClick}
      role="button"
      tabIndex={0}
      aria-label="Tap to continue"
    >
      {/* Canvas Confetti Layer covering the entire phone screen */}
      <canvas ref={canvasRef} className="success-confetti-canvas" />

      {/* Top Header Bar */}
      <header className="success-top-bar">
        <button
          type="button"
          className="success-back-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (onBack) onBack();
          }}
          aria-label="Go back"
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

      {/* Top Celebration Section */}
      <div className="success-content-wrap">
        {/* Glowing Checkmark Circle */}
        <div className={`success-check-circle ${checkmarkDone ? 'burst' : ''}`}>
          <div className="success-check-glow" />
          <svg
            className="success-check-svg"
            viewBox="0 0 52 52"
            fill="none"
          >
            <circle
              className="success-check-base"
              cx="26"
              cy="26"
              r="24"
              fill="url(#goldGradient)"
            />
            <path
              className="success-check-path"
              d="M16 26.5L22.8 33.3L36.5 19.5"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD54F" />
                <stop offset="50%" stopColor="#FFB300" />
                <stop offset="100%" stopColor="#FFA000" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Headline & Subtitle */}
        <h1 className="success-title">{titleText}</h1>
        <p className="success-subtitle">{subtitleText}</p>
      </div>

      {/* Bottom Video Hero (Flush to bottom, full width, no loop, no margin/padding) */}
      <div className="success-video-container">
        <video
          ref={videoRef}
          src="/assets/images/onboarding/success.webm"
          className="success-hero-video"
          autoPlay
          muted
          playsInline
        />
      </div>
    </div>
  );
}
