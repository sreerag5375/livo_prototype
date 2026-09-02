import { useState } from 'react';
import './LanguageScreen.css';

const LANGUAGES = [
  {
    id: 'en',
    label: 'English',
    icon: '/assets/images/onboarding/language/english.png',
    ctaText: 'Continue',
  },
  {
    id: 'ml',
    label: 'മലയാളം',
    icon: '/assets/images/onboarding/language/malayalam.png',
    ctaText: 'തുടരുക',
  },
  {
    id: 'ta',
    label: 'தமிழ்',
    icon: '/assets/images/onboarding/language/tamil.png',
    ctaText: 'തொடரவும்',
  },
  {
    id: 'hi',
    label: 'हिन्दी',
    icon: '/assets/images/onboarding/language/hindi.png',
    ctaText: 'जारी रखें',
  },
];

export default function LanguageScreen({ onContinue }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleSelect = (langId) => {
    setSelectedLanguage(langId);
  };

  const handleContinue = () => {
    if (selectedLanguage && onContinue) {
      onContinue(selectedLanguage);
    }
  };

  const isMl = selectedLanguage === 'ml';
  const titleText = isMl ? 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കൂ' : 'Choose your language';
  const subtitleText = isMl
    ? 'ആപ്പിലുടനീളം ഇതേ ഭാഷയായിരിക്കും ഉപയോഗിക്കുക.'
    : "We'll use it throughout the app.";
  const ctaLabel = isMl ? 'തുടരാം' : 'Continue';

  return (
    <div className="language-screen">
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
                className={`language-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(lang.id)}
              >
                {/* Radio Indicator */}
                <div className={`language-radio ${isSelected ? 'selected' : ''}`}>
                  {isSelected && <div className="language-radio-inner" />}
                </div>

                {/* Language Icon */}
                <img
                  src={lang.icon}
                  alt={lang.label}
                  className="language-icon"
                  draggable="false"
                />

                {/* Language Label */}
                <span className="language-label">{lang.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="language-bottom-bar">
        <button
          type="button"
          className="language-continue-btn"
          onClick={handleContinue}
          disabled={!selectedLanguage}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
