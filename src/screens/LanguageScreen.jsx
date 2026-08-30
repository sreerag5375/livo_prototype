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

export default function LanguageScreen({ onContinue }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleSelect = (langId) => {
    setSelectedLanguage(langId);
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue(selectedLanguage);
    }
  };

  return (
    <div className="language-screen">
      <div className="language-content">
        {/* Header Section */}
        <header className="language-header">
          <h1 className="language-title">Choose your language</h1>
          <p className="language-subtitle">We'll use it throughout the app.</p>
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
        >
          Continue
        </button>
      </div>
    </div>
  );
}
