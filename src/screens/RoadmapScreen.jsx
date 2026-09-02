import { useState, useRef, useEffect } from 'react';
import './RoadmapScreen.css';

export default function RoadmapScreen({
  onBack,
  onStartScan,
  onOpenAiChat,
  onOpenAddField,
  onGoHome,
  onPlanReadyForHome,
  skipGeneration = false,
  hideCard1 = false,
  isExitingToHome = false,
  activeFlow = 1,
  language = 'en',
}) {
  const isMl = language === 'ml';

  const stepsData = [
    {
      id: 1,
      stepBadge: isMl ? 'ഘട്ടം 1 / 4' : 'STEP 1 OF 4',
      shortLabel: isMl ? 'ആരോഗ്യ പരിശോധന' : 'Health Check',
      image: '/assets/images/onboarding/roadmap/1.png',
      title: isMl ? 'ചെടിയുടെ ആരോഗ്യ പരിശോധന' : 'Plant Health Check',
      description: isMl ? 'വിളകളിലെ രോഗങ്ങൾ നേരത്തെ കണ്ടെത്താം' : 'Check your crop for early problems',
      cta: isMl ? 'ചെടിയുടെ ആരോഗ്യം അറിയാം →' : 'Start Health Check →',
    },
    {
      id: 2,
      stepBadge: isMl ? 'ഘട്ടം 2 / 4' : 'STEP 2 OF 4',
      shortLabel: isMl ? 'കൃഷി സഹായം' : 'Farming Help',
      image: '/assets/images/onboarding/roadmap/5.png',
      title: isMl ? 'ഏതു സമയത്തും കൃഷി സഹായം' : 'Farming Help, Anytime',
      description: isMl ? 'നിങ്ങളുടെ കൃഷി സംശയങ്ങൾക്ക് ഉത്തരം കണ്ടെത്താം.' : 'Find the right answer for your farming problems.',
      cta: isMl ? 'ചോദിക്കാം →' : 'Ask Farming Help →',
    },
    {
      id: 3,
      stepBadge: isMl ? 'ഘട്ടം 3 / 4' : 'STEP 3 OF 4',
      shortLabel: isMl ? 'കാലാവസ്ഥ' : 'Weather Alerts',
      image: '/assets/images/onboarding/roadmap/3.png',
      title: isMl ? 'കാലാവസ്ഥ ആസൂത്രണം' : 'Weather Planning',
      description: isMl ? 'കാലാവസ്ഥയ്ക്കനുസരിച്ച് കൃഷി ജോലികൾ പ്ലാൻ ചെയ്യാം' : 'Plan farm work around the weather',
      cta: isMl ? 'കാലാവസ്ഥ പരിശോധിക്കാം →' : 'Check Weather →',
    },
    {
      id: 4,
      stepBadge: isMl ? 'ഘട്ടം 4 / 4' : 'STEP 4 OF 4',
      shortLabel: isMl ? 'സ്‌പ്രേ സമയം' : 'Spray Schedule',
      image: '/assets/images/onboarding/roadmap/4.png',
      title: isMl ? 'സ്‌പ്രേയിംഗ് സമയം' : 'Spraying Conditions',
      description: isMl ? 'സ്‌പ്രേ ചെയ്യാൻ അനുയോജ്യമായ സമയം കണ്ടെത്താം' : 'Find the right time to spray',
      cta: isMl ? 'സ്‌പ്രേ സമയം നോക്കാം →' : 'Check Spray Time →',
    },
  ];

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
  const [reloadKey, setReloadKey] = useState(0);

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

  const fastForwardToComplete = () => {
    clearAllTimers();
    setRevealedSteps([true, true, true, true]);
    setGeneratingIndex(-1);
    setIsGenerating(false);
    setIsPlanComplete(true);
    setSelectedCardIndex(0);
    scrollToStep(0);
  };

  // Re-trigger reveal sequence when Reload icon button is clicked
  const handleReplayGeneration = () => {
    clearAllTimers();
    setRevealedSteps([false, false, false, false]);
    setGeneratingIndex(0);
    setIsGenerating(true);
    setIsPlanComplete(false);
    setSelectedCardIndex(0);
    setActiveIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    setReloadKey((prev) => prev + 1);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Sequential lock-unlock reveal effect
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

      const t5 = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 4700);

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
      setIsPlanComplete(true);
    }, 6500);

    timersRef.current = [t1, t2, t3, t4, t5, t6, t7, t8];

    return () => clearAllTimers();
  }, [activeFlow, reloadKey, skipGeneration]);

  // Track active step on horizontal scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.querySelector('.roadmap-card');
    const stepWidth = firstCard ? firstCard.offsetWidth + 16 : 266;
    const newIdx = Math.round(carouselRef.current.scrollLeft / stepWidth);
    if (newIdx !== activeIndex && newIdx >= 0 && newIdx < stepsData.length) {
      setActiveIndex(newIdx);
      setSelectedCardIndex(newIdx);
    }
  };

  const handleCtaClick = () => {
    if (isGenerating) {
      fastForwardToComplete();
      return;
    }

    const currentStep = stepsData[selectedCardIndex] || stepsData[0];

    if (selectedCardIndex === 0) {
      if (onStartScan) onStartScan();
    } else if (selectedCardIndex === 1) {
      if (onOpenAiChat) onOpenAiChat();
    } else if (selectedCardIndex === 2) {
      if (onOpenAddField) onOpenAddField('weather');
    } else if (selectedCardIndex === 3) {
      if (onOpenAddField) onOpenAddField('spray');
    } else if (onPlanReadyForHome) {
      onPlanReadyForHome(firstCardRef.current, currentStep, selectedCardIndex);
    } else if (onGoHome) {
      onGoHome();
    }
  };

  const currentSelectedStep = stepsData[selectedCardIndex] || stepsData[0];

  return (
    <div
      ref={screenContainerRef}
      className={`roadmap-screen flow-${activeFlow} ${
        isExitingToHome ? 'is-exiting-home' : ''
      }`}
    >
      {/* Top Header Bar with Back Button & Reload Button */}
      <header className="roadmap-top-bar">
        <button
          type="button"
          className="roadmap-back-btn"
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

        {/* Reload Sequence Icon Button */}
        <button
          type="button"
          className="roadmap-reload-btn"
          onClick={handleReplayGeneration}
          aria-label="Replay Generation Sequence"
          title="Replay Unlock Sequence"
        >
          <svg
            width="20"
            height="20"
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

      {/* Header Section */}
      <section className="roadmap-header">
        <h1 className="roadmap-title">
          {isMl ? (
            <>ആരോഗ്യമുള്ള വിളകളിലേക്കുള്ള<br />നിങ്ങളുടെ വഴി തയ്യാറാണ്.</>
          ) : (
            <>Your path to healthier<br />crops is ready.</>
          )}
        </h1>
        {activeFlow === 3 && isGenerating && (
          <p className="roadmap-subtitle-preparing">
            <span className="roadmap-subtitle-pulse-dot">✦</span> Creating your personalized plan...
          </p>
        )}
        {activeFlow !== 3 && (
          <p className="roadmap-subtitle">
            {isMl ? (
              <>
                {"നമുക്ക് ആദ്യപടി "}
                <span className="roadmap-highlight-step">ഒന്നിച്ച്</span>
                {" തുടങ്ങാം."}
              </>
            ) : (
              <>
                {"Let's take the "}
                <span className="roadmap-highlight-step">first step</span>
                {" together."}
              </>
            )}
          </p>
        )}
      </section>

      {activeFlow === 3 ? (
        /* Flow 3: Dedicated Scroll Container for Vertical Step Cards */
        <div ref={scrollContainerRef} className="roadmap-flow3-scroll-container">
          <div className="roadmap-flow3-vertical-list">
            {stepsData.map((step, idx) => {
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
                    {idx < stepsData.length - 1 && (
                      <div className={`roadmap-flow3-line ${isRevealed ? 'revealed' : ''}`} />
                    )}
                  </div>

                  {/* Right Full-Width Vertical Step Card */}
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
                        } else if (idx === 1) {
                          if (onOpenAiChat) onOpenAiChat();
                        } else if (idx === 2) {
                          if (onOpenAddField) onOpenAddField('weather');
                        } else if (idx === 3) {
                          if (onOpenAddField) onOpenAddField('spray');
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

                      {/* Black Shade Overlay with Golden Padlock */}
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
                              {isCurrentlyGenerating ? (isMl ? 'തുറക്കുന്നു...' : 'Unlocking') : (isMl ? 'പൂട്ടിയിരിക്കുന്നു' : 'Locked')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Content Overlay */}
                      <div className="roadmap-flow3-card-overlay">
                        <h3 className="roadmap-flow3-card-title">{step.title}</h3>

                        {/* Subtitle & Inside Card CTA Button */}
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
                                } else if (idx === 1) {
                                  if (onOpenAiChat) onOpenAiChat();
                                } else if (idx === 2) {
                                  if (onOpenAddField) onOpenAddField('weather');
                                } else if (idx === 3) {
                                  if (onOpenAddField) onOpenAddField('spray');
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
          {stepsData.map((step, idx) => {
            const isRevealed = revealedSteps[idx];
            const isCurrentlyGenerating = isGenerating && generatingIndex === idx;
            const isActive = idx === activeIndex;
            const isSelected = idx === activeIndex || idx === selectedCardIndex;

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
                    } else if (idx === 2) {
                      if (onOpenAddField) onOpenAddField('weather');
                    } else if (idx === 3) {
                      if (onOpenAddField) onOpenAddField('spray');
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
                          {isCurrentlyGenerating ? (isMl ? 'തുറക്കുന്നു...' : 'Unlocking') : (isMl ? 'പൂട്ടിയിരിക്കുന്നു' : 'Locked')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="roadmap-card-text-overlay">
                    <h3 className="roadmap-card-title">{step.title}</h3>
                    <p className="roadmap-card-desc">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Carousel Dots Indicator (Flows 1 & 2 only) */}
      {activeFlow !== 3 && (
        <div className="roadmap-dots-indicator">
          {stepsData.map((_, idx) => {
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

      {/* Bottom Sticky Action Footer */}
      <footer className="roadmap-footer">
        <button
          type="button"
          className={`roadmap-cta-btn ${isGenerating ? 'cta-generating' : ''}`}
          onClick={handleCtaClick}
        >
          {isGenerating ? (
            <span>{isMl ? 'പ്ലാൻ തയ്യാറാകുന്നു...' : 'Generating Your Farming Plan...'}</span>
          ) : (
            currentSelectedStep.cta
          )}
        </button>

        {/* Secondary Navigation Link to Home Screen */}
        <button
          type="button"
          className="roadmap-skip-home-link"
          onClick={() => {
            if (onGoHome) onGoHome();
          }}
        >
          {isMl ? 'പിന്നീട്, ഹോമിലേക്ക് പോകാം' : 'Later, Go to Home'}
        </button>
      </footer>

      {/* Floating Notification Toast */}
      {toastMessage && <div className="roadmap-toast">{toastMessage}</div>}
    </div>
  );
}
