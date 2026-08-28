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

  const carouselRef = useRef(null);
  const firstCardRef = useRef(null);
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

  // When all 4 cards are revealed and scroll returns to Step 1:
  // Hold for ~500ms with Step 1 in primary focus, then trigger transition to Home
  const triggerPlanCompletionHold = () => {
    if (skipGeneration) return;
    const tSettle = setTimeout(() => {
      setIsPlanComplete(true);
      const tHold = setTimeout(() => {
        if (onPlanReadyForHome) {
          onPlanReadyForHome(firstCardRef.current);
        }
      }, 500);
      timersRef.current.push(tHold);
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
    triggerPlanCompletionHold();
  };

  useEffect(() => {
    if (skipGeneration) return;

    // Start sequential step-by-step reveal: Step 1 -> Step 2 -> Step 3 -> Step 4
    clearAllTimers();

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

    // Step 4: prepare (400ms after scroll) -> reveal -> hold (800ms) -> return to Step 1
    const t7 = setTimeout(() => {
      setRevealedSteps([true, true, true, true]);
    }, 5600);

    const t8 = setTimeout(() => {
      // Return focus to Step 1 for the completed plan state
      scrollToStep(0);
      setGeneratingIndex(-1);
      setIsGenerating(false);
      triggerPlanCompletionHold();
    }, 6500);

    timersRef.current = [t1, t2, t3, t4, t5, t6, t7, t8];

    return () => clearAllTimers();
  }, []);

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


  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleCtaClick = () => {
    if (isGenerating) {
      // If clicked while generating, quickly complete the animation
      fastForwardToComplete();
      return;
    }
    const currentStep = ROADMAP_STEPS[activeIndex];
    if (onStartScan) {
      onStartScan(currentStep);
    } else {
      showToast(`Starting ${currentStep.title}...`);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onGoHome) {
      onGoHome();
    } else {
      showToast('Navigating to Home Dashboard...');
    }
  };

  return (
    <div className={`roadmap-screen ${isExitingToHome ? 'is-exiting-to-home' : ''}`}>
      {/* Top Bar with Back Button */}
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
          {isGenerating ? (
            <span className="roadmap-subtitle-preparing">
              LIVO is preparing your personalized plan…
            </span>
          ) : (
            <>
              {"Let's take the "}
              <span className="roadmap-highlight-step">first step</span>
              {" together."}
            </>
          )}
        </p>
      </section>

      {/* Horizontal Carousel */}
      <div
        className={`roadmap-carousel ${isGenerating ? 'is-generating-mode' : ''}`}
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
              ref={idx === 0 ? firstCardRef : null}
              id={`roadmap-card-${idx}`}
              style={idx === 0 && hideCard1 ? { visibility: 'hidden' } : undefined}
              className={`roadmap-card ${isActive ? 'active' : ''} ${
                isRevealed ? 'is-revealed' : 'is-unrevealed'
              } ${isCurrentlyGenerating ? 'is-generating' : ''} ${
                isPlanComplete && idx === 0 ? 'is-primary-focus' : ''
              } ${
                isPlanComplete && idx > 0 ? 'is-dimmed' : ''
              }`}
              onClick={() => {
                if (isGenerating) {
                  fastForwardToComplete();
                } else if (skipGeneration) {
                  scrollToStep(idx);
                }
              }}
            >
              {isRevealed ? (
                /* Fully Revealed Completed Card */
                <div className="roadmap-card-revealed-content">
                  {/* Step Badge */}
                  <div className="roadmap-card-badge">
                    {step.stepBadge}
                  </div>

                  {/* Artwork Image */}
                  <img
                    src={step.image}
                    alt={step.title}
                    className="roadmap-card-img"
                    draggable="false"
                  />

                  {/* Overlay text for cards without embedded text */}
                  {!step.hasEmbeddedText && (
                    <div className="roadmap-card-text-overlay">
                      <h3 className="roadmap-card-title">{step.title}</h3>
                      <p className="roadmap-card-desc">{step.description}</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Preparing / Locked Queue Card */
                <div className="roadmap-card-preparing-state">
                  <div className="roadmap-card-badge badge-pending">
                    {step.stepBadge}
                  </div>

                  <div className="roadmap-card-preparing-inner">
                    {/* Animated glowing Livo Leaf Icon */}
                    <div className={`roadmap-preparing-icon-wrap ${isCurrentlyGenerating ? 'pulsing' : ''}`}>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 3C21 3 17 4 12 9C7 14 6 18 6 18L7 20C7 20 10 19 14 15C19 10 21 3 21 3Z"
                          fill={isCurrentlyGenerating ? '#00796B' : '#94A3B8'}
                        />
                        <path
                          d="M6 18L3 21"
                          stroke={isCurrentlyGenerating ? '#00796B' : '#94A3B8'}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <p className="roadmap-preparing-status">
                      {isCurrentlyGenerating
                        ? `Personalizing ${step.shortLabel}…`
                        : `Step ${step.id}`}
                    </p>

                    <div className="roadmap-preparing-progress-bar">
                      <div className={`roadmap-preparing-progress-fill ${isCurrentlyGenerating ? 'active' : ''}`} />
                    </div>
                  </div>
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
