import { useState, useRef, useEffect } from 'react';
import './AccountCreationScreen.css';

const ROLES = [
  {
    id: 'farmer',
    labelEn: 'Farmer',
    labelMl: 'കർഷകൻ',
    image: '/assets/images/onboarding/role/farmer.png',
  },
  {
    id: 'home_grower',
    labelEn: 'Home Grower',
    labelMl: 'വീട്ടിൽ കൃഷി ചെയ്യുന്നവർ',
    image: '/assets/images/onboarding/role/home_grower.png',
  },
  {
    id: 'learner',
    labelEn: 'Learner',
    labelMl: 'കൃഷി പഠിക്കുന്നവർ',
    image: '/assets/images/onboarding/role/leaner.png',
  },
  {
    id: 'agronomist',
    labelEn: 'Agronomist',
    labelMl: 'കൃഷി വിദഗ്ധൻ',
    image: '/assets/images/onboarding/role/agronomist.png',
  },
];

export default function AccountCreationScreen({ onComplete, onBackToIntro, language = 'en' }) {
  // Step 1: Phone, Step 2: Verify, Step 3: Name, Step 4: Who are you (Role)
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [otpPhase, setOtpPhase] = useState('typing'); // 'typing' | 'merging' | 'merged'
  const [isInputFocused, setIsInputFocused] = useState(false);
  const videoRef = useRef(null);

  const isMl = language === 'ml';
  const cleanPhone = phone.replace(/\D/g, '');
  const isPhoneValid = cleanPhone.length === 10;
  const isNameValid = name.trim().length > 0;

  // When keyboard is open: ONLY show Continue button above keyboard when phone length reaches 10 digits (Step 1) or name is typed (Step 3)
  const isKeyboardOpen = isInputFocused;
  const shouldShowFloatingCta = isKeyboardOpen
    ? (step === 1 && isPhoneValid) || (step === 3 && isNameValid)
    : true;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log('Video play handled', e));
    }
  }, []);

  // Step 2 sequential auto-capture & smooth merging morph into green checkmark box
  useEffect(() => {
    if (step === 2) {
      const digits =
        cleanPhone.length >= 4
          ? cleanPhone.slice(-4).split('')
          : ['6', '9', '8', '8'];

      setOtpPhase('typing');

      const t0 = setTimeout(() => {
        setOtpDigits(['', '', '', '']);
      }, 0);
      const t1 = setTimeout(() => setOtpDigits([digits[0], '', '', '']), 300);
      const t2 = setTimeout(() => setOtpDigits([digits[0], digits[1], '', '']), 600);
      const t3 = setTimeout(() => setOtpDigits([digits[0], digits[1], digits[2], '']), 900);
      const t4 = setTimeout(() => {
        setOtpDigits([digits[0], digits[1], digits[2], digits[3]]);
      }, 1200);

      // Phase 2: All 4 digits filled -> smooth merging transition inwards
      const t5 = setTimeout(() => {
        setOtpPhase('merging');
      }, 1600);

      // Phase 3: Combine into single Checkmark Box [ ✔ ] & "Verified successfully"
      const t6 = setTimeout(() => {
        setOtpPhase('merged');
      }, 2100);

      // Phase 4: Wait 3.5s on verified state then proceed to Step 3 (Tell us your name)
      const t7 = setTimeout(() => {
        setStep(3);
      }, 5600);

      return () => {
        clearTimeout(t0);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        clearTimeout(t6);
        clearTimeout(t7);
      };
    }
  }, [step, cleanPhone]);

  const handleNext = () => {
    setIsInputFocused(false);
    if (step === 1 && isPhoneValid) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3 && isNameValid) {
      setStep(4);
    } else if (step === 4 && selectedRole) {
      if (onComplete) {
        onComplete({
          phone,
          name: name.trim() || 'Farmer',
          role: selectedRole,
        });
      }
    }
  };

  const handleSelectRole = (roleId) => {
    setSelectedRole(roleId);
  };

  const speechText = isMl
    ? step === 1
      ? 'ആദ്യം നിങ്ങളുടെ നമ്പർ നൽകാം.'
      : step === 2 || step === 3
      ? 'നന്ദി! ഇനി മുന്നോട്ട് പോകാം.'
      : step === 4
      ? 'ഇതിൽ നിങ്ങളെ പ്രതിനിധീകരിക്കുന്നത് ഏതാണ്?'
      : 'ആദ്യം ബന്ധപ്പെടാം.'
    : step === 1
    ? 'Enter your mobile number to get started.'
    : step === 2 || step === 3
    ? "Perfect! Let's keep going."
    : step === 4
    ? 'Which one best describes you?'
    : "Let's get connected first.";

  const phoneTitleText = isMl ? 'നിങ്ങളുടെ നമ്പർ നൽകൂ' : 'Enter your number';
  const verifyTitleText = isMl ? 'നമ്പർ പരിശോധിക്കാം' : "Let's verify your number";
  const nameTitleText = isMl ? 'നിങ്ങളുടെ പേര് പറയൂ' : 'Tell us your name';
  const namePlaceholderText = isMl ? 'പേര് നൽകൂ' : 'Enter Your name';
  const roleTitleText = isMl ? 'ഇതിൽ നിങ്ങൾ ആരാണ്?' : 'Choose your role';
  const ctaButtonText = isMl ? 'തുടരാം' : 'Continue';

  const handleHeaderBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (onBackToIntro) {
      onBackToIntro();
    }
  };

  return (
    <div className="account-screen">
      {/* Top Header Bar */}
      <header className="account-top-bar">
        <button
          type="button"
          className="account-back-btn"
          onClick={handleHeaderBack}
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
        <h1 className="account-header-title">{isMl ? 'അക്കൗണ്ട് ഉണ്ടാക്കാം' : 'Create Account'}</h1>
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
          <p className="account-speech-text">{speechText}</p>
          <div className="account-speech-arrow" />
        </div>
      </div>

      {/* Bottom Sheet Container */}
      <div className={`account-bottom-sheet ${isKeyboardOpen ? 'keyboard-open' : ''}`}>
        {step === 1 && (
          /* Sub-step 1: Phone Number */
          <div className="account-step-content account-fade-in">
            <h2 className="account-field-title">{phoneTitleText}</h2>
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
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isPhoneValid) {
                    handleNext();
                  }
                }}
                placeholder="Enter phone number"
                maxLength={10}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          /* Sub-step 2: Verification */
          <div className="account-step-content account-fade-in">
            <h2 className={`account-verify-title ${otpPhase === 'merged' ? 'is-verified-title' : ''}`}>
              {otpPhase === 'merged'
                ? isMl
                  ? 'നമ്പർ പരിശോധിച്ചു'
                  : 'Verified successfully'
                : verifyTitleText}
            </h2>

            {/* OTP Container with smooth merging transition */}
            <div className={`account-otp-container ${otpPhase}`}>
              {/* 4 OTP Digit Boxes */}
              <div className={`account-otp-row ${otpPhase}`}>
                {otpDigits.map((digit, idx) => {
                  const isDigitFilled = !!digit;
                  const isNextToFill = !digit && (idx === 0 || !!otpDigits[idx - 1]);
                  return (
                    <div
                      key={idx}
                      className={`account-otp-box ${isDigitFilled ? 'filled' : ''} ${
                        isNextToFill ? 'active-target' : ''
                      }`}
                    >
                      {digit}
                    </div>
                  );
                })}
              </div>

              {/* Combined Single Checkmark Box [ ✔ ] */}
              <div className={`account-merged-check-box ${otpPhase === 'merged' ? 'show' : ''}`}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            {otpPhase !== 'merged' && (
              <p className="account-resend-text">
                {isMl ? 'കോഡ് ലഭിച്ചില്ലേ? ' : "Didn't receive the code? "}
                <span className="account-resend-link">{isMl ? 'വീണ്ടും അയക്കുക' : 'Resend'}</span>
              </p>
            )}
          </div>
        )}

        {step === 3 && (
          /* Sub-step 3: Tell us your name */
          <div className="account-step-content account-fade-in">
            <h2 className="account-name-title">{nameTitleText}</h2>

            <div className="account-name-input-wrapper">
              <input
                type="text"
                className="account-name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={namePlaceholderText}
                autoFocus
              />
            </div>
          </div>
        )}

        {step === 4 && (
          /* Sub-step 4: Who are you (Role selection) */
          <div className="account-step-content account-fade-in">
            <h2 className="account-role-title">{roleTitleText}</h2>

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
                        alt={r.labelEn}
                        className="account-role-img"
                        draggable="false"
                      />
                    </div>
                    <span className="account-role-label">{isMl ? r.labelMl : r.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Continue Button */}
        {shouldShowFloatingCta && step !== 2 && (
          <div className={`account-cta-wrap ${isKeyboardOpen ? 'keyboard-open' : ''}`}>
            <button
              type="button"
              className="account-continue-btn"
              onClick={handleNext}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                handleNext();
              }}
              disabled={
                (step === 1 && !isPhoneValid) ||
                (step === 3 && !isNameValid) ||
                (step === 4 && !selectedRole)
              }
            >
              {ctaButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
