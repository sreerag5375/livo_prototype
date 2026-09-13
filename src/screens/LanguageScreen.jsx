import { useState } from 'react';
import './LanguageScreen.css';

const LANGUAGES = [
  {
    id: 'en',
    label: 'English',
    icon: '/assets/images/onboarding/language/english.png',
  },
  {
    id: 'ml',
    label: 'മലയാളം',
    icon: '/assets/images/onboarding/language/malayalam.png',
  },
  {
    id: 'ta',
    label: 'தமிழ்',
    icon: '/assets/images/onboarding/language/tamil.png',
  },
  {
    id: 'hi',
    label: 'हिन्दी',
    icon: '/assets/images/onboarding/language/hindi.png',
  },
];

export default function LanguageScreen({ onContinue, onTestRoadmap }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // NORMAL FLOW — unchanged
  const handleSelect = (langId) => {
    setSelectedLanguage(langId);

    if (onContinue) {
      setTimeout(() => {
        onContinue(langId);
      }, 500);
    }
  };

  // DEBUG / TEST FLOW
  // This does NOT affect the normal language selection flow.
  const handleTestRoadmap = () => {
    if (onTestRoadmap) {
      onTestRoadmap();
    }
  };

  const isMl = selectedLanguage === 'ml';

  const titleText = isMl
    ? 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കൂ'
    : 'Choose your language';

  const subtitleText = isMl
    ? 'ആപ്പിലുടനീളം ഇതേ ഭാഷയായിരിക്കും ഉപയോഗിക്കുക.'
    : "We'll use it throughout the app.";

  return (
    <div className="language-screen">

      {/* DEBUG / TEST BUTTON */}
      <button
        type="button"
        className="language-test-button"
        onClick={handleTestRoadmap}
      >
        Test → Farming Plan
      </button>

      <div className="language-content">

        {/* Header Section */}
        <header className="language-header">
          <h1 className="language-title">{titleText}</h1>
          <p className="language-subtitle">{subtitleText}</p>
        </header>

        {/* Hero Illustration */}
        <div className="language-hero-container">
          <img
            src="/assets/images/onboarding/language/language_select.png"
            alt="Select Language illustration"
            className="language-hero-img"
            draggable="false"
          />
        </div>

        {/* 2x2 Language Card Grid */}
        <div className="language-grid">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang.id;

            return (
              <button
                key={lang.id}
                type="button"
                className={`language-card ${isSelected ? 'selected' : ''
                  }`}
                onClick={() => handleSelect(lang.id)}
              >
                {/* Radio Indicator */}
                <div
                  className={`language-radio ${isSelected ? 'selected' : ''
                    }`}
                >
                  {isSelected && (
                    <div className="language-radio-inner" />
                  )}
                </div>

                {/* Language Icon */}
                <img
                  src={lang.icon}
                  alt={lang.label}
                  className="language-icon"
                  draggable="false"
                />

                {/* Language Label */}
                <span className="language-label">
                  {lang.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}