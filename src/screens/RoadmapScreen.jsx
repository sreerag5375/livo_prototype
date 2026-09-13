import { useState, useRef, useEffect } from 'react';
import './RoadmapScreen.css';

export default function RoadmapScreen({
  onBack,
  onStartScan,
  onOpenAiChat,
  onOpenAddField,
  onGoHome,
  skipGeneration = false,
  language = 'en',
}) {
  const isMl = language === 'ml';

  /*
   * 3 CARDS ONLY
   *
   * Card 1 = Plant Health Check
   * Card 2 = Farming Help
   * Card 3 = Add Field
   */
  const stepsData = [
    {
      id: 1,
      stepBadge: isMl ? 'ഘട്ടം 1 / 3' : 'STEP 1 OF 3',
      shortLabel: isMl ? 'ആരോഗ്യ പരിശോധന' : 'Health Check',
      image: '/assets/images/onboarding/roadmap/1.png',
      title: isMl ? 'ചെടിയുടെ ആരോഗ്യ പരിശോധന' : 'Plant Health Check',
      cta: isMl ? 'ചെടിയുടെ ആരോഗ്യം അറിയാം →' : 'Start Health Check →',
    },
    {
      id: 2,
      stepBadge: isMl ? 'ഘട്ടം 2 / 3' : 'STEP 2 OF 3',
      shortLabel: isMl ? 'കൃഷി സഹായം' : 'Farming Help',
      image: '/assets/images/onboarding/roadmap/5.png',
      title: isMl ? 'ഏതു സമയത്തും കൃഷി സഹായം' : 'Farming Help, Anytime',
      cta: isMl ? 'ചോദിക്കാം →' : 'Ask Farming Help →',
    },
    {
      id: 3,
      stepBadge: isMl ? 'ഘട്ടം 3 / 3' : 'STEP 3 OF 3',
      shortLabel: isMl ? 'ഫീൽഡ് ചേർക്കുക' : 'Add Field',
      image: '/assets/images/onboarding/roadmap/8.png',
      title: isMl ? 'നിങ്ങളുടെ ഫീൽഡ് ചേർക്കുക' : 'Add Your Field',
      cta: isMl ? 'ഫീൽഡ് ചേർക്കാം →' : 'Add Field →',
    },
  ];

  /*
   * There are now 3 cards instead of 4.
   */
  const [revealedSteps, setRevealedSteps] = useState(
    skipGeneration ? [true, true, true] : [false, false, false]
  );

  const [generatingIndex, setGeneratingIndex] = useState(
    skipGeneration ? -1 : 0
  );

  const [isGenerating, setIsGenerating] = useState(!skipGeneration);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [isPlanComplete, setIsPlanComplete] = useState(skipGeneration);
  const [reloadKey, setReloadKey] = useState(0);

  const screenContainerRef = useRef(null);
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
    setSelectedCardIndex(idx);
  };

  /*
   * Finish generation immediately.
   */
  const fastForwardToComplete = () => {
    clearAllTimers();

    setRevealedSteps([true, true, true]);
    setGeneratingIndex(-1);
    setIsGenerating(false);
    setIsPlanComplete(true);
    setSelectedCardIndex(0);

    scrollToStep(0);
  };

  /*
   * Replay the 3-card unlock animation.
   */
  const handleReplayGeneration = () => {
    clearAllTimers();

    setRevealedSteps([false, false, false]);
    setGeneratingIndex(0);
    setIsGenerating(true);
    setIsPlanComplete(false);
    setSelectedCardIndex(0);
    setActiveIndex(0);

    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: 'instant',
      });
    }

    if (screenContainerRef.current) {
      screenContainerRef.current.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    }

    setReloadKey((prev) => prev + 1);
  };

  const showToast = (msg) => {
    setToastMessage(msg);

    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  /*
   * 3-CARD GENERATION SEQUENCE
   *
   * Card 1 unlocks
   * Card 2 unlocks
   * Card 3 unlocks
   * Then return to card 1
   */
  useEffect(() => {
    if (skipGeneration) return;

    clearAllTimers();

    // Card 1 unlocks
    const t1 = setTimeout(() => {
      setRevealedSteps([true, false, false]);
    }, 1100);

    // Move to card 2
    const t2 = setTimeout(() => {
      scrollToStep(1);
      setGeneratingIndex(1);
    }, 2000);

    // Card 2 unlocks
    const t3 = setTimeout(() => {
      setRevealedSteps([true, true, false]);
    }, 2600);

    // Move to card 3
    const t4 = setTimeout(() => {
      scrollToStep(2);
      setGeneratingIndex(2);
    }, 3500);

    // Card 3 unlocks
    const t5 = setTimeout(() => {
      setRevealedSteps([true, true, true]);
    }, 4100);

    // Finish and return to card 1
    const t6 = setTimeout(() => {
      scrollToStep(0);
      setGeneratingIndex(-1);
      setIsGenerating(false);
      setIsPlanComplete(true);
    }, 5000);

    timersRef.current = [t1, t2, t3, t4, t5, t6];

    return () => clearAllTimers();
  }, [reloadKey, skipGeneration]);

  /*
   * Track which card is currently visible.
   */
  const handleScroll = () => {
    if (!carouselRef.current) return;

    const firstCard = carouselRef.current.querySelector('.roadmap-card');

    const stepWidth = firstCard
      ? firstCard.offsetWidth + 16
      : 266;

    const newIdx = Math.round(
      carouselRef.current.scrollLeft / stepWidth
    );

    if (
      newIdx !== activeIndex &&
      newIdx >= 0 &&
      newIdx < stepsData.length
    ) {
      setActiveIndex(newIdx);
      setSelectedCardIndex(newIdx);
    }
  };

  /*
   * Main CTA button action.
   */
  const handleCtaClick = () => {
    /*
     * If generation is still happening,
     * clicking the button finishes the animation.
     */
    if (isGenerating) {
      fastForwardToComplete();
      return;
    }

    const currentStep =
      stepsData[selectedCardIndex] || stepsData[0];

    /*
     * Card 1
     */
    if (selectedCardIndex === 0) {
      if (onStartScan) {
        onStartScan();
      }
    }

    /*
     * Card 2
     */
    else if (selectedCardIndex === 1) {
      if (onOpenAiChat) {
        onOpenAiChat();
      }
    }

    /*
     * Card 3 — Add Field
     */
    else if (selectedCardIndex === 2) {
      if (onOpenAddField) {
        onOpenAddField();
      }
    }
  };

  const currentSelectedStep =
    stepsData[selectedCardIndex] || stepsData[0];

  return (
    <div
      ref={screenContainerRef}
      className="roadmap-screen"
    >

      {/* Top Header Bar */}
      <header className="roadmap-top-bar">

        {/* Back */}
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

        {/* Replay */}
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
            <>
              ആരോഗ്യമുള്ള വിളകളിലേക്കുള്ള
              <br />
              നിങ്ങളുടെ വഴി തയ്യാറാണ്.
            </>
          ) : (
            <>
              Your path to healthier
              <br />
              crops is ready.
            </>
          )}
        </h1>
      </section>

      {/* Horizontal Carousel */}
      <div
        className={`roadmap-carousel ${isGenerating ? 'is-generating-mode' : ''
          }`}
        ref={carouselRef}
        onScroll={handleScroll}
      >

        {stepsData.map((step, idx) => {
          const isRevealed = revealedSteps[idx];

          const isCurrentlyGenerating =
            isGenerating && generatingIndex === idx;

          const isActive = idx === activeIndex;

          const isSelected =
            idx === activeIndex ||
            idx === selectedCardIndex;

          return (
            <div
              key={step.id}
              ref={(el) => {
                cardRefs.current[idx] = el;

                if (idx === 0) {
                  firstCardRef.current = el;
                }
              }}
              id={`roadmap-card-${idx}`}
              className={`
                roadmap-card
                ${isActive ? 'active' : ''}
                ${isSelected
                  ? 'is-selected-card'
                  : 'is-unselected-card'
                }
                ${isRevealed
                  ? 'is-revealed'
                  : 'is-unrevealed'
                }
                ${isCurrentlyGenerating
                  ? 'is-generating'
                  : ''
                }
              `}
              onClick={() => {
                setSelectedCardIndex(idx);

                /*
                 * Clicking while generating
                 * finishes the generation.
                 */
                if (isGenerating) {
                  fastForwardToComplete();
                  return;
                }

                if (isPlanComplete || skipGeneration) {

                  // Card 1
                  if (idx === 0) {
                    if (onStartScan) {
                      onStartScan();
                    }
                  }

                  // Card 2
                  else if (idx === 1) {
                    if (onOpenAiChat) {
                      onOpenAiChat();
                    }
                  }

                  // Card 3 — Add Field
                  else if (idx === 2) {
                    if (onOpenAddField) {
                      onOpenAddField();
                    }
                  }

                }
              }}
            >

              {/* Card Artwork */}
              <div className="roadmap-card-flow2-content">

                <img
                  src={step.image}
                  alt={step.title}
                  className="roadmap-card-img"
                  draggable="false"
                />

                {/* Locked / Unlocked Shade */}
                <div
                  className={`
                    roadmap-card-flow2-shade
                    ${isRevealed
                      ? 'is-unlocked'
                      : 'is-locked'
                    }
                  `}
                >

                  {!isRevealed && (
                    <div className="roadmap-flow2-unlock-center">

                      <div
                        className={`
                          roadmap-flow2-lock-wrap
                          ${isCurrentlyGenerating
                            ? 'is-unlocking'
                            : ''
                          }
                        `}
                      >

                        <span className="roadmap-sparkle sparkle-top">
                          ✦
                        </span>

                        <span className="roadmap-sparkle sparkle-right">
                          ✦
                        </span>

                        <span className="roadmap-sparkle sparkle-left">
                          ✦
                        </span>

                        <svg
                          width="44"
                          height="52"
                          viewBox="0 0 44 52"
                          fill="none"
                          className="roadmap-padlock-svg"
                        >
                          <path
                            d="M13 22V13C13 8.02944 17.0294 4 22 4C26.9706 4 31 8.02944 31 13V15"
                            stroke="#FDE68A"
                            strokeWidth="4.5"
                            strokeLinecap="round"
                          />

                          <rect
                            x="5"
                            y="20"
                            width="34"
                            height="28"
                            rx="7"
                            fill="url(#padlockGold)"
                          />

                          <circle
                            cx="22"
                            cy="32"
                            r="3"
                            fill="#78350F"
                          />

                          <path
                            d="M22 34V39"
                            stroke="#78350F"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />

                          <defs>
                            <linearGradient
                              id="padlockGold"
                              x1="5"
                              y1="20"
                              x2="39"
                              y2="48"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                stopColor="#FBBF24"
                              />

                              <stop
                                offset="1"
                                stopColor="#D97706"
                              />
                            </linearGradient>
                          </defs>
                        </svg>

                      </div>

                      <span className="roadmap-flow2-unlock-label">
                        {isCurrentlyGenerating
                          ? (
                            isMl
                              ? 'തുറക്കുന്നു...'
                              : 'Unlocking'
                          )
                          : (
                            isMl
                              ? 'പൂട്ടിയിരിക്കുന്നു'
                              : 'Locked'
                          )}
                      </span>

                    </div>
                  )}

                </div>

                {/* Card Title ONLY */}
                <div className="roadmap-card-text-overlay">
                  <h3 className="roadmap-card-title">
                    {step.title}
                  </h3>
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* 
        Dots removed completely.
      */}

      {/* Bottom Sticky Action Footer */}
      <footer className="roadmap-footer">

        <button
          type="button"
          className={`
            roadmap-cta-btn
            ${isGenerating ? 'cta-generating' : ''}
          `}
          onClick={handleCtaClick}
        >

          {isGenerating ? (
            <span>
              {isMl
                ? 'പ്ലാൻ തയ്യാറാകുന്നു...'
                : 'Generating Your Farming Plan...'}
            </span>
          ) : (
            currentSelectedStep.cta
          )}

        </button>

        {/* Later, Go Home */}
        <button
          type="button"
          className="roadmap-skip-home-link"
          onClick={() => {
            if (onGoHome) {
              onGoHome();
            }
          }}
        >
          {isMl
            ? 'പിന്നീട്, ഹോമിലേക്ക് പോകാം'
            : 'Later, Go to Home'}
        </button>

      </footer>

      {/* Toast */}
      {toastMessage && (
        <div className="roadmap-toast">
          {toastMessage}
        </div>
      )}

    </div>
  );
}