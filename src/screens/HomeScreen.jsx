import { useState, useRef, useEffect } from 'react';
import './HomeScreen.css';

const DEMO_FIELDS = [
  {
    id: 'hain',
    nameEn: 'Hain',
    nameMl: 'ഹെയ്ൻ',
    cropNameEn: 'Brinjal',
    cropNameMl: 'വഴുതന',
    image: '/assets/images/add_field/crops/brinjal.png',
    humidity: '75%',
    tempC: '29°C',
    weatherEn: 'Sunny',
    weatherMl: 'തെളിഞ്ഞത്',
    sprayStatus: 'avoid',
    sprayLabelEn: 'Avoid Spraying Today',
    sprayLabelMl: 'ഇന്ന് സ്‌പ്രേ ചെയ്യരുത്',
    sprayReasonEn: 'Wind is too strong right now',
    sprayReasonMl: 'ഇപ്പോൾ കാറ്റ് വളരെ ശക്തമാണ്',
    growthStageEn: 'Flowering',
    growthStageMl: 'പൂവിടൽ ഘട്ടം',
    activitiesCount: 3,
  },
  {
    id: 'north-field',
    nameEn: 'North Field',
    nameMl: 'വടക്കൻ തോട്ടം',
    cropNameEn: 'Paddy',
    cropNameMl: 'നെല്ല്',
    image: '/assets/images/add_field/crops/paddy.png',
    humidity: '68%',
    tempC: '31°C',
    weatherEn: 'Partly Cloudy',
    weatherMl: 'ഭാഗിക മേഘാവൃതം',
    sprayStatus: 'good',
    sprayLabelEn: 'Safe To Spray Today',
    sprayLabelMl: 'ഇന്ന് സ്‌പ്രേ ചെയ്യാം',
    sprayReasonEn: 'Calm wind and clear sky',
    sprayReasonMl: 'ശാന്തമായ കാറ്റും തെളിഞ്ഞ ആകാശവും',
    growthStageEn: 'Tillering',
    growthStageMl: 'നാമ്പിടൽ ഘട്ടം',
    activitiesCount: 1,
  },
  {
    id: 'riverside',
    nameEn: 'Riverside Plot',
    nameMl: 'നദീതീര പ്ലോട്ട്',
    cropNameEn: 'Chilli',
    cropNameMl: 'മുളക്',
    image: '/assets/images/add_field/crops/chilly.png',
    humidity: '80%',
    tempC: '27°C',
    weatherEn: 'Light Rain',
    weatherMl: 'നേരിയ മഴ',
    sprayStatus: 'caution',
    sprayLabelEn: 'Spray With Care Today',
    sprayLabelMl: 'ഇന്ന് ശ്രദ്ധിച്ച് സ്‌പ്രേ ചെയ്യുക',
    sprayReasonEn: 'Light rain may reduce effect',
    sprayReasonMl: 'നേരിയ മഴ ഫലപ്രാപ്തി കുറയ്ക്കാം',
    growthStageEn: 'Fruiting',
    growthStageMl: 'കായ്ക്കൽ ഘട്ടം',
    activitiesCount: 2,
  },
];

const PICK_FOR_YOU_CARDS = [
  {
    id: 1,
    title: 'Plant Health Check',
    description: 'A healthy crop is the foundation of your farming plan.',
    image: '/assets/images/onboarding/roadmap/1.png',
  },
  {
    id: 2,
    title: 'Farming Help, Anytime',
    description: 'Find the right answer for your farming problems.',
    image: '/assets/images/onboarding/roadmap/5.png',
  },
  {
    id: 3,
    title: 'Weather Alerts',
    description: '7-day localized forecast to time your farm activities.',
    image: '/assets/images/onboarding/roadmap/3.png',
  },
  {
    id: 4,
    title: 'Treatment & Spraying',
    description: 'Best time and dosage to protect your crop health.',
    image: '/assets/images/onboarding/roadmap/4.png',
  },
];

export default function HomeScreen({
  onActionClick,
  onOpenAiChat,
  onOpenAddField,
  onViewAllPlan,
  onViewFieldDetail,
  isTransitioningFromPlan = false,
  hideCard1 = false,
  hideAllCards = false,
  firstCardRef = null,
  _activeFlow = 1,
  language = 'en',
  showGuidanceCard = false,
}) {
  const isMl = language === 'ml';
  const [activeTab, setActiveTab] = useState('home');
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedFieldId, setSelectedFieldId] = useState(DEMO_FIELDS[0].id);
  const carouselRef = useRef(null);
  const cards = PICK_FOR_YOU_CARDS;
  const selectedField = DEMO_FIELDS.find((f) => f.id === selectedFieldId) || DEMO_FIELDS[0];

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, [isTransitioningFromPlan]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleViewAll = () => {
    if (onViewAllPlan) {
      onViewAllPlan();
    } else {
      showToast('Opening Farming Plan…');
    }
  };

  const handleTalkToLivo = () => {
    if (onOpenAiChat) {
      onOpenAiChat();
    } else {
      showToast('Connecting with LIVO Farming Assistant…');
    }
  };

  return (
    <div className={`home-screen ${isTransitioningFromPlan ? 'home-screen-transitioning' : ''}`}>
      {/* Scrollable Main Area */}
      <div className="home-scroll-container">
        {/* Top Hero Banner Section */}
        <section className="home-hero-section">
          <div className="home-hero-image-wrap">
            <img
              src="/assets/images/home_top_livo.png"
              alt="Livo Guide Weather Alert"
              className="home-hero-image"
              draggable="false"
            />

            {/* Visible, labeled primary action — replaces the old invisible hotspot,
                which was undiscoverable for first-time / 50+ users */}
            <button
              type="button"
              className="home-hero-talk-visible-btn"
              onClick={handleTalkToLivo}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2zm7 13l1.2 2.8L23 19l-2.8 1.2L19 23l-1.2-2.8L15 19l2.8-1.2L19 15z" />
              </svg>
              <span>{isMl ? 'LIVO യോട് സംസാരിക്കൂ' : 'Talk to LIVO'}</span>
            </button>
          </div>
        </section>

        {/* Overlapping Curved White Sheet */}
        <div className="home-main-sheet">
          {/* LIVO Guidance Re-engagement Card (Shown ONLY when user skipped guidance via 'Later, Go to Home') */}
          {showGuidanceCard && (
            <section className="home-guidance-section">
              <div className="home-guidance-card">
                <div className="home-guidance-img-wrap">
                  <img
                    src="/assets/images/guidence_card.png"
                    alt="Find the right way to grow"
                    className="home-guidance-img"
                    draggable="false"
                  />
                </div>

                <div className="home-guidance-body">
                  <h3 className="home-guidance-title">
                    {isMl ? 'മികച്ച കൃഷിരീതി കണ്ടെത്താം' : 'Find the right way to grow'}
                  </h3>
                  <p className="home-guidance-desc">
                    {isMl
                      ? 'മികച്ച വിളവെടുപ്പിനായി വ്യക്തിഗത വഴികാട്ടി നേടൂ.'
                      : 'Get personalized guidance for a better season.'}
                  </p>
                  <button
                    type="button"
                    className="home-guidance-btn"
                    onClick={handleViewAll}
                  >
                    {isMl ? 'LIVO ഗൈഡൻസ് നേടാം' : 'Get LIVO Guidance'}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Field Cards: horizontally scrollable, one card per field */}
          <section className="home-fields-section">
            <div className="home-fields-header">
              <h2 className="home-fields-title">
                {isMl ? 'നിങ്ങളുടെ തോട്ടങ്ങൾ' : 'Your Fields'}
              </h2>
              {DEMO_FIELDS.length > 1 && (
                <span className="home-fields-hint">
                  {isMl ? 'കൂടുതൽ കാണാൻ സൈഡിലേക്ക് സ്വൈപ്പ് ചെയ്യുക' : 'Swipe to see more'}
                </span>
              )}
            </div>
            <div className="home-fields-carousel">
              {DEMO_FIELDS.map((field) => (
                <article key={field.id} className="home-field-card">
                  <div className="home-field-card-img-wrap">
                    <img
                      src={field.image}
                      alt={isMl ? field.cropNameMl : field.cropNameEn}
                      className="home-field-card-img"
                      draggable="false"
                    />
                    <div className="home-field-card-name-pill">
                      <span className="home-field-card-name">
                        {isMl ? field.nameMl : field.nameEn}
                      </span>
                      <span className="home-field-card-crop">
                        {isMl ? field.cropNameMl : field.cropNameEn}
                      </span>
                    </div>
                  </div>

                  {/* Spray status — big visual banner, icon-led */}
                  <div className={`home-spray-banner ${field.sprayStatus}`}>
                    <span className="home-spray-banner-icon">
                      {field.sprayStatus === 'good' && '✅'}
                      {field.sprayStatus === 'caution' && '⚠️'}
                      {field.sprayStatus === 'avoid' && '🚫'}
                    </span>
                    <div className="home-spray-banner-text">
                      <span className="home-spray-banner-title">
                        {isMl ? field.sprayLabelMl : field.sprayLabelEn}
                      </span>
                      <span className="home-spray-banner-reason">
                        {isMl ? field.sprayReasonMl : field.sprayReasonEn}
                      </span>
                    </div>
                  </div>

                  {/* Visual fact tiles instead of text rows, color-coded per topic */}
                  <div className="home-facts-grid">
                    <div className="home-fact-tile weather">
                      <span className="home-fact-tile-icon">
                        {field.weatherEn === 'Sunny' && '☀️'}
                        {field.weatherEn === 'Partly Cloudy' && '⛅'}
                        {field.weatherEn === 'Light Rain' && '🌦️'}
                      </span>
                      <span className="home-fact-tile-value">{field.tempC}</span>
                      <span className="home-fact-tile-label">
                        {isMl ? field.weatherMl : field.weatherEn}
                      </span>
                    </div>

                    <div className="home-fact-tile soil">
                      <span className="home-fact-tile-icon">💧</span>
                      <span className="home-fact-tile-value">{field.humidity}</span>
                      <span className="home-fact-tile-label">
                        {isMl ? 'മണ്ണിലെ ഈർപ്പം' : 'Soil Moisture'}
                      </span>
                    </div>

                    <div className="home-fact-tile growth">
                      <span className="home-fact-tile-icon">🌱</span>
                      <span className="home-fact-tile-value">
                        {isMl ? field.growthStageMl : field.growthStageEn}
                      </span>
                      <span className="home-fact-tile-label">
                        {isMl ? 'വളർച്ചാ ഘട്ടം' : 'Growth Stage'}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="home-fact-tile activities home-fact-tile-clickable"
                      onClick={() => {
                        setSelectedFieldId(field.id);
                        setActiveTab('activities');
                        showToast('Activities schedule');
                      }}
                    >
                      <span className="home-fact-tile-icon">📋</span>
                      <span className="home-fact-tile-value">{field.activitiesCount}</span>
                      <span className="home-fact-tile-label">
                        {isMl ? 'ജോലികൾ' : 'Tasks'}
                      </span>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="home-view-more-link"
                    onClick={() => onViewFieldDetail && onViewFieldDetail(field)}
                  >
                    {isMl ? `${field.nameMl} കൂടുതൽ കാണുക` : `View full details for ${field.nameEn}`}
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* "Try This For Your Crop" — secondary, browsable suggestions */}
          <section className="home-pick-section">
            <div className="home-pick-header">
              <h2 className="home-pick-title">
                {isMl
                  ? `നിങ്ങളുടെ ${selectedField.cropNameMl} ന് ഇത് പരീക്ഷിക്കൂ`
                  : `Try this for your ${selectedField.cropNameEn}`}
              </h2>
              <button
                type="button"
                className="home-view-all-btn"
                onClick={handleViewAll}
              >
                View All
              </button>
            </div>

            {/* Carousel Cards */}
            <div className="home-cards-carousel" ref={carouselRef}>
              {cards.map((card, idx) => (
                <div
                  key={card.id}
                  ref={idx === 0 ? firstCardRef : null}
                  id={`home-pick-card-${idx}`}
                  className={`home-pick-card ${
                    isTransitioningFromPlan && idx > 0 ? 'fade-in-delayed' : ''
                  }`}
                  style={
                    hideAllCards || (idx === 0 && hideCard1)
                      ? { visibility: 'hidden' }
                      : undefined
                  }
                  onClick={() => {
                    if (idx === 0 && onActionClick) {
                      onActionClick('health-check');
                    } else if (idx === 1 && onOpenAiChat) {
                      onOpenAiChat();
                    } else if (idx === 2 && onOpenAddField) {
                      onOpenAddField('weather');
                    } else if (idx === 3 && onOpenAddField) {
                      onOpenAddField('spray');
                    } else {
                      handleViewAll();
                    }
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="home-pick-card-img"
                    draggable="false"
                  />
                  <div className="home-pick-card-overlay">
                    <h3 className="home-pick-card-title">{card.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Sticky Tab Bar */}
      <nav className="home-bottom-nav">
        <button
          type="button"
          className={`home-tab-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="home-tab-label">Home</span>
        </button>

        <button
          type="button"
          className={`home-tab-item ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('activities');
            showToast('Activities schedule');
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="home-tab-label">Activities</span>
        </button>

        {/* Center Floating AI Magic Sparkle Button */}
        <button
          type="button"
          className="home-center-ai-btn"
          onClick={() => showToast('Opening LIVO AI Advisor…')}
          aria-label="Ask LIVO AI"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2zm7 13l1.2 2.8L23 19l-2.8 1.2L19 23l-1.2-2.8L15 19l2.8-1.2L19 15z" />
          </svg>
        </button>

        <button
          type="button"
          className={`home-tab-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('map');
            showToast('Opening Farm Map');
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className="home-tab-label">Map</span>
        </button>

        <button
          type="button"
          className={`home-tab-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('profile');
            showToast('User Profile');
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="home-tab-label">Profile</span>
        </button>
      </nav>

      {/* Interactive Toast Message */}
      {toastMessage && (
        <div className="home-toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
