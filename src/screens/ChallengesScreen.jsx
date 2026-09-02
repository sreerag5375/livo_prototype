import { useState } from 'react';
import './ChallengesScreen.css';

const CHALLENGES = [
  {
    id: 'crop_planning',
    titleEn: 'Crop Planning',
    titleMl: 'കൃഷി ആസൂത്രണം',
    image: '/assets/images/onboarding/challenges/crop_planning.png',
  },
  {
    id: 'pest_disease',
    titleEn: 'Pests & Diseases',
    titleMl: 'കീടങ്ങളും രോഗങ്ങളും',
    image: '/assets/images/onboarding/challenges/pest.png',
  },
  {
    id: 'weather',
    titleEn: 'Unpredictable Weather',
    titleMl: 'പ്രവചനാതീതമായ കാലാവസ്ഥ',
    image: '/assets/images/onboarding/challenges/weather.png',
  },
  {
    id: 'poor_harvest',
    titleEn: 'Poor Harvest',
    titleMl: 'കുറഞ്ഞ വിളവ്',
    image: '/assets/images/onboarding/challenges/poor_harvest.png',
  },
];

export default function ChallengesScreen({ onBack, onContinue, language = 'en' }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const isMl = language === 'ml';

  const toggleChallenge = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedIds.length === 0) return;
    if (onContinue) {
      onContinue(selectedIds);
    } else {
      showToast(`Selected ${selectedIds.length} challenge(s)!`);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const questionNode = isMl ? (
    'നിങ്ങളുടെ കൃഷിയിൽ എന്തൊക്കെ പ്രശ്നങ്ങളാണ് നേരിടുന്നത്?'
  ) : (
    <>
      What <span className="challenges-worry-highlight">worries</span> you most about your farm?
    </>
  );

  const ctaButtonText = isMl ? 'തുടരാം' : 'Continue';

  return (
    <div className="challenges-screen">
      {/* Top Navigation Bar with Progress & Flag */}
      <header className="challenges-top-bar">
        <button
          type="button"
          className="challenges-back-btn"
          onClick={onBack}
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

        {/* Progress Bar with Steps */}
        <div className="challenges-progress-track">
          <div className="challenges-progress-fill" />
          <div className="challenges-progress-badge">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="challenges-progress-dot dot-2" />
          <span className="challenges-progress-dot dot-3" />
        </div>

        {/* Goal Milestone Flag */}
        <div className="challenges-goal-flag" title="Goal Milestone">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            {/* Green grass mound */}
            <ellipse cx="17" cy="28" rx="14" ry="4" fill="#65A30D" />
            <ellipse cx="17" cy="27" rx="11" ry="3" fill="#84CC16" />
            {/* Flag pole */}
            <line x1="16" y1="7" x2="16" y2="28" stroke="#78716C" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="16" cy="6.5" r="1.5" fill="#A8A29E" />
            {/* Waving gold/yellow flag */}
            <path
              d="M16 8C20 6.5 24 9.5 30 7.5V17.5C24 19.5 20 16.5 16 18V8Z"
              fill="#F59E0B"
            />
            {/* Leaf symbol on flag */}
            <path
              d="M21.5 11.5C24 10.5 25.5 12.5 25 14C23.5 15.5 21 14 21.5 11.5Z"
              fill="#FFFFFF"
              opacity="0.9"
            />
          </svg>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="challenges-content">
        {/* Mascot & Speech Bubble Section */}
        <section className="challenges-mascot-section">
          <div className="challenges-mascot-img-wrap">
            <img
              src="/assets/images/onboarding/livo_question_pose.png"
              alt="Livo Guide"
              className="challenges-mascot-img"
              draggable="false"
            />
          </div>

          <div className="challenges-speech-bubble">
            <p className="challenges-question">{questionNode}</p>
          </div>
        </section>

        {/* 2x2 Challenges Grid */}
        <section className="challenges-grid">
          {CHALLENGES.map((challenge) => {
            const isSelected = selectedIds.includes(challenge.id);
            const labelText = isMl ? challenge.titleMl : challenge.titleEn;
            return (
              <div
                key={challenge.id}
                className="challenge-item"
                onClick={() => toggleChallenge(challenge.id)}
              >
                <div className={`challenge-card ${isSelected ? 'selected' : ''}`}>
                  {/* Radio Indicator */}
                  <div className={`challenge-radio ${isSelected ? 'selected' : ''}`}>
                    {isSelected && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>

                  <div className="challenge-card-img-container">
                    <img
                      src={challenge.image}
                      alt={labelText}
                      className="challenge-card-img"
                      draggable="false"
                    />
                  </div>
                </div>

                <span className="challenge-card-label">{labelText}</span>
              </div>
            );
          })}
        </section>
      </div>

      {/* Bottom Floating Continue Button */}
      <footer className="challenges-bottom-bar">
        <button
          type="button"
          className="challenges-continue-btn"
          onClick={handleContinue}
          disabled={selectedIds.length === 0}
        >
          {ctaButtonText}
        </button>
      </footer>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="challenges-toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
