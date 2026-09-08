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

export default function FieldDetailScreen({ fieldData, onBack, onSeeSprayDetails, language = 'en' }) {
  const [activeTab, setActiveTab] = useState('weather');
  const [activeDay, setActiveDay] = useState(1);
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
  const fieldArea = fieldData?.fieldArea || '0.58 acres';

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
        <button type="button" className="field-detail-menu-btn" aria-label="More">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
            <circle cx="12" cy="5" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="19" r="1.8" />
          </svg>
        </button>
      </header>

      <div className="field-detail-scroll">
        {/* Map Card */}
        <div className="field-detail-card field-detail-map-card">
          <div className="field-detail-map-img-wrap">
            <img
              src="/assets/images/add_field/map.png"
              alt="Field Map"
              className="field-detail-map-img"
            />
            <button type="button" className="field-detail-map-edit-btn" aria-label="Edit field">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
          </div>
          <div className="field-detail-map-pill">
            <span className="field-detail-crop-dot" />
            <span className="field-detail-map-pill-text">{cropName}</span>
            <span className="field-detail-map-pill-divider" />
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            <span className="field-detail-map-pill-text">{fieldArea}</span>
          </div>
        </div>

        {/* Today's Alerts */}
        <div className="field-detail-card">
          <div className="field-detail-alerts-head">
            <div className="field-detail-alerts-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00796B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div className="field-detail-alerts-head-text">
              <h2 className="field-detail-sec-title">
                {isMl ? 'ഇന്നത്തെ മുന്നറിയിപ്പുകൾ' : "Today's Alerts"}
              </h2>
              <span className="field-detail-alerts-sub">
                {isMl ? 'ശ്രദ്ധിക്കേണ്ട സജീവ മുന്നറിയിപ്പുകൾ' : 'Active alerts need attention'}
              </span>
            </div>
            <button type="button" className="field-detail-see-all">
              {isMl ? 'എല്ലാം കാണുക' : 'See All'}
            </button>
          </div>

          <div className="field-detail-alert-row">
            <span className="field-detail-alert-emoji">🐞</span>
            <div className="field-detail-alert-text">
              <strong>{isMl ? 'കീട മുന്നറിയിപ്പ്' : 'Pest Alert'}</strong>
              <p>
                {isMl
                  ? `'${fieldName}' തോട്ടത്തിലെ '${cropName}' വിളയിൽ ബഗ്രഡ ബഗ് പ്രതീക്ഷിക്കുന്നു.`
                  : `Bagrada Bug expected in field '${fieldName}' for crop '${cropName}'.`}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="field-detail-alert-row">
            <span className="field-detail-alert-emoji">🐛</span>
            <div className="field-detail-alert-text">
              <strong>{isMl ? 'കീട മുന്നറിയിപ്പ്' : 'Pest Alert'}</strong>
              <p>
                {isMl
                  ? `'${fieldName}' തോട്ടത്തിലെ '${cropName}' വിളയിൽ ഫാൾ ആർമിവേം പ്രതീക്ഷിക്കുന്നു.`
                  : `Fall Armyworm expected in field '${fieldName}' for crop '${cropName}'.`}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Growth Progress */}
        <div className="field-detail-card">
          <div className="field-detail-growth-head">
            <h2 className="field-detail-sec-title">
              {isMl ? 'വളർച്ച പുരോഗതി' : 'Growth Progress'}
            </h2>
            <span className="field-detail-growth-pct">44%</span>
          </div>

          <div className="field-detail-progress-track">
            <div className="field-detail-progress-fill" style={{ width: '44%' }} />
            <div className="field-detail-progress-thumb" style={{ left: '44%' }} />
          </div>

          <div className="field-detail-stage-box">
            <div className="field-detail-stage-col">
              <span className="field-detail-stage-label">
                {isMl ? 'നിലവിലെ ഘട്ടം:' : 'Current Stage :'}
              </span>
              <span className="field-detail-stage-value">{isMl ? 'പൂവിടൽ' : 'Flowering'}</span>
              <span className="field-detail-stage-date">31 Aug</span>
            </div>
            <div className="field-detail-stage-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              <span className="field-detail-stage-arrow-label">{isMl ? 'അടുത്തത്' : 'Next'}</span>
            </div>
            <div className="field-detail-stage-col right">
              <span className="field-detail-stage-label">
                {isMl ? 'അടുത്ത ഘട്ടം:' : 'Next Stage :'}
              </span>
              <span className="field-detail-stage-value">{isMl ? 'കായ്ക്കൽ' : 'Fruiting'}</span>
              <span className="field-detail-stage-date">22 Sept</span>
            </div>
          </div>

          <button type="button" className="field-detail-view-details">
            {isMl ? 'വിശദാംശങ്ങൾ കാണുക' : 'View details'}
          </button>
        </div>

        {/* Soil Report */}
        <div className="field-detail-card">
          <div className="field-detail-soil-head">
            <div className="field-detail-soil-icon">🧪</div>
            <div className="field-detail-alerts-head-text">
              <h2 className="field-detail-sec-title">{isMl ? 'മണ്ണ് പരിശോധന' : 'Soil report'}</h2>
              <span className="field-detail-alerts-sub">
                {isMl
                  ? 'മികച്ച ശുപാർശകൾക്കായി മണ്ണ് പരിശോധന റിപ്പോർട്ട് ചേർക്കുക'
                  : 'Add your soil test report for better recommendations'}
              </span>
            </div>
          </div>
          <button type="button" className="field-detail-add-soil-btn">
            <span className="field-detail-add-soil-plus">+</span>
            {isMl ? 'മണ്ണ് റിപ്പോർട്ട് ചേർക്കുക' : 'Add Soil Report'}
          </button>
        </div>

        {/* Tabs: Weather / Fertilizer / Activity */}
        <div className="field-detail-tabs-row">
          <button
            type="button"
            className={`field-detail-tab ${activeTab === 'weather' ? 'active' : ''}`}
            onClick={() => setActiveTab('weather')}
          >
            <span>🌤️</span>
            {isMl ? 'കാലാവസ്ഥ' : 'Weather'}
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

        {/* Weather Condition */}
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
            <div className="field-detail-weather-top">
              <div>
                <div className="field-detail-avg-temp">
                  {isMl ? 'ശരാശരി താപനില: 26.3°c' : 'Avg Temp: 26.3°c'}
                </div>
                <div className="field-detail-minmax">
                  {isMl ? 'ഉയർന്നത് 33.2°c / താഴ്ന്നത് 22.3°c' : 'Max 33.2°c / Min 22.3°c'}
                </div>
              </div>
              <div className="field-detail-current-temp-col">
                <span className="field-detail-current-label">{isMl ? 'നിലവിൽ' : 'CURRENT'}</span>
                <span className="field-detail-current-temp">29°c</span>
              </div>
            </div>

            <div className="field-detail-weather-stats">
              <div className="field-detail-weather-stat">
                <span>💧</span>
                <strong>75%</strong>
                <span className="field-detail-weather-stat-label">
                  {isMl ? 'ആർദ്രത' : 'Humidity'}
                </span>
              </div>
              <div className="field-detail-weather-stat">
                <span>🍃</span>
                <strong>28.4 km/h</strong>
                <span className="field-detail-weather-stat-label">
                  {isMl ? 'കാറ്റ്' : 'Wind'}
                </span>
              </div>
              <div className="field-detail-weather-stat">
                <span>❄️</span>
                <strong>0.04 mm</strong>
                <span className="field-detail-weather-stat-label">
                  {isMl ? 'മഴ' : 'Rainfall'}
                </span>
              </div>
            </div>

            <div className="field-detail-sunny-pill">
              <span>☀️</span>
              {isMl ? 'തെളിഞ്ഞത്' : 'Sunny'}
            </div>
          </div>
        </div>

        {/* Spraying Condition */}
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
      </div>
    </div>
  );
}
