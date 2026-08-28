import { useState, useRef, useEffect } from 'react';
import './HomeScreen.css';

const PICK_FOR_YOU_CARDS = [
  {
    id: 1,
    title: 'Plant Health Check',
    description: 'A healthy crop is the foundation of your farming plan.',
    image: '/assets/images/onboarding/roadmap/1.png',
  },
  {
    id: 2,
    title: 'Crop Planning',
    description: 'Personalized crop advisory suited to your farm soil.',
    image: '/assets/images/onboarding/roadmap/2.png',
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
  onViewAllPlan,
  isTransitioningFromPlan = false,
  hideCard1 = false,
  firstCardRef = null,
}) {
  const [activeTab, setActiveTab] = useState('home');
  const [toastMessage, setToastMessage] = useState(null);
  const carouselRef = useRef(null);

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

  const handleQuickAction = (name) => {
    if (onActionClick) {
      onActionClick(name);
    }
    showToast(`Opening ${name}...`);
  };


  const handleTalkToLivo = () => {
    showToast('Connecting with LIVO Farming Assistant…');
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

            {/* Clickable Hotspot over "Talk to LIVO" Button in Banner */}
            <button
              type="button"
              className="home-hero-talk-btn"
              onClick={handleTalkToLivo}
              aria-label="Talk to LIVO"
            />
          </div>
        </section>

        {/* Overlapping Curved White Sheet */}
        <div className="home-main-sheet">
          {/* Quick Actions 4-Button Row */}
          <section className="home-actions-row">
            <button
              type="button"
              className="home-action-btn"
              onClick={() => handleQuickAction('Plant Diagnosis')}
            >
              <div className="home-action-icon-box">
                {/* Viewfinder + Seedling Icon */}
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 8V5a1 1 0 0 1 1-1h3" />
                  <path d="M16 4h3a1 1 0 0 1 1 1v3" />
                  <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
                  <path d="M8 20H5a1 1 0 0 1-1-1v-3" />
                  <path d="M12 17v-4" />
                  <path d="M9 13.5c0-1.8 3-2.5 3-4.5 0 2 3 2.7 3 4.5" />
                </svg>
              </div>
              <span className="home-action-label">
                Plant<br />Diagnosis
              </span>
            </button>

            <button
              type="button"
              className="home-action-btn"
              onClick={() => handleQuickAction('Crop Suggestion')}
            >
              <div className="home-action-icon-box">
                {/* Two Leaves Sprout Icon */}
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21V10" />
                  <path d="M12 10C9 6 4 7 4 12c4 1 7-1 8-2" />
                  <path d="M12 10c3-4 8-3 8 2-4 1-7-1-8-2" />
                </svg>
              </div>
              <span className="home-action-label">
                Crop<br />Suggestion
              </span>
            </button>

            <button
              type="button"
              className="home-action-btn"
              onClick={() => handleQuickAction('Weather Alerts')}
            >
              <div className="home-action-icon-box">
                {/* Bell Alert Icon */}
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <span className="home-action-label">
                Weather<br />Alerts
              </span>
            </button>

            <button
              type="button"
              className="home-action-btn"
              onClick={() => handleQuickAction('AI History')}
            >
              <div className="home-action-icon-box">
                {/* Chat Bubble with Clock Icon */}
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <polyline points="12 8 12 12 14.5 13.5" />
                </svg>
              </div>
              <span className="home-action-label">
                AI<br />History
              </span>
            </button>
          </section>

          {/* "Pick For You" Section Header */}
          <section className="home-pick-section">
            <div className="home-pick-header">
              <h2 className="home-pick-title">Pick For You</h2>
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
              {PICK_FOR_YOU_CARDS.map((card, idx) => (
                <div
                  key={card.id}
                  ref={idx === 0 ? firstCardRef : null}
                  id={`home-pick-card-${idx}`}
                  className={`home-pick-card ${
                    isTransitioningFromPlan && idx > 0 ? 'fade-in-delayed' : ''
                  }`}
                  style={idx === 0 && hideCard1 ? { visibility: 'hidden' } : undefined}
                  onClick={handleViewAll}
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
