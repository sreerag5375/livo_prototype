import { useState, useRef, useEffect } from 'react';
import './AccountCreationScreen.css';

const ROLES = [
  {
    id: 'farmer',
    label: 'Farmer',
    image: '/assets/images/onboarding/role/farmer.png',
  },
  {
    id: 'home_grower',
    label: 'Home Grower',
    image: '/assets/images/onboarding/role/home_grower.png',
  },
  {
    id: 'learner',
    label: 'Learner',
    image: '/assets/images/onboarding/role/leaner.png',
  },
  {
    id: 'agronomist',
    label: 'Agronomist',
    image: '/assets/images/onboarding/role/agronomist.png',
  },
];

export default function AccountCreationScreen({ onComplete, onBackToIntro }) {
  // Step 1: Phone, Step 2: Verify, Step 3: Name, Step 4: Who are you (Role)
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('8113025471');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log('Video play handled', e));
    }
  }, []);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleSelectRole = (roleId) => {
    setSelectedRole(roleId);
    setTimeout(() => {
      if (onComplete) {
        onComplete({
          phone,
          name: name.trim() || 'Farmer',
          role: roleId,
        });
      }
    }, 200);
  };

  const handleBack = () => {
    if (step === 4) {
      setStep(3);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    } else if (step === 1) {
      if (onBackToIntro) {
        onBackToIntro();
      }
    }
  };

  return (
    <div className="account-screen">
      {/* Top Header Bar */}
      <header className="account-top-bar">
        <button
          type="button"
          className="account-back-btn"
          onClick={handleBack}
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
        <h1 className="account-header-title">Create Account</h1>
      </header>

      {/* Hero Section: Video Animation + Dynamic Speech Bubble */}
      <div className="account-hero-container">
        <video
          ref={videoRef}
          src="/assets/images/onboarding/create_account.mp4"
          className="account-hero-video"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Floating Speech Bubble */}
        <div className="account-speech-bubble">
          <p className="account-speech-text">
            {step === 2 || step === 3
              ? "Perfect! Let's keep going."
              : "Let's get connected first."}
          </p>
          <div className="account-speech-arrow" />
        </div>
      </div>

      {/* Bottom Sheet Container */}
      <div className="account-bottom-sheet">
        {step === 1 && (
          /* Sub-step 1: Phone Number */
          <div className="account-step-content account-fade-in">
            <label className="account-field-label">Phone number</label>
            <div className="account-phone-row">
              {/* Country Code with Indian Flag */}
              <div className="account-country-badge">
                <span className="account-flag-icon" role="img" aria-label="India flag">
                  🇮🇳
                </span>
                <span className="account-country-code">+91</span>
              </div>

              {/* Phone Input Field */}
              <input
                type="tel"
                className="account-phone-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile number"
                maxLength={10}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          /* Sub-step 2: Verification */
          <div className="account-step-content account-fade-in">
            <h2 className="account-verify-title">Verifying Your Number...</h2>

            {/* 4 OTP Digit Boxes */}
            <div className="account-otp-row">
              <div className="account-otp-box">8</div>
              <div className="account-otp-box">5</div>
              <div className="account-otp-box">7</div>
              <div className="account-otp-box">3</div>
            </div>

            {/* Verified Badge */}
            <div className="account-verified-badge">
              <span className="account-verified-check">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="account-verified-text">Number Verified</span>
            </div>
          </div>
        )}

        {step === 3 && (
          /* Sub-step 3: Tell us your name */
          <div className="account-step-content account-fade-in">
            <h2 className="account-name-title">Tell us your name</h2>

            <div className="account-name-input-wrapper">
              <input
                type="text"
                className="account-name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your name"
                autoFocus
              />
            </div>
          </div>
        )}

        {step === 4 && (
          /* Sub-step 4: Who are you (Role selection) */
          <div className="account-step-content account-fade-in">
            <h2 className="account-role-title">Who are you</h2>

            <div className="account-role-grid">
              {ROLES.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    className={`account-role-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectRole(r.id)}
                  >
                    <div className={`account-role-card ${isSelected ? 'selected' : ''}`}>
                      <img
                        src={r.image}
                        alt={r.label}
                        className="account-role-img"
                        draggable="false"
                      />
                    </div>
                    <span className="account-role-label">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Continue Button (hidden on Role selection step) */}
        {step !== 4 && (
          <div className="account-cta-wrap">
            <button
              type="button"
              className="account-continue-btn"
              onClick={handleNext}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
