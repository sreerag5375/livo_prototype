import { useState } from 'react';
import './AiChatScreen.css';

export default function AiChatScreen({ onBack, language = 'en' }) {
  const [inputText, setInputText] = useState('');

  const isMl = language === 'ml';

  const suggestionPills = [
    { id: 1, textEn: "Today's activities", textMl: 'ഇന്നത്തെ കൃഷി ജോലികൾ' },
    { id: 2, textEn: 'How is my crop doing?', textMl: 'എന്റെ വിളയുടെ അവസ്ഥ എങ്ങനെ?' },
    { id: 3, textEn: "What's the weather today?", textMl: 'ഇന്നത്തെ കാലാവസ്ഥ എന്താണ്?' },
  ];

  const handlePillClick = (pill) => {
    setInputText(isMl ? pill.textMl : pill.textEn);
  };

  return (
    <div className="ai-chat-screen">
      {/* Top Navigation Bar */}
      <header className="ai-chat-header">
        <button
          type="button"
          className="ai-chat-back-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button type="button" className="ai-chat-menu-btn" aria-label="Menu">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* Greeting Header */}
      <div className="ai-chat-greeting">
        <h2 className="ai-chat-headline">{isMl ? 'ഞാൻ LIVO' : "I'm LIVO"}</h2>
        <p className="ai-chat-subheadline">
          {isMl
            ? 'നിങ്ങളുടെ കൃഷി സംബന്ധിച്ച സംശയങ്ങൾ ചോദിക്കാം'
            : 'How can I help your farming?'}
        </p>
      </div>

      {/* Hero Image Container with Waving Livo & Suggestion Bubbles */}
      <div className="ai-chat-hero-wrap">
        <img
          src="/assets/images/ai/ai_livo_home.png"
          alt="Livo AI Assistant"
          className="ai-chat-hero-img"
        />

        {/* Overlay Suggestion Speech Bubbles */}
        <div className="ai-chat-pills-overlay">
          {suggestionPills.map((pill) => (
            <button
              key={pill.id}
              type="button"
              className="ai-chat-pill-btn"
              onClick={() => handlePillClick(pill)}
            >
              <span className="ai-chat-pill-text">
                {isMl ? pill.textMl : pill.textEn}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ai-chat-pill-chevron"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Floating Chat Input Area */}
      <div className="ai-chat-bottom-bar">
        <div className="ai-chat-input-row">
          {/* Main Input Pill */}
          <div className="ai-chat-input-pill">
            <button type="button" className="ai-chat-icon-btn plus-btn" aria-label="Add media">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </button>

            <input
              type="text"
              className="ai-chat-input-field"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isMl ? 'LIVO യോട് ചോദിക്കൂ...' : 'Ask Livo...'}
            />

            <button type="button" className="ai-chat-icon-btn camera-btn" aria-label="Camera">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </button>

            <button type="button" className="ai-chat-icon-btn mic-btn" aria-label="Microphone">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
          </div>

          {/* Teal Voice Wave FAB Button */}
          <button type="button" className="ai-chat-voice-fab" aria-label="Voice Assistant">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="6" y1="8" x2="6" y2="16" />
              <line x1="10" y1="4" x2="10" y2="20" />
              <line x1="14" y1="7" x2="14" y2="17" />
              <line x1="18" y1="10" x2="18" y2="14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
