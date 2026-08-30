import { useState, useRef, useEffect } from 'react';
import './RoadmapScreen.css';

const ROADMAP_STEPS = [
  {
    id: 1,
    stepBadge: 'STEP 1 OF 4',
    shortLabel: 'Health Check',
    image: '/assets/images/onboarding/roadmap/1.png',
    hasEmbeddedText: true,
    title: 'Plant Health Check',
    description: 'A healthy crop is the foundation of your farming plan.',
    cta: 'Start Health Scan →',
  },
  {
    id: 2,
    stepBadge: 'STEP 2 OF 4',
    shortLabel: 'Crop Plan',
    image: '/assets/images/onboarding/roadmap/2.png',
    hasEmbeddedText: false,
    title: 'Crop Planning',
    description: 'Personalized crop advisory suited to your farm soil.',
    cta: 'Start Crop Plan →',
  },
  {
    id: 3,
    stepBadge: 'STEP 3 OF 4',
    shortLabel: 'Weather Alerts',
    image: '/assets/images/onboarding/roadmap/3.png',
    hasEmbeddedText: false,
    title: 'Weather & Rain Alerts',
    description: '7-day localized forecast to time your farm activities.',
    cta: 'Check Weather →',
  },
  {
    id: 4,
    stepBadge: 'STEP 4 OF 4',
    shortLabel: 'Spray Schedule',
    image: '/assets/images/onboarding/roadmap/4.png',
    hasEmbeddedText: false,
    title: 'Treatment & Spraying',
    description: 'Best time and dosage to protect your crop health.',
    cta: 'Set Spray Schedule →',
  },
];

export default function RoadmapScreen({
  onBack,
  onStartScan,
  onGoHome,
  onPlanReadyForHome,
  skipGeneration = false,
  hideCard1 = false,
  isExitingToHome = false,
  activeFlow = 1,
}) {
  // Reveal state for each of the 4 cards: all true if skipGeneration is true
  const [revealedSteps, setRevealedSteps] = useState(
    skipGeneration ? [true, true, true, true] : [false, false, false, false]
  );
  const [generatingIndex, setGeneratingIndex] = useState(skipGeneration ? -1 : 0);
  const [isGenerating, setIsGenerating] = useState(!skipGeneration);
  const [activeIndex, setActiveIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [isPlanComplete, setIsPlanComplete] = useState(false);
  const [isDarkVeil, setIsDarkVeil] = useState(false);

  // In both flows, Card 1 is the primary focus card for Home transition
  const targetCardIndex = 0;

  const carouselRef = useRef(null);
  const firstCardRef = useRef(null);
  const cardRefs = useRef([]);
  const timersRef = useRef([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const getStepScrollLeft = (idx) => {
    if (!carouselRef.current) return 0;
    const firstCard = carouselRef.current.querySelector('.roadmap-card');
    const stepWidth = firstCard ? firstCard.offsetWidth + 16 : 266;
    return idx * stepWidth;
  };

  const scrollToStep = (idx) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollTo({
      left: getStepScrollLeft(idx),
      behavior: 'smooth',
    });
    setActiveIndex(idx);
  };

  // When all 4 cards are revealed:
  // In Flow 3: dims into dark veil, then triggers entire row upward glide
  // In Flow 1: auto-transitions smoothly to Home
  // In Flow 2: stays on screen with CTAs; transitions to Home only when user taps 'Later, Go to Home'
  const triggerPlanCompletionHold = (targetIdx = 0) => {
    if (skipGeneration) return;
    const tSettle = setTimeout(() => {
      setIsPlanComplete(true);
      setActiveIndex(targetIdx);
      if (activeFlow === 3) {
        // Flow 3: Dim background and header into dark veil (Image 2)
        setIsDarkVeil(true);
        // After 450ms hold in dark veil, trigger the entire row transition to Home
        const tHold = setTimeout(() => {
          if (onPlanReadyForHome) {
            onPlanReadyForHome(carouselRef.current, ROADMAP_STEPS, 0);
          }
        }, 450);
        timersRef.current.push(tHold);
      } else if (activeFlow === 1) {
        // Flow 1 auto-transitions smoothly to Home
        const tHold = setTimeout(() => {
          if (onPlanReadyForHome) {
            const targetEl = cardRefs.current[targetIdx] || firstCardRef.current;
            onPlanReadyForHome(targetEl, ROADMAP_STEPS[targetIdx], targetIdx);
          }
        }, 550);
        timersRef.current.push(tHold);
      }
    }, 400);
    timersRef.current.push(tSettle);
  };

  // Instant skip to final state if user taps during generation
  const fastForwardToComplete = () => {
    clearAllTimers();
    setRevealedSteps([true, true, true, true]);
    setGeneratingIndex(-1);
    setIsGenerating(false);
    scrollToStep(0);
    triggerPlanCompletionHold(0);
  };

  useEffect(() => {
    if (skipGeneration) return;
    clearAllTimers();

    if (activeFlow === 3) {
      // Flow 3: Simple sequential black shadow fade reveal
      // Step 1: 350ms
      const t1 = setTimeout(() => {
        setRevealedSteps([true, false, false, false]);
        setGeneratingIndex(1);
      }, 350);

      // Step 2: 850ms
      const t2 = setTimeout(() => {
        setRevealedSteps([true, true, false, false]);
        setGeneratingIndex(2);
      }, 850);

      // Step 3: 1350ms
      const t3 = setTimeout(() => {
        setRevealedSteps([true, true, true, false]);
        setGeneratingIndex(3);
      }, 1350);

      // Step 4: 1850ms -> finalize
      const t4 = setTimeout(() => {
        setRevealedSteps([true, true, true, true]);
        setGeneratingIndex(-1);
        setIsGenerating(false);
        triggerPlanCompletionHold(0);
      }, 1850);

      timersRef.current = [t1, t2, t3, t4];
      return () => clearAllTimers();
    }

    // Flows 1 & 2: sequential reveal with scroll
    // Step 1: Initial prepare (1.1s) -> reveal -> hold (800ms) -> scroll to Step 2
    const t1 = setTimeout(() => {
      setRevealedSteps([true, false, false, false]);
    }, 1100);

    const t2 = setTimeout(() => {
      scrollToStep(1);
      setGeneratingIndex(1);
    }, 2000);

    // Step 2: prepare (400ms after scroll) -> reveal -> hold (800ms) -> scroll to Step 3
    const t3 = setTimeout(() => {
      setRevealedSteps([true, true, false, false]);
    }, 2600);

    const t4 = setTimeout(() => {
      scrollToStep(2);
      setGeneratingIndex(2);
    }, 3500);

    // Step 3: prepare (400ms after scroll) -> reveal -> hold (800ms) -> scroll to Step 4
    const t5 = setTimeout(() => {
      setRevealedSteps([true, true, true, false]);
    }, 4100);

    const t6 = setTimeout(() => {
      scrollToStep(3);
      setGeneratingIndex(3);
    }, 5000);

    // Step 4: prepare (400ms after scroll) -> reveal -> finalize
    const t7 = setTimeout(() => {
      setRevealedSteps([true, true, true, true]);
    }, 5600);

    // Return to Step 1 and finalize
    const t8 = setTimeout(() => {
      scrollToStep(0);
      setGeneratingIndex(-1);
      setIsGenerating(false);
      triggerPlanCompletionHold(0);
    }, 6500);

    timersRef.current = [t1, t2, t3, t4, t5, t6, t7, t8];

    return () => clearAllTimers();
  }, [activeFlow]);

  const handleScroll = () => {
    if (!carouselRef.current || isGenerating) return;
    const { scrollLeft } = carouselRef.current;
    const firstCard = carouselRef.current.querySelector('.roadmap-card');
    const stepWidth = firstCard ? firstCard.offsetWidth + 16 : 266;
    const index = Math.round(scrollLeft / stepWidth);
    if (index >= 0 && index < ROADMAP_STEPS.length) {
      setActiveIndex(index);
    }
  };

  const handleCtaClick = () => {
    setToastMessage(`Selected: ${ROADMAP_STEPS[activeIndex]?.title}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onGoHome) onGoHome();
  };

  return (
    <div
      className={`roadmap-screen ${isExitingToHome ? 'is-exiting-to-home' : ''} ${
        isDarkVeil ? 'is-dark-veil' : ''
      }`}
    >
      {/* Top Bar with Back Arrow */}
      <header className="roadmap-top-bar">
        <button
          type="button"
          className="roadmap-back-btn"
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
      </header>

      {/* Header Section */}
      <section className="roadmap-header">
        <h1 className="roadmap-title">
          Your path to healthier<br />crops is ready.
        </h1>
        <p className="roadmap-subtitle">
          {"Let's take the "}
          <span className="roadmap-highlight-step">first step</span>
          {" together."}
        </p>
      </section>

      {/* Horizontal Carousel */}
      <div
        className={`roadmap-carousel ${isGenerating ? 'is-generating-mode' : ''} ${
          activeFlow === 3 ? 'is-small-layout' : ''
        }`}
        ref={carouselRef}
        onScroll={handleScroll}
      >
        {ROADMAP_STEPS.map((step, idx) => {
          const isRevealed = revealedSteps[idx];
          const isCurrentlyGenerating = isGenerating && generatingIndex === idx;
          const isActive = idx === activeIndex;

          return (
            <div
              key={step.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
                if (idx === 0) firstCardRef.current = el;
              }}
              id={`roadmap-card-${idx}`}
              style={
                hideCard1 && activeFlow !== 3 ? { visibility: 'hidden' } : undefined
              }
              className={`roadmap-card ${isActive ? 'active' : ''} ${
                isRevealed ? 'is-revealed' : 'is-unrevealed'
              } ${isCurrentlyGenerating ? 'is-generating' : ''} ${
                activeFlow === 3 ? 'is-flow3-card' : ''
              } ${
                isPlanComplete && idx === targetCardIndex && activeFlow !== 3
                  ? 'is-primary-focus'
                  : ''
              } ${
                isPlanComplete && idx !== targetCardIndex && activeFlow !== 3
                  ? 'is-dimmed'
                  : ''
              }`}
              onClick={() => {
                if (isGenerating) {
                  fastForwardToComplete();
                } else if (skipGeneration) {
                  scrollToStep(idx);
                }
              }}
            >
              {activeFlow === 3 ? (
                /* Flow 3: Small Card with Big Stylized Step Number & Simple Black Shadow Fade */
                <div className="roadmap-card-flow3-wrapper">
                  {/* Big Step Number at top-right (Image 1 & 2) */}
                  <span className="roadmap-flow3-step-num">{step.id}</span>

                  <div className="roadmap-card-flow3-content">
                    {/* Artwork Image */}
                    <img
                      src={step.image}
                      alt={step.title}
                      className="roadmap-card-img"
                      draggable="false"
                    />

                    {/* Simple Black Shadow Overlay (fades out smoothly on reveal) */}
                    <div
                      className={`roadmap-flow3-black-shade ${
                        isRevealed ? 'is-unlocked' : 'is-locked'
                      }`}
                    />

                    {/* Card Title & Desc Overlay at the bottom */}
                    <div className="roadmap-card-text-overlay">
                      <h3 className="roadmap-card-title">{step.title}</h3>
                      {idx === 0 && (
                        <p className="roadmap-card-desc">{step.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Flow 1 & 2 Card: Artwork with Black Shade and Unlocking Golden Lock */
                <div className="roadmap-card-flow2-content">
                  {/* Artwork Image */}
                  <img
                    src={step.image}
                    alt={step.title}
                    className="roadmap-card-img"
                    draggable="false"
                  />

                  {/* Black Shade Overlay with Golden Lock */}
                  <div className={`roadmap-card-flow2-shade ${isRevealed ? 'is-unlocked' : 'is-locked'}`}>
                    {!isRevealed && (
                      <div className="roadmap-flow2-unlock-center">
                        <div className={`roadmap-flow2-lock-wrap ${isCurrentlyGenerating ? 'is-unlocking' : ''}`}>
                          <span className="roadmap-sparkle sparkle-top">✦</span>
                          <span className="roadmap-sparkle sparkle-right">✦</span>
                          <span className="roadmap-sparkle sparkle-left">✦</span>

                          <svg width="44" height="52" viewBox="0 0 44 52" fill="none" className="roadmap-padlock-svg">
                            {/* Open Shackle */}
                            <path
                              d="M13 22V13C13 8.02944 17.0294 4 22 4C26.9706 4 31 8.02944 31 13V15"
                              stroke="#FDE68A"
                              strokeWidth="4.5"
                              strokeLinecap="round"
                            />
                            {/* Golden Padlock Body */}
                            <rect x="5" y="20" width="34" height="28" rx="7" fill="url(#padlockGold)" />
                            {/* Keyhole */}
                            <circle cx="22" cy="32" r="3" fill="#78350F" />
                            <path d="M22 34V39" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
                            <defs>
                              <linearGradient id="padlockGold" x1="5" y1="20" x2="39" y2="48" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FBBF24" />
                                <stop offset="1" stopColor="#D97706" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <span className="roadmap-flow2-unlock-label">
                          {isCurrentlyGenerating ? 'Unlocking' : 'Locked'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Title & Desc Overlay at the bottom */}
                  {!step.hasEmbeddedText && (
                    <div className="roadmap-card-text-overlay">
                      <h3 className="roadmap-card-title">{step.title}</h3>
                      <p className="roadmap-card-desc">{step.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Carousel Dots Indicator */}
      <div className="roadmap-dots-indicator">
        {ROADMAP_STEPS.map((_, idx) => {
          const isRevealed = revealedSteps[idx];
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              className={`roadmap-dot ${isActive ? 'active' : ''} ${
                isRevealed ? 'revealed' : ''
              }`}
              onClick={() => {
                if (isGenerating) {
                  fastForwardToComplete();
                } else if (skipGeneration) {
                  scrollToStep(idx);
                }
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* Flow 2 Bottom Action Area (Shown once plan is complete and not viewing from Home) */}
      {activeFlow === 2 && isPlanComplete && !skipGeneration && (
        <footer className="roadmap-flow2-footer">
          <button
            type="button"
            className="roadmap-flow2-primary-btn"
            onClick={() => {
              setToastMessage('Starting Health Scan...');
              setTimeout(() => setToastMessage(null), 2000);
              if (onStartScan) onStartScan();
            }}
          >
            Start Health Scan →
          </button>

          <button
            type="button"
            className="roadmap-flow2-close-link"
            onClick={() => {
              if (onPlanReadyForHome) {
                onPlanReadyForHome(firstCardRef.current, ROADMAP_STEPS[0], 0);
              }
            }}
          >
            Later, Go to Home
          </button>
        </footer>
      )}

      {/* Bottom Action Area - Only shown when viewing plan from Home */}
      {skipGeneration && (
        <footer className="roadmap-bottom-bar">
          <button
            type="button"
            className="roadmap-cta-btn"
            onClick={handleCtaClick}
          >
            {ROADMAP_STEPS[activeIndex]?.cta || 'Start Health Scan →'}
          </button>

          <a
            href="#home"
            className="roadmap-skip-home-link"
            onClick={handleHomeClick}
          >
            Back to Home
          </a>
        </footer>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="roadmap-toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
