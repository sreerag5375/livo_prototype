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
    description: 'Check your crop for early problems',
    cta: 'Start Health Check →',
  },
  {
    id: 2,
    stepBadge: 'STEP 2 OF 4',
    shortLabel: 'Farming Help',
    image: '/assets/images/onboarding/roadmap/5.png',
    hasEmbeddedText: false,
    title: 'Farming Help, Anytime',
    description: 'Find the right answer for your farming problems.',
    cta: 'Ask Farming Help →',
  },
  {
    id: 3,
    stepBadge: 'STEP 3 OF 4',
    shortLabel: 'Weather Alerts',
    image: '/assets/images/onboarding/roadmap/3.png',
    hasEmbeddedText: false,
    title: 'Weather Planning',
    description: 'Plan farm work around the weather',
    cta: 'Check Weather →',
  },
  {
    id: 4,
    stepBadge: 'STEP 4 OF 4',
    shortLabel: 'Spray Schedule',
    image: '/assets/images/onboarding/roadmap/4.png',
    hasEmbeddedText: false,
    title: 'Spraying Conditions',
    description: 'Find the right time to spray',
    cta: 'Check Spray Time →',
  },
];

export default function RoadmapScreen({
  onBack,
  onStartScan,
  onOpenAiChat,
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
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [isPlanComplete, setIsPlanComplete] = useState(skipGeneration);

  // Card 1 is the primary focus card for Home transition
  const targetCardIndex = 0;

  const screenContainerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const carouselRef = useRef(null);
  const firstCardRef = useRef(null);
  const cardRefs = useRef([]);
  const stepRowRefs = useRef([]);
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
    setSelectedCardIndex(idx);
  };

  // Completion handler
  const triggerPlanCompletionHold = (targetIdx = 0) => {
    if (skipGeneration) return;
    const tSettle = setTimeout(() => {
      setIsPlanComplete(true);
      setActiveIndex(targetIdx);
      setSelectedCardIndex(targetIdx);

      if (activeFlow === 3) {
        // Flow 3: Smoothly scroll back to top of dedicated scroll container
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
    setIsPlanComplete(true);
    if (activeFlow === 3) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      scrollToStep(0);
      triggerPlanCompletionHold(0);
    }
  };

  const [reloadKey, setReloadKey] = useState(0);

  const handleReloadScreen = () => {
    clearAllTimers();
    setRevealedSteps([false, false, false, false]);
    setGeneratingIndex(0);
    setIsGenerating(true);
    setIsPlanComplete(false);
    setActiveIndex(0);
    setSelectedCardIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    setReloadKey((k) => k + 1);
  };

  useEffect(() => {
    if (skipGeneration) return;
    clearAllTimers();

    if (activeFlow === 3) {
      // Flow 3: Vertical sequential unlock reveal with fixed header & scroll container
      const t1 = setTimeout(() => {
        setRevealedSteps([true, false, false, false]);
        setGeneratingIndex(1);
        setSelectedCardIndex(0);
      }, 400);

      const t2 = setTimeout(() => {
        setRevealedSteps([true, true, false, false]);
        setGeneratingIndex(2);
        setSelectedCardIndex(1);
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 120, behavior: 'smooth' });
        }
      }, 1500);

      const t3 = setTimeout(() => {
        setRevealedSteps([true, true, true, false]);
        setGeneratingIndex(3);
        setSelectedCardIndex(2);
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 240, behavior: 'smooth' });
        }
      }, 2600);

      const t4 = setTimeout(() => {
        setRevealedSteps([true, true, true, true]);
        setGeneratingIndex(-1);
        setSelectedCardIndex(3);
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 360, behavior: 'smooth' });
        }
      }, 3700);

      // Smoothly scroll back to top of the card container
      const t5 = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 4700);

      // After top scroll finishes: expand cards to 100% scale & reveal subtitle + CTAs
      const t6 = setTimeout(() => {
        setIsGenerating(false);
        setIsPlanComplete(true);
        setSelectedCardIndex(0);
      }, 5300);

      timersRef.current = [t1, t2, t3, t4, t5, t6];
      return () => clearAllTimers();
    }

    // Flows 1 & 2: horizontal sequential reveal with scroll
    const t1 = setTimeout(() => {
      setRevealedSteps([true, false, false, false]);
    }, 1100);

    const t2 = setTimeout(() => {
      scrollToStep(1);
      setGeneratingIndex(1);
    }, 2000);

    const t3 = setTimeout(() => {
      setRevealedSteps([true, true, false, false]);
    }, 2600);

    const t4 = setTimeout(() => {
      scrollToStep(2);
      setGeneratingIndex(2);
    }, 3500);

    const t5 = setTimeout(() => {
      setRevealedSteps([true, true, true, false]);
    }, 4100);

    const t6 = setTimeout(() => {
      scrollToStep(3);
      setGeneratingIndex(3);
    }, 5000);

    const t7 = setTimeout(() => {
      setRevealedSteps([true, true, true, true]);
    }, 5600);

    const t8 = setTimeout(() => {
      scrollToStep(0);
      setGeneratingIndex(-1);
      setIsGenerating(false);
      triggerPlanCompletionHold(0);
    }, 6500);

    timersRef.current = [t1, t2, t3, t4, t5, t6, t7, t8];

    return () => clearAllTimers();
  }, [activeFlow, reloadKey]);

  const handleScroll = () => {
    if (!carouselRef.current || isGenerating) return;
    const { scrollLeft } = carouselRef.current;
    const firstCard = carouselRef.current.querySelector('.roadmap-card');
    const stepWidth = firstCard ? firstCard.offsetWidth + 16 : 266;
    const index = Math.round(scrollLeft / stepWidth);
    if (index >= 0 && index < ROADMAP_STEPS.length) {
      setActiveIndex(index);
      setSelectedCardIndex(index);
    }
  };

  const handleCtaClick = () => {
    if (activeIndex === 0 && onStartScan) {
      onStartScan();
    } else if (activeIndex === 1 && onOpenAiChat) {
      onOpenAiChat();
    } else {
      setToastMessage(`Selected: ${ROADMAP_STEPS[activeIndex]?.title}`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onGoHome) onGoHome();
  };

  return (
    <div
      ref={screenContainerRef}
      className={`roadmap-screen ${isExitingToHome ? 'is-exiting-to-home' : ''} ${
        activeFlow === 3 ? 'is-flow3-vertical' : ''
      }`}
    >
      {/* Top Bar with Back Arrow and Top-Right Reload Trigger */}
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

        <button
          type="button"
          className="roadmap-reload-btn"
          onClick={handleReloadScreen}
          aria-label="Reload screen animation"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00796B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6" />
            <path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8M22 12.5a10 10 0 0 1-18.8 4.2L2.5 16" />
          </svg>
        </button>
      </header>

      {/* Header Section (Fixed at top for Flow 3) */}
      <section className="roadmap-header">
        <h1 className="roadmap-title">
          Your path to healthier<br />crops is ready.
        </h1>
        {activeFlow === 3 && isGenerating && (
          <p className="roadmap-subtitle-preparing">
            <span className="roadmap-subtitle-pulse-dot">✦</span> Creating your personalized plan...
          </p>
        )}
        {activeFlow !== 3 && (
          <p className="roadmap-subtitle">
            {"Let's take the "}
            <span className="roadmap-highlight-step">first step</span>
            {" together."}
          </p>
        )}
      </section>

      {activeFlow === 3 ? (
        /* Flow 3: Dedicated Scroll Container for Vertical Step Cards */
        <div ref={scrollContainerRef} className="roadmap-flow3-scroll-container">
          <div className="roadmap-flow3-vertical-list">
            {ROADMAP_STEPS.map((step, idx) => {
              const isRevealed = revealedSteps[idx];
              const isCurrentlyGenerating = isGenerating && generatingIndex === idx;
              const isSelected = idx === selectedCardIndex;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRowRefs.current[idx] = el;
                  }}
                  className={`roadmap-flow3-row ${isPlanComplete ? 'is-expanded-row' : 'is-compact-row'}`}
                >
                  {/* Left Timeline Track */}
                  <div className="roadmap-flow3-timeline">
                    <div className={`roadmap-flow3-circle ${isRevealed ? 'revealed' : ''}`}>
                      {step.id}
                    </div>
                    {idx < ROADMAP_STEPS.length - 1 && (
                      <div className={`roadmap-flow3-line ${isRevealed ? 'revealed' : ''}`} />
                    )}
                  </div>

                  {/* Right Full-Width Vertical Step Card (Yellow border for selected, light grey for others) */}
                  <div
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                      if (idx === 0) firstCardRef.current = el;
                    }}
                    className={`roadmap-flow3-vertical-card ${
                      isRevealed ? 'is-revealed' : 'is-unrevealed'
                    } ${isPlanComplete ? 'is-expanded' : 'is-compact'} ${
                      isSelected ? 'is-selected-card' : 'is-unselected-card'
                    }`}
                    onClick={() => {
                      setSelectedCardIndex(idx);
                      if (isGenerating) {
                        fastForwardToComplete();
                      } else if (isPlanComplete || skipGeneration) {
                        if (idx === 0) {
                          if (onStartScan) onStartScan();
                        } else if (onPlanReadyForHome) {
                          onPlanReadyForHome(firstCardRef.current, step, idx);
                        } else if (onGoHome) {
                          onGoHome();
                        }
                      }
                    }}
                  >
                    <div className="roadmap-flow3-card-inner">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="roadmap-flow3-card-img"
                        draggable="false"
                      />

                      {/* Step Badge Pill (Top-Right) */}
                      <div className="roadmap-flow3-badge">{step.stepBadge}</div>

                      {/* Black Shade Overlay with Golden Padlock Unlocking Animation */}
                      <div
                        className={`roadmap-flow3-shade ${
                          isRevealed ? 'is-unlocked' : 'is-locked'
                        }`}
                      >
                        {!isRevealed && (
                          <div className="roadmap-flow3-unlock-center">
                            <div className={`roadmap-flow3-lock-wrap ${isCurrentlyGenerating ? 'is-unlocking' : ''}`}>
                              <span className="roadmap-sparkle sparkle-top">✦</span>
                              <span className="roadmap-sparkle sparkle-right">✦</span>
                              <span className="roadmap-sparkle sparkle-left">✦</span>

                              <svg width="44" height="52" viewBox="0 0 44 52" fill="none" className="roadmap-padlock-svg">
                                <path
                                  d="M13 22V13C13 8.02944 17.0294 4 22 4C26.9706 4 31 8.02944 31 13V15"
                                  stroke="#FDE68A"
                                  strokeWidth="4.5"
                                  strokeLinecap="round"
                                />
                                <rect x="5" y="20" width="34" height="28" rx="7" fill="url(#padlockGold3)" />
                                <circle cx="22" cy="32" r="3" fill="#78350F" />
                                <path d="M22 34V39" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
                                <defs>
                                  <linearGradient id="padlockGold3" x1="5" y1="20" x2="39" y2="48" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FBBF24" />
                                    <stop offset="1" stopColor="#D97706" />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </div>
                            <span className="roadmap-flow3-unlock-label">
                              {isCurrentlyGenerating ? 'Unlocking' : 'Locked'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Content Overlay */}
                      <div className="roadmap-flow3-card-overlay">
                        <h3 className="roadmap-flow3-card-title">{step.title}</h3>

                        {/* Subtitle & Inside Card CTA Button (Revealed ONLY after full load & scroll top) */}
                        {isPlanComplete && (
                          <div className="roadmap-flow3-card-details-fade-in">
                            <p className="roadmap-flow3-card-desc">{step.description}</p>
                            <button
                              type="button"
                              className="roadmap-flow3-card-cta-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (idx === 0) {
                                  if (onStartScan) onStartScan();
                                } else if (onPlanReadyForHome) {
                                  onPlanReadyForHome(firstCardRef.current, step, idx);
                                } else if (onGoHome) {
                                  onGoHome();
                                }
                              }}
                            >
                              {step.cta}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Flows 1 & 2 Horizontal Carousel */
        <div
          className={`roadmap-carousel ${isGenerating ? 'is-generating-mode' : ''}`}
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {ROADMAP_STEPS.map((step, idx) => {
            const isRevealed = revealedSteps[idx];
            const isCurrentlyGenerating = isGenerating && generatingIndex === idx;
            const isActive = idx === activeIndex;
            const isSelected = idx === selectedCardIndex;

            return (
              <div
                key={step.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                  if (idx === 0) firstCardRef.current = el;
                }}
                id={`roadmap-card-${idx}`}
                style={
                  hideCard1 ? { visibility: 'hidden' } : undefined
                }
                className={`roadmap-card ${isActive ? 'active' : ''} ${
                  isSelected ? 'is-selected-card' : 'is-unselected-card'
                } ${isRevealed ? 'is-revealed' : 'is-unrevealed'} ${
                  isCurrentlyGenerating ? 'is-generating' : ''
                } ${
                  isPlanComplete && idx === targetCardIndex && activeFlow === 1
                    ? 'is-primary-focus'
                    : ''
                } ${
                  isPlanComplete && idx !== targetCardIndex && activeFlow === 1
                    ? 'is-dimmed'
                    : ''
                }`}
                onClick={() => {
                  setSelectedCardIndex(idx);
                  if (isGenerating) {
                    fastForwardToComplete();
                  } else if (isPlanComplete || skipGeneration) {
                    if (idx === 0) {
                      if (onStartScan) onStartScan();
                    } else if (idx === 1) {
                      if (onOpenAiChat) onOpenAiChat();
                    } else {
                      scrollToStep(idx);
                    }
                  }
                }}
              >
                {/* Flow 1 & 2 Card: Artwork with Black Shade and Golden Lock */}
                <div className="roadmap-card-flow2-content">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="roadmap-card-img"
                    draggable="false"
                  />

                  <div className={`roadmap-card-flow2-shade ${isRevealed ? 'is-unlocked' : 'is-locked'}`}>
                    {!isRevealed && (
                      <div className="roadmap-flow2-unlock-center">
                        <div className={`roadmap-flow2-lock-wrap ${isCurrentlyGenerating ? 'is-unlocking' : ''}`}>
                          <span className="roadmap-sparkle sparkle-top">✦</span>
                          <span className="roadmap-sparkle sparkle-right">✦</span>
                          <span className="roadmap-sparkle sparkle-left">✦</span>

                          <svg width="44" height="52" viewBox="0 0 44 52" fill="none" className="roadmap-padlock-svg">
                            <path
                              d="M13 22V13C13 8.02944 17.0294 4 22 4C26.9706 4 31 8.02944 31 13V15"
                              stroke="#FDE68A"
                              strokeWidth="4.5"
                              strokeLinecap="round"
                            />
                            <rect x="5" y="20" width="34" height="28" rx="7" fill="url(#padlockGold)" />
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

                  {!step.hasEmbeddedText && (
                    <div className="roadmap-card-text-overlay">
                      <h3 className="roadmap-card-title">{step.title}</h3>
                      <p className="roadmap-card-desc">{step.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Carousel Dots Indicator (Flows 1 & 2 only) */}
      {activeFlow !== 3 && (
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
      )}

      {/* Flow 3 Sticky Footer (Shown once plan is complete / after full load & scroll top) */}
      {activeFlow === 3 && (isPlanComplete || skipGeneration) && (
        <footer className="roadmap-flow3-footer">
          <button
            type="button"
            className="roadmap-flow3-secondary-link"
            onClick={() => {
              if (onPlanReadyForHome) {
                onPlanReadyForHome(firstCardRef.current, ROADMAP_STEPS[0], 0);
              } else if (onGoHome) {
                onGoHome();
              }
            }}
          >
            Later, Explore LIVO
          </button>
        </footer>
      )}

      {/* Flow 2 Bottom Action Area */}
      {activeFlow === 2 && isPlanComplete && !skipGeneration && (
        <footer className="roadmap-flow2-footer">
          <button
            type="button"
            className="roadmap-flow2-primary-btn"
            onClick={() => {
              if (activeIndex === 0) {
                if (onStartScan) onStartScan();
              } else {
                setToastMessage(`Action for: ${ROADMAP_STEPS[activeIndex]?.title}`);
                setTimeout(() => setToastMessage(null), 2000);
              }
            }}
          >
            {ROADMAP_STEPS[activeIndex]?.cta || 'Start Health Scan →'}
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
      {skipGeneration && activeFlow !== 3 && (
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
