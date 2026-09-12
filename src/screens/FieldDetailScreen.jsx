import { useState, useEffect, useRef } from 'react';
import './FieldDetailScreen.css';

const HOURLY_SPRAY = [
  { id: 1, label: 'Now', type: 'caution' },
  { id: 2, label: '11 am', type: 'avoid' },
  { id: 3, label: '12 pm', type: 'avoid' },
  { id: 4, label: '1 pm', type: 'avoid' },
  { id: 5, label: '2 pm', type: 'avoid' },
  { id: 6, label: '3 pm', type: 'avoid' },
];

const DAYS = [
  { id: 1, day: '8', labelEn: 'Today', labelMl: 'ഇന്ന്' },
  { id: 2, day: '9', labelEn: 'Wed', labelMl: 'ബുധൻ' },
  { id: 3, day: '10', labelEn: 'Thu', labelMl: 'വ്യാഴം' },
  { id: 4, day: '11', labelEn: 'Fri', labelMl: 'വെള്ളി' },
  { id: 5, day: '12', labelEn: 'Sat', labelMl: 'ശനി' },
  { id: 6, day: '13', labelEn: 'Sun', labelMl: 'ഞായർ' },
];

const NOTIFICATIONS = [
  {
    id: 1,
    emoji: '🐞',
    titleEn: 'Pest Alert',
    titleMl: 'കീട മുന്നറിയിപ്പ്',
    descEn: (fieldName, cropName) => `Bagrada Bug expected in field '${fieldName}' for crop '${cropName}'.`,
    descMl: (fieldName, cropName) => `'${fieldName}' തോട്ടത്തിലെ '${cropName}' വിളയിൽ ബഗ്രഡ ബഗ് പ്രതീക്ഷിക്കുന്നു.`,
    timeEn: '5 min ago',
    timeMl: '5 മിനിറ്റ് മുമ്പ്',
  },
  {
    id: 2,
    emoji: '🐛',
    titleEn: 'Pest Alert',
    titleMl: 'കീട മുന്നറിയിപ്പ്',
    descEn: (fieldName, cropName) => `Fall Armyworm expected in field '${fieldName}' for crop '${cropName}'.`,
    descMl: (fieldName, cropName) => `'${fieldName}' തോട്ടത്തിലെ '${cropName}' വിളയിൽ ഫാൾ ആർമിവേം പ്രതീക്ഷിക്കുന്നു.`,
    timeEn: '28 min ago',
    timeMl: '28 മിനിറ്റ് മുമ്പ്',
  },
];

export default function FieldDetailScreen({ fieldData, onBack, onSeeSprayDetails, language = 'en' }) {
  const [activeTab, setActiveTab] = useState('weather');
  const [activeDay, setActiveDay] = useState(1);
  const [showNotifications, setShowNotifications] = useState(false);
  const sprayCardRef = useRef(null);
  const isMl = language === 'ml';

  useEffect(() => {
    const timer = setTimeout(() => {
      sprayCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const fieldName = fieldData?.fieldName || 'Hain';
  const cropName = fieldData?.crop
    ? isMl
      ? fieldData.crop.nameMl
      : fieldData.crop.nameEn
    : 'Brinjal';
  const locationName = fieldData?.locationName || 'Kanjikode, Kerala';

  return (
    <div className="field-detail-screen">
      {/* Top Header Bar */}
      <header className="field-detail-header">
        <button
          type="button"
          className="field-detail-back-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="field-detail-header-info">
          <h1 className="field-detail-title">{fieldName}</h1>
          <span className="field-detail-loc">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1fae5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {locationName}
          </span>
        </div>
        <button
          type="button"
          className="field-detail-bell-btn"
          aria-label="Notifications"
          onClick={() => setShowNotifications(true)}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {NOTIFICATIONS.length > 0 && (
            <span className="field-detail-bell-badge">{NOTIFICATIONS.length}</span>
          )}
        </button>
        <button type="button" className="field-detail-menu-btn" aria-label="More">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
            <circle cx="12" cy="5" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="19" r="1.8" />
          </svg>
        </button>
      </header>

      {showNotifications && (
        <div
          className="field-detail-notif-overlay"
          onClick={() => setShowNotifications(false)}
        >
          <div className="field-detail-notif-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="field-detail-notif-head">
              <h2 className="field-detail-notif-title">
                {isMl ? 'അറിയിപ്പുകൾ' : 'Notifications'}
              </h2>
              <button
                type="button"
                className="field-detail-notif-close"
                aria-label="Close"
                onClick={() => setShowNotifications(false)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="field-detail-notif-list">
              {NOTIFICATIONS.map((n) => (
                <div key={n.id} className="field-detail-notif-row">
                  <span className="field-detail-notif-emoji">{n.emoji}</span>
                  <div className="field-detail-notif-text">
                    <strong>{isMl ? n.titleMl : n.titleEn}</strong>
                    <p>{isMl ? n.descMl(fieldName, cropName) : n.descEn(fieldName, cropName)}</p>
                    <span className="field-detail-notif-time">{isMl ? n.timeMl : n.timeEn}</span>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="field-detail-notif-see-more">
              {isMl ? 'കൂടുതൽ കാണുക' : 'See More'}
            </button>
          </div>
        </div>
      )}

      <div className="field-detail-scroll">
        {/* Tabs: Weather / Fertilizer / Activity */}
        <div className="field-detail-tabs-row">
          <button
            type="button"
            className={`field-detail-tab ${activeTab === 'weather' ? 'active' : ''}`}
            onClick={() => setActiveTab('weather')}
          >
            <span>🌤️</span>
            {isMl ? 'അപ്ഡേറ്റുകൾ' : 'Updates'}
          </button>
          <button
            type="button"
            className={`field-detail-tab ${activeTab === 'fertilizer' ? 'active' : ''}`}
            onClick={() => setActiveTab('fertilizer')}
          >
            <span>🌱</span>
            {isMl ? 'വളം' : 'Fertilizer'}
          </button>
          <button
            type="button"
            className={`field-detail-tab ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <span>🪴</span>
            {isMl ? 'പ്രവർത്തനം' : 'Activity'}
          </button>
        </div>

        {activeTab === 'fertilizer' && (
          <div className="field-detail-card">
            <div className="field-detail-soil-head">
              <div className="field-detail-soil-icon">🧪</div>
              <div className="field-detail-alerts-head-text">
                <h2 className="field-detail-sec-title">{isMl ? 'മണ്ണ് പരിശോധന' : 'Soil report'}</h2>
                <span className="field-detail-alerts-sub">
                  {isMl
                    ? 'വളം ശുപാർശ ലഭിക്കാൻ നിങ്ങളുടെ മണ്ണ് പരിശോധന റിപ്പോർട്ട് ചേർക്കുക'
                    : 'Add your soil test report to get fertilizer suggestions'}
                </span>
              </div>
            </div>
            <button type="button" className="field-detail-add-soil-btn">
              <span className="field-detail-add-soil-plus">+</span>
              {isMl ? 'മണ്ണ് റിപ്പോർട്ട് ചേർക്കുക' : 'Add Soil Report'}
            </button>
          </div>
        )}

        {/* Weather Condition */}
        {activeTab === 'weather' && (
        <div className="field-detail-card">
          <h2 className="field-detail-sec-title mb">
            {isMl ? 'കാലാവസ്ഥ അവസ്ഥ' : 'Weather condition'}
          </h2>

          <div className="field-detail-days-row">
            {DAYS.map((d) => (
              <button
                key={d.id}
                type="button"
                className={`field-detail-day-pill ${activeDay === d.id ? 'active' : ''}`}
                onClick={() => setActiveDay(d.id)}
              >
                <span className="field-detail-day-num">{d.day}</span>
                <span className="field-detail-day-label">{isMl ? d.labelMl : d.labelEn}</span>
              </button>
            ))}
          </div>

          <div className="field-detail-weather-box">
            <div className="field-detail-weather-hero">
              <span className="field-detail-weather-hero-emoji">☀️</span>
              <span className="field-detail-weather-hero-temp">29°c</span>
              <span className="field-detail-weather-hero-label">
                {isMl ? 'തെളിഞ്ഞത്' : 'Sunny'}
              </span>
            </div>

            <div className="field-detail-weather-stats">
              <div className="field-detail-weather-stat">
                <span className="field-detail-weather-stat-emoji">💧</span>
                <strong>75%</strong>
                <span className="field-detail-weather-stat-label">
                  {isMl ? 'ആർദ്രത' : 'Humidity'}
                </span>
              </div>
              <div className="field-detail-weather-stat">
                <span className="field-detail-weather-stat-emoji">🍃</span>
                <strong>28 km/h</strong>
                <span className="field-detail-weather-stat-label">
                  {isMl ? 'കാറ്റ്' : 'Wind'}
                </span>
              </div>
              <div className="field-detail-weather-stat">
                <span className="field-detail-weather-stat-emoji">🌧️</span>
                <strong>{isMl ? 'ഇല്ല' : 'None'}</strong>
                <span className="field-detail-weather-stat-label">
                  {isMl ? 'മഴ' : 'Rain'}
                </span>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Spraying Condition */}
        {activeTab === 'weather' && (
        <div className="field-detail-card field-detail-spray-card" ref={sprayCardRef}>
          <div className="field-detail-spray-head">
            <h2 className="field-detail-sec-title">
              {isMl ? 'സ്‌പ്രേയിംഗ് അവസ്ഥ' : 'Spraying condition'}
            </h2>
            <span className="field-detail-today-badge">{isMl ? 'ഇന്ന്' : 'Today'}</span>
          </div>

          <div className="field-detail-spray-hours">
            {HOURLY_SPRAY.map((h) => (
              <div key={h.id} className="field-detail-spray-hour-col">
                <div className={`field-detail-spray-hour-badge ${h.type}`}>
                  {h.type === 'caution' && '!'}
                  {h.type === 'avoid' && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  )}
                </div>
                <span className="field-detail-spray-hour-label">{h.label}</span>
              </div>
            ))}
          </div>

          <div className="field-detail-spray-note">
            <div className="field-detail-spray-note-head">
              <span className="field-detail-spray-note-dot" />
              <span className="field-detail-spray-note-title">
                {isMl ? 'ഇപ്പോൾ മിതമായ അവസ്ഥ' : 'MODERATE NOW'}
              </span>
              <span className="field-detail-spray-note-time">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#92661a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                10:33 am
              </span>
            </div>
            <p className="field-detail-spray-note-desc">
              {isMl
                ? 'കാറ്റിന്റെ വേഗത അല്പം കൂടുതലായതിനാൽ (23.4 km/h) സ്‌പ്രേ ചെയ്യാൻ അനുയോജ്യമല്ല.'
                : 'Weather conditions are not ideal for spraying because wind speed is slightly high (23.4 km/h).'}
            </p>
            <button
              type="button"
              className="field-detail-spray-see-more"
              onClick={onSeeSprayDetails}
            >
              {isMl ? 'കൂടുതൽ കാണുക' : 'See More'}
            </button>
          </div>

          <div className="field-detail-spray-illustration">
            <img
              src="/assets/images/spraying/image.png"
              alt="Farmer spraying crops"
              className="field-detail-spray-img"
            />
          </div>
        </div>
        )}

        {/* GDD - Growing Degree Days */}
        {activeTab === 'weather' && (
        <div className="field-detail-card">
          <div className="field-detail-gdd-head">
            <h2 className="field-detail-sec-title">
              {isMl ? 'ജി.ഡി.ഡി (വളർച്ചാ ഡിഗ്രി ദിനങ്ങൾ)' : 'GDD (Growing Degree Days)'}
            </h2>
            <span className="field-detail-gdd-value">842</span>
          </div>

          <div className="field-detail-progress-track">
            <div className="field-detail-progress-fill" style={{ width: '58%' }} />
            <div className="field-detail-progress-thumb" style={{ left: '58%' }} />
          </div>

          <div className="field-detail-gdd-stats">
            <div className="field-detail-gdd-stat">
              <span className="field-detail-gdd-stat-label">
                {isMl ? 'ഇന്നത്തെ ജി.ഡി.ഡി' : "Today's GDD"}
              </span>
              <span className="field-detail-gdd-stat-value">14.2</span>
            </div>
            <div className="field-detail-gdd-stat">
              <span className="field-detail-gdd-stat-label">
                {isMl ? 'ലക്ഷ്യം' : 'Target'}
              </span>
              <span className="field-detail-gdd-stat-value">1450</span>
            </div>
            <div className="field-detail-gdd-stat right">
              <span className="field-detail-gdd-stat-label">
                {isMl ? 'അടുത്ത ഘട്ടം വരെ' : 'Until next stage'}
              </span>
              <span className="field-detail-gdd-stat-value">~18 {isMl ? 'ദിവസം' : 'days'}</span>
            </div>
          </div>

          <p className="field-detail-gdd-note">
            {isMl
              ? 'താപ ശേഖരണത്തിന്റെ അടിസ്ഥാനത്തിൽ വിളയുടെ വളർച്ചാ പുരോഗതി ട്രാക്ക് ചെയ്യുന്നു.'
              : "Tracks crop growth progress based on accumulated heat units."}
          </p>
        </div>
        )}
      </div>
    </div>
  );
}
