import { useState } from 'react';
import './WeatherPlanningScreen.css';

export default function WeatherPlanningScreen({ fieldData, onBack, language = 'en' }) {
  const [feedback, setFeedback] = useState({}); // { cardId: 'up' | 'down' }
  const isMl = language === 'ml';
  const fieldName = fieldData?.fieldName || 'North Field';

  const handleFeedback = (cardId, type) => {
    setFeedback((prev) => ({
      ...prev,
      [cardId]: prev[cardId] === type ? null : type,
    }));
  };

  return (
    <div className="weather-screen">
      {/* Top Header Bar */}
      <header className="weather-header">
        <button
          type="button"
          className="weather-back-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="weather-header-title">
          {isMl ? 'കാലാവസ്ഥ മുന്നറിയിപ്പുകൾ' : 'Weather Alerts'}
        </h1>
      </header>

      {/* Main Hero Card Banner */}
      <div className="weather-hero-card">
        <img
          src="/assets/images/weather/rain.png"
          alt="Heavy Rain Expected"
          className="weather-hero-bg-img"
        />

        <div className="weather-hero-overlay">
          <div className="weather-hero-field-badge">
            <span>{fieldName}</span>
          </div>

          <h2 className="weather-hero-headline">
            {isMl ? 'കനത്ത മഴ മുന്നറിയിപ്പ്' : 'Heavy Rain Expected'}
          </h2>

          <div className="weather-hero-meta-row">
            <span className="weather-hero-time-txt">
              {isMl ? 'ഇന്ന് • 4PM - 6PM' : 'Today • 4PM – 6PM'}
            </span>
            <div className="weather-hero-rain-pill">
              <span className="weather-drop-icon">💧</span>
              <span>70%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="weather-alerts-sec">
        <h2 className="weather-sec-title">
          {isMl ? 'മുന്നറിയിപ്പുകൾ' : 'Alerts'}
        </h2>

        {/* Card 1: Rain Alert */}
        <div className="weather-alert-card">
          <div className="weather-card-header rain">
            <div className="weather-card-icon-box rain">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M16 14v6" />
                <path d="M8 14v6" />
                <path d="M12 16v6" />
              </svg>
            </div>

            <div className="weather-card-header-info">
              <h3 className="weather-card-title">
                {isMl ? 'കനത്ത മഴ മുന്നറിയിപ്പ്' : 'Heavy Rain Expected'}
              </h3>
              <div className="weather-card-sub-row">
                <span className="weather-loc-tag">
                  <span className="weather-pin-icon">📍</span> {fieldName}
                </span>
                <span className="weather-time-tag blue">
                  {isMl ? 'ഇന്ന് • 4PM – 6PM' : 'Today • 4PM – 6PM'}
                </span>
              </div>
            </div>
          </div>

          <div className="weather-card-body">
            <p className="weather-card-desc">
              {isMl
                ? 'ഉച്ചയ്ക്ക് 11 മുതൽ വൈകിട്ട് 4 വരെ കനത്ത മഴ ലഭിക്കാൻ സാധ്യതയുണ്ട് (ഉയർന്ന താപനില 39.7°C).'
                : 'Heavy rain expected from 11 AM–4 PM (peak 39.7°C), which may affect your crop'}
            </p>

            <div className="weather-card-divider" />

            <div className="weather-card-footer">
              <div className="weather-footer-left">
                <span className="weather-time-ago">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  2h ago
                </span>

                <span className="weather-priority-badge high">
                  <span className="weather-warn-symbol">⚠️</span> High
                </span>
              </div>

              <div className="weather-footer-right">
                <span className="weather-helpful-txt">helpful?</span>
                <button
                  type="button"
                  className={`weather-vote-btn ${feedback[1] === 'up' ? 'active' : ''}`}
                  onClick={() => handleFeedback(1, 'up')}
                  aria-label="Thumbs Up"
                >
                  👍
                </button>
                <button
                  type="button"
                  className={`weather-vote-btn ${feedback[1] === 'down' ? 'active' : ''}`}
                  onClick={() => handleFeedback(1, 'down')}
                  aria-label="Thumbs Down"
                >
                  👎
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: High Temperature Alert */}
        <div className="weather-alert-card">
          <div className="weather-card-header temp">
            <div className="weather-card-icon-box temp">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </div>

            <div className="weather-card-header-info">
              <h3 className="weather-card-title">
                {isMl ? 'ഉയർന്ന താപനില മുന്നറിയിപ്പ്' : 'Heavy Rain Expected'}
              </h3>
              <div className="weather-card-sub-row">
                <span className="weather-loc-tag">
                  <span className="weather-pin-icon">📍</span> {fieldName}
                </span>
                <span className="weather-time-tag orange">
                  {isMl ? 'ഇന്ന് • 4PM – 6PM' : 'Today • 4PM – 6PM'}
                </span>
              </div>
            </div>
          </div>

          <div className="weather-card-body">
            <p className="weather-card-desc">
              {isMl
                ? 'ഉച്ചയ്ക്ക് 11 മുതൽ വൈകിട്ട് 4 വരെ ഉയർന്ന താപനില അനുഭവപ്പെടും (ഉയർന്ന താപനില 39.7°C).'
                : 'High temperature expected from 11 AM–4 PM (peak 39.7°C), which may affect your crop'}
            </p>

            <div className="weather-card-divider" />

            <div className="weather-card-footer">
              <div className="weather-footer-left">
                <span className="weather-time-ago">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  2h ago
                </span>

                <span className="weather-priority-badge high">
                  <span className="weather-warn-symbol">⚠️</span> High
                </span>
              </div>

              <div className="weather-footer-right">
                <span className="weather-helpful-txt">helpful?</span>
                <button
                  type="button"
                  className={`weather-vote-btn ${feedback[2] === 'up' ? 'active' : ''}`}
                  onClick={() => handleFeedback(2, 'up')}
                  aria-label="Thumbs Up"
                >
                  👍
                </button>
                <button
                  type="button"
                  className={`weather-vote-btn ${feedback[2] === 'down' ? 'active' : ''}`}
                  onClick={() => handleFeedback(2, 'down')}
                  aria-label="Thumbs Down"
                >
                  👎
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
