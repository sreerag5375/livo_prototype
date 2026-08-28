import { useState } from 'react';
import './GoalsScreen.css';

const GOALS = [
  {
    id: 'maximum_yield',
    title: 'Maximum Yield',
    image: '/assets/images/onboarding/goals/maximum_yield.png',
  },
  {
    id: 'sustainable_farming',
    title: 'Sustainable Farming',
    image: '/assets/images/onboarding/goals/sustainable_farming.png',
  },
  {
    id: 'improve_profitability',
    title: 'Improve Profitability',
    image: '/assets/images/onboarding/goals/improve_profitability.png',
  },
  {
    id: 'resource_optimisation',
    title: 'Resource optimisation',
    image: '/assets/images/onboarding/goals/resource_optimisation.png',
  },
];

export default function GoalsScreen({ onBack, onContinue }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const toggleGoal = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue(selectedIds);
    } else {
      showToast(`Selected ${selectedIds.length} goal(s)! Plan generated.`);
    }
  };


  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <div className="goals-screen">
      {/* Top Navigation Bar with Step 2 Progress & Flag */}
      <header className="goals-top-bar">
        <button
          type="button"
          className="goals-back-btn"
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

        {/* Step 2 Progress Bar */}
        <div className="goals-progress-track">
          <div className="goals-progress-fill" />
          <div className="goals-progress-badge">
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
          <span className="goals-progress-dot dot-final" />
        </div>

        {/* Goal Milestone Flag */}
        <div className="goals-goal-flag" title="Goal Milestone">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <ellipse cx="17" cy="28" rx="14" ry="4" fill="#65A30D" />
            <ellipse cx="17" cy="27" rx="11" ry="3" fill="#84CC16" />
            <line x1="16" y1="7" x2="16" y2="28" stroke="#78716C" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="16" cy="6.5" r="1.5" fill="#A8A29E" />
            <path
              d="M16 8C20 6.5 24 9.5 30 7.5V17.5C24 19.5 20 16.5 16 18V8Z"
              fill="#F59E0B"
            />
            <path
              d="M21.5 11.5C24 10.5 25.5 12.5 25 14C23.5 15.5 21 14 21.5 11.5Z"
              fill="#FFFFFF"
              opacity="0.9"
            />
          </svg>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="goals-content">
        {/* Mascot & Speech Bubble Section */}
        <section className="goals-mascot-section">
          <div className="goals-mascot-img-wrap">
            <img
              src="/assets/images/onboarding/livo_question_pose.png"
              alt="Livo Guide"
              className="goals-mascot-img"
              draggable="false"
            />
          </div>

          <div className="goals-speech-bubble">
            <p className="goals-question">
              What would you like to <span className="goals-improve-highlight">improve</span> this season?
            </p>
          </div>
        </section>

        {/* 2x2 Goals Grid */}
        <section className="goals-grid">
          {GOALS.map((goal) => {
            const isSelected = selectedIds.includes(goal.id);
            return (
              <div
                key={goal.id}
                className="goal-item"
                onClick={() => toggleGoal(goal.id)}
              >
                <div className={`goal-card ${isSelected ? 'selected' : ''}`}>
                  {/* Radio Indicator */}
                  <div className={`goal-radio ${isSelected ? 'selected' : ''}`}>
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

                  <div className="goal-card-img-container">
                    <img
                      src={goal.image}
                      alt={goal.title}
                      className="goal-card-img"
                      draggable="false"
                    />
                  </div>
                </div>

                <span className="goal-card-label">{goal.title}</span>
              </div>
            );
          })}
        </section>
      </div>

      {/* Bottom Floating Continue Button */}
      <footer className="goals-bottom-bar">
        <button
          type="button"
          className="goals-continue-btn"
          onClick={handleContinue}
        >
          Continue
        </button>
      </footer>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="goals-toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
