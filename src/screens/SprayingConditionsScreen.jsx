import './SprayingConditionsScreen.css';

const SPRAY_WINDOWS = [
  {
    id: 1,
    timeEn: '7:00 AM',
    timeMl: 'രാവിലെ 7:00',
    type: 'avoid', // 'good' | 'caution' | 'avoid'
    statusEn: 'Avoid',
    statusMl: 'ഒഴിവാക്കുക',
    descEn: 'Strong wind (28 mph) · Partly cloudy. Conditions not suitable for spraying.',
    descMl: 'ശക്തമായ കാറ്റ് (28 mph) · ഭാഗികമായി മേഘാവൃതമാണ്. സ്‌പ്രേ ചെയ്യാൻ അനുയോജ്യമല്ല.',
  },
  {
    id: 2,
    timeEn: '8:00 AM – 9:00 AM',
    timeMl: 'രാവിലെ 8:00 – 9:00',
    type: 'caution',
    statusEn: 'Caution',
    statusMl: 'ജാഗ്രത പാലിക്കുക',
    descEn: 'Moderate wind (18 mph) · Partly cloudy. Conditions moderately suitable.',
    descMl: 'മിതമായ കാറ്റ് (18 mph) · ഭാഗികമായി മേഘാവൃതമാണ്.',
  },
  {
    id: 3,
    timeEn: '10:00 AM – 3:00 PM',
    timeMl: 'രാവിലെ 10:00 – വൈകുന്നേരം 3:00',
    type: 'good',
    statusEn: 'Good',
    statusMl: 'ഉത്തമം (അനുയോജ്യം)',
    descEn: 'Low wind(8mph) and stable weather(partially cloudy). Perfect window for application.',
    descMl: 'കുറഞ്ഞ കാറ്റ് (8mph), അനുയോജ്യമായ കാലാവസ്ഥ. സ്‌പ്രേ ചെയ്യാൻ ഏറ്റവും മികച്ച സമയം.',
  },
  {
    id: 4,
    timeEn: '3:00 PM – 6:00 PM',
    timeMl: 'വൈകുന്നേരം 3:00 – 6:00',
    type: 'caution',
    statusEn: 'Caution',
    statusMl: 'ജാഗ്രത പാലിക്കുക',
    descEn: 'Moderate wind (18 mph) · Partly cloudy. Conditions moderately suitable.',
    descMl: 'മിതമായ കാറ്റ് (18 mph) · ഭാഗികമായി മേഘാവൃതമാണ്.',
  },
  {
    id: 5,
    timeEn: 'After 6:00 PM',
    timeMl: 'വൈകുന്നേരം 6:00 ന് ശേഷം',
    type: 'avoid',
    statusEn: 'Avoid',
    statusMl: 'ഒഴിവാക്കുക',
    descEn: 'Strong wind (28 mph) · Partly cloudy. Conditions not suitable for spraying.',
    descMl: 'ശക്തമായ കാറ്റ് (28 mph) · ഭാഗികമായി മേഘാവൃതമാണ്. സ്‌പ്രേ ചെയ്യാൻ അനുയോജ്യമല്ല.',
  },
];

export default function SprayingConditionsScreen({ onBack, language = 'en' }) {
  const isMl = language === 'ml';

  return (
    <div className="spraying-screen">
      {/* Top Header Bar */}
      <header className="spraying-header">
        <button
          type="button"
          className="spraying-back-btn"
          onClick={onBack}
          aria-label="Back"
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
        <h1 className="spraying-header-title">
          {isMl ? 'ഇന്നത്തെ സ്‌പ്രേയിംഗ് അവസ്ഥകൾ' : 'Spraying Conditions Today'}
        </h1>
      </header>

      {/* Top Hero Banner Graphic */}
      <div className="spraying-hero-wrap">
        <img
          src="/assets/images/spraying/image.png"
          alt="Spraying Conditions Today"
          className="spraying-hero-img"
        />
      </div>

      {/* Status Legend Pill Bar */}
      <div className="spraying-legend-card">
        <div className="spraying-legend-item good">
          <div className="spraying-legend-icon good">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="spraying-legend-name good">{isMl ? 'ഉത്തമം' : 'Good'}</span>
          <span className="spraying-legend-sub">{isMl ? 'സുരക്ഷിതമാണ്' : 'Safe to spray'}</span>
        </div>

        <div className="spraying-legend-item caution">
          <div className="spraying-legend-icon caution">!</div>
          <span className="spraying-legend-name caution">{isMl ? 'ജാഗ്രത' : 'Caution'}</span>
          <span className="spraying-legend-sub">{isMl ? 'ശ്രദ്ധിച്ച് ചെയ്യുക' : 'Spray carefully'}</span>
        </div>

        <div className="spraying-legend-item avoid">
          <div className="spraying-legend-icon avoid">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <span className="spraying-legend-name avoid">{isMl ? 'ഒഴിവാക്കുക' : 'Avoid'}</span>
          <span className="spraying-legend-sub">{isMl ? 'ചെയ്യരുത്' : 'Do not spray.'}</span>
        </div>
      </div>

      {/* Recommended Spray Windows Section */}
      <div className="spraying-windows-sec">
        <h2 className="spraying-sec-title">
          {isMl ? 'ശുപാർശ ചെയ്യുന്ന സമയം' : 'Recommended Spray Windows'}
        </h2>

        {/* Timeline List */}
        <div className="spraying-timeline">
          {SPRAY_WINDOWS.map((item) => (
            <div key={item.id} className="spraying-timeline-item">
              {/* Left Timeline Status Badge Icon */}
              <div className={`spraying-timeline-badge ${item.type}`}>
                {item.type === 'good' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {item.type === 'caution' && '!'}
                {item.type === 'avoid' && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>

              {/* Card Container */}
              <div className={`spraying-window-card ${item.type}`}>
                <div className="spraying-card-top">
                  <span className="spraying-time-text">
                    {isMl ? item.timeMl : item.timeEn}
                  </span>
                  <span className={`spraying-status-text ${item.type}`}>
                    {isMl ? item.statusMl : item.statusEn}
                  </span>
                </div>

                <div className="spraying-card-divider" />

                <p className="spraying-card-desc">
                  {isMl ? item.descMl : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
