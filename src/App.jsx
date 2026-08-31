import { useState, useEffect, useRef } from 'react';
import MobileFrame from './components/MobileFrame';
import FlowSelectScreen from './screens/FlowSelectScreen';
import SplashScreen from './screens/SplashScreen';
import LanguageScreen from './screens/LanguageScreen';
import LivoIntroScreen from './screens/LivoIntroScreen';
import AccountCreationScreen from './screens/AccountCreationScreen';
import SuccessScreen from './screens/SuccessScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import GoalsScreen from './screens/GoalsScreen';
import RoadmapScreen from './screens/RoadmapScreen';
import HomeScreen from './screens/HomeScreen';
import SharedCardTransition from './components/SharedCardTransition';
import RowCardsTransition from './components/RowCardsTransition';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('flow-select');
  const [activeFlow, setActiveFlow] = useState(1);
  const [transitionState, setTransitionState] = useState(null);
  const [roadmapSource, setRoadmapSource] = useState('goals');
  const [sharedTransition, setSharedTransition] = useState(null);
  const [rowTransition, setRowTransition] = useState(null);

  const containerRef = useRef(null);
  const homeCardRef = useRef(null);

  const startSplashTransition = () => {
    if (transitionState) return;
    setTransitionState({ from: 'splash', to: 'language', direction: 'fade' });
    setTimeout(() => {
      setCurrentScreen('language');
      setTransitionState(null);
    }, 480);
  };

  // Trigger splash transition only when on splash screen
  useEffect(() => {
    if (currentScreen !== 'splash') return;
    const timer = setTimeout(() => {
      startSplashTransition();
    }, 1800);

    return () => clearTimeout(timer);
  }, [currentScreen]);

  const handleSelectFlow = (flowId) => {
    setActiveFlow(flowId);
    setTransitionState({ from: 'flow-select', to: 'splash', direction: 'fade' });
    setTimeout(() => {
      setCurrentScreen('splash');
      setTransitionState(null);
    }, 380);
  };

  const goToLivoIntro = () => {
    if (transitionState) return;
    setTransitionState({ from: 'language', to: 'livo-intro', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('livo-intro');
      setTransitionState(null);
    }, 380);
  };

  const goBackToLanguage = () => {
    if (transitionState) return;
    setTransitionState({ from: 'livo-intro', to: 'language', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('language');
      setTransitionState(null);
    }, 380);
  };

  const goToAccountCreation = () => {
    if (transitionState) return;
    setTransitionState({ from: 'livo-intro', to: 'account-creation', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('account-creation');
      setTransitionState(null);
    }, 380);
  };

  const goBackToLivoIntro = () => {
    if (transitionState) return;
    setTransitionState({ from: 'account-creation', to: 'livo-intro', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('livo-intro');
      setTransitionState(null);
    }, 380);
  };

  const goToSuccessFromAccount = () => {
    if (transitionState) return;
    setTransitionState({ from: 'account-creation', to: 'success', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('success');
      setTransitionState(null);
    }, 380);
  };

  const goBackToAccountFromSuccess = () => {
    if (transitionState) return;
    setTransitionState({ from: 'success', to: 'account-creation', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('account-creation');
      setTransitionState(null);
    }, 380);
  };

  const goToChallengesFromSuccess = () => {
    if (transitionState) return;
    setTransitionState({ from: 'success', to: 'challenges', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('challenges');
      setTransitionState(null);
    }, 380);
  };

  const goBackToSuccessFromChallenges = () => {
    if (transitionState) return;
    setTransitionState({ from: 'challenges', to: 'success', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('success');
      setTransitionState(null);
    }, 380);
  };

  const goToChallenges = () => {
    if (transitionState) return;
    setTransitionState({ from: 'onboarding', to: 'challenges', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('challenges');
      setTransitionState(null);
    }, 380);
  };

  const goToGoals = () => {
    if (transitionState) return;
    setTransitionState({ from: 'challenges', to: 'goals', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('goals');
      setTransitionState(null);
    }, 380);
  };

  const goBackToChallenges = () => {
    if (transitionState) return;
    setTransitionState({ from: 'goals', to: 'challenges', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('challenges');
      setTransitionState(null);
    }, 380);
  };

  const goToRoadmap = () => {
    if (transitionState) return;
    setRoadmapSource('goals');
    setTransitionState({ from: 'goals', to: 'roadmap', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('roadmap');
      setTransitionState(null);
    }, 380);
  };

  const goBackToGoals = () => {
    if (transitionState) return;
    setTransitionState({ from: 'roadmap', to: 'goals', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('goals');
      setTransitionState(null);
    }, 380);
  };

  const goToHome = () => {
    if (transitionState) return;
    setTransitionState({ from: 'roadmap', to: 'home', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('home');
      setTransitionState(null);
    }, 380);
  };

  const openFarmingPlanFromHome = () => {
    if (transitionState) return;
    setRoadmapSource('home');
    setTransitionState({ from: 'home', to: 'roadmap', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('roadmap');
      setTransitionState(null);
    }, 380);
  };

  const handleRoadmapBack = () => {
    if (transitionState) return;
    if (roadmapSource === 'home') {
      setTransitionState({ from: 'roadmap', to: 'home', direction: 'slide-right' });
      setTimeout(() => {
        setCurrentScreen('home');
        setTransitionState(null);
      }, 380);
    } else {
      goBackToGoals();
    }
  };

  // Automated shared-element transition from Farming Plan to Home
  const startSharedTransitionToHome = (roadmapElement, stepData, _stepIndex = 0) => {
    if (!containerRef.current || !roadmapElement) {
      goToHome();
      return;
    }

    if (activeFlow === 3) {
      // Flow 3: Entire Row Upward Glide Transition
      const containerRect = containerRef.current?.getBoundingClientRect();
      const sRect = roadmapElement?.getBoundingClientRect();
      const eRect = homeCardRef.current?.getBoundingClientRect();

      // Measure starting position of cards row in Farming Plan (lower on screen)
      const measuredStartTop =
        containerRect && sRect ? sRect.top - containerRect.top + 28 : 460;
      // Target position in Home's "Pick For You" carousel
      const measuredEndTop =
        containerRect && eRect && eRect.top > 0
          ? eRect.top - containerRect.top
          : 396;

      // Ensure startTop is strictly lower than endTop for the smooth upward movement!
      const endTop = measuredEndTop;
      const startTop = Math.max(measuredStartTop, endTop + 54);

      const FLOW_3_CARDS = [
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

      setRowTransition({
        startTop,
        endTop,
        cards: FLOW_3_CARDS,
      });
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const sRect = roadmapElement.getBoundingClientRect();
    const eRect = homeCardRef.current?.getBoundingClientRect();

    const startBox = {
      top: sRect.top - containerRect.top,
      left: sRect.left - containerRect.left,
      width: sRect.width,
      height: sRect.height,
    };

    const endBox = eRect
      ? {
          top: eRect.top - containerRect.top,
          left: Math.max(20, eRect.left - containerRect.left),
          width: eRect.width,
          height: eRect.height,
        }
      : {
          top: 360,
          left: 20,
          width: 165,
          height: 212,
        };

    const targetStep = stepData || {
      image: '/assets/images/onboarding/roadmap/1.png',
      title: 'Plant Health Check',
      stepBadge: 'STEP 1 OF 4',
    };

    setSharedTransition({
      startRect: startBox,
      endRect: endBox,
      cardData: {
        image: targetStep.image,
        title: targetStep.title,
        stepBadge: targetStep.stepBadge,
      },
    });
  };

  const finishSharedTransition = () => {
    setSharedTransition(null);
    setCurrentScreen('home');
    setRoadmapSource('home');
  };

  const finishRowTransition = () => {
    setRowTransition(null);
    setCurrentScreen('home');
    setRoadmapSource('home');
  };

  // Determine active/visible screen
  const activeScreen = transitionState ? transitionState.to : currentScreen;
  const isDarkBottom =
    activeScreen === 'livo-intro' || activeScreen === 'onboarding';
  const isHome =
    activeScreen === 'home' ||
    sharedTransition !== null ||
    rowTransition !== null;

  return (
    <MobileFrame
      lightContent={false}
      statusBarLight={isHome}
      homeIndicatorLight={isDarkBottom || activeScreen === 'success'}
      screenBg={activeScreen === 'account-creation' ? '#C6ECFE' : '#FFFFFF'}
      bottomBg={
        activeScreen === 'livo-intro'
          ? '#261205'
          : activeScreen === 'onboarding'
          ? '#653814'
          : '#FFFFFF'
      }
      overlayStatusBar={
        isHome ||
        activeScreen === 'account-creation' ||
        activeScreen === 'success' ||
        activeScreen === 'language' ||
        activeScreen === 'livo-intro'
      }
      overlayHomeIndicator={activeScreen === 'success'}
    >
      <div className="screens-container" ref={containerRef}>
        {/* Flow Selection Screen */}
        {(currentScreen === 'flow-select' || transitionState?.from === 'flow-select') && (
          <div
            className={`screen-layer ${
              transitionState?.from === 'flow-select' ? 'screen-exit' : ''
            }`}
          >
            <FlowSelectScreen onSelectFlow={handleSelectFlow} />
          </div>
        )}

        {/* Splash Screen */}
        {(currentScreen === 'splash' ||
          transitionState?.to === 'splash' ||
          transitionState?.from === 'splash') && (
          <div
            className={`screen-layer ${
              transitionState?.to === 'splash'
                ? 'screen-enter'
                : transitionState?.from === 'splash'
                ? 'screen-exit'
                : ''
            }`}
          >
            <SplashScreen
              onSkip={startSplashTransition}
              isExiting={transitionState?.from === 'splash'}
            />
          </div>
        )}

        {/* Language Selection Screen */}
        {(currentScreen === 'language' ||
          transitionState?.to === 'language' ||
          transitionState?.from === 'language') && (
          <div
            className={`screen-layer ${
              transitionState?.from === 'splash'
                ? 'screen-enter'
                : transitionState?.from === 'language' && transitionState?.direction === 'slide-left'
                ? 'slide-left-exit'
                : transitionState?.to === 'language' && transitionState?.direction === 'slide-right'
                ? 'slide-right-enter'
                : ''
            }`}
          >
            <LanguageScreen
              onContinue={goToLivoIntro}
            />
          </div>
        )}

        {/* Livo Intro Video Screen */}
        {(currentScreen === 'livo-intro' ||
          transitionState?.to === 'livo-intro' ||
          transitionState?.from === 'livo-intro') && (
          <div
            className={`screen-layer ${
              transitionState?.to === 'livo-intro' && transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'livo-intro' && transitionState?.direction === 'slide-right'
                ? 'slide-right-enter'
                : transitionState?.from === 'livo-intro' && transitionState?.direction === 'slide-left'
                ? 'slide-left-exit'
                : transitionState?.from === 'livo-intro' && transitionState?.direction === 'slide-right'
                ? 'slide-right-exit'
                : ''
            }`}
          >
            <LivoIntroScreen
              onGetStarted={goToAccountCreation}
              onBack={goBackToLanguage}
            />
          </div>
        )}

        {/* Account Creation Screen (Phone -> Verify -> Name) */}
        {(currentScreen === 'account-creation' ||
          transitionState?.to === 'account-creation' ||
          transitionState?.from === 'account-creation') && (
          <div
            className={`screen-layer ${
              transitionState?.to === 'account-creation' && transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'account-creation' && transitionState?.direction === 'slide-right'
                ? 'slide-right-enter'
                : transitionState?.from === 'account-creation' && transitionState?.direction === 'slide-left'
                ? 'slide-left-exit'
                : transitionState?.from === 'account-creation' && transitionState?.direction === 'slide-right'
                ? 'slide-right-exit'
                : ''
            }`}
          >
            <AccountCreationScreen
              onComplete={goToSuccessFromAccount}
              onBackToIntro={goBackToLivoIntro}
            />
          </div>
        )}

        {/* Success Celebration Screen (Checkmark + Confetti + Video) */}
        {(currentScreen === 'success' ||
          transitionState?.to === 'success' ||
          transitionState?.from === 'success') && (
          <div
            className={`screen-layer ${
              transitionState?.to === 'success' && transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'success' && transitionState?.direction === 'slide-right'
                ? 'slide-right-enter'
                : transitionState?.from === 'success' && transitionState?.direction === 'slide-left'
                ? 'slide-left-exit'
                : transitionState?.from === 'success' && transitionState?.direction === 'slide-right'
                ? 'slide-right-exit'
                : ''
            }`}
          >
            <SuccessScreen
              onComplete={goToChallengesFromSuccess}
              onBack={goBackToAccountFromSuccess}
            />
          </div>
        )}

        {/* Onboarding Screen */}
        {(currentScreen === 'onboarding' ||
          transitionState?.to === 'onboarding' ||
          transitionState?.from === 'onboarding') && (
          <div
            className={`screen-layer ${
              transitionState?.from === 'splash'
                ? 'screen-enter'
                : transitionState?.from === 'onboarding' && transitionState?.direction === 'slide-left'
                ? 'slide-left-exit'
                : transitionState?.to === 'onboarding' && transitionState?.direction === 'slide-right'
                ? 'slide-right-enter'
                : ''
            }`}
          >
            <OnboardingScreen
              onNext={goToChallenges}
              onSkip={goToChallenges}
            />
          </div>
        )}

        {/* Challenges Screen */}
        {(currentScreen === 'challenges' ||
          transitionState?.to === 'challenges' ||
          transitionState?.from === 'challenges') && (
          <div
            className={`screen-layer ${
              transitionState?.to === 'challenges' && transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'challenges' && transitionState?.direction === 'slide-right'
                ? 'slide-right-enter'
                : transitionState?.from === 'challenges' && transitionState?.direction === 'slide-left'
                ? 'slide-left-exit'
                : transitionState?.from === 'challenges' && transitionState?.direction === 'slide-right'
                ? 'slide-right-exit'
                : ''
            }`}
          >
            <ChallengesScreen
              onBack={goBackToSuccessFromChallenges}
              onContinue={goToGoals}
            />
          </div>
        )}

        {/* Goals Screen */}
        {(currentScreen === 'goals' ||
          transitionState?.to === 'goals' ||
          transitionState?.from === 'goals') && (
          <div
            className={`screen-layer ${
              transitionState?.to === 'goals' && transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'goals' && transitionState?.direction === 'slide-right'
                ? 'slide-right-enter'
                : transitionState?.from === 'goals' && transitionState?.direction === 'slide-left'
                ? 'slide-left-exit'
                : transitionState?.from === 'goals' && transitionState?.direction === 'slide-right'
                ? 'slide-right-exit'
                : ''
            }`}
          >
            <GoalsScreen
              onBack={goBackToChallenges}
              onContinue={goToRoadmap}
            />
          </div>
        )}

        {/* Roadmap Screen with Path Carousel */}
        {(currentScreen === 'roadmap' ||
          transitionState?.to === 'roadmap' ||
          transitionState?.from === 'roadmap' ||
          sharedTransition !== null ||
          rowTransition !== null) && (
          <div
            className={`screen-layer ${
              transitionState?.to === 'roadmap' && transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'roadmap' && transitionState?.direction === 'slide-right'
                ? 'slide-right-enter'
                : transitionState?.from === 'roadmap' && transitionState?.direction === 'slide-left'
                ? 'slide-left-exit'
                : transitionState?.from === 'roadmap' && transitionState?.direction === 'slide-right'
                ? 'slide-right-exit'
                : ''
            }`}
            style={
              sharedTransition !== null || rowTransition !== null
                ? { zIndex: 1, pointerEvents: 'none' }
                : undefined
            }
          >
            <RoadmapScreen
              onBack={handleRoadmapBack}
              onStartScan={goToHome}
              onGoHome={goToHome}
              onPlanReadyForHome={startSharedTransitionToHome}
              skipGeneration={roadmapSource === 'home'}
              hideCard1={sharedTransition !== null}
              isExitingToHome={sharedTransition !== null || rowTransition !== null}
              activeFlow={activeFlow}
            />
          </div>
        )}

        {/* App Home Screen */}
        {(currentScreen === 'home' ||
          currentScreen === 'roadmap' ||
          transitionState?.to === 'home' ||
          transitionState?.from === 'home' ||
          sharedTransition !== null ||
          rowTransition !== null) && (
          <div
            className={`screen-layer ${
              transitionState?.to === 'home' && transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'home' && transitionState?.direction === 'slide-right'
                ? 'slide-right-enter'
                : transitionState?.from === 'home' && transitionState?.direction === 'slide-left'
                ? 'slide-left-exit'
                : transitionState?.from === 'home' && transitionState?.direction === 'slide-right'
                ? 'slide-right-exit'
                : ''
            }`}
            style={
              currentScreen === 'roadmap' && sharedTransition === null && rowTransition === null
                ? { opacity: 0, pointerEvents: 'none', zIndex: 0 }
                : sharedTransition !== null || rowTransition !== null
                ? { zIndex: 2 }
                : undefined
            }
          >
            <HomeScreen
              firstCardRef={homeCardRef}
              isTransitioningFromPlan={sharedTransition !== null || rowTransition !== null}
              hideCard1={sharedTransition !== null}
              hideAllCards={rowTransition !== null}
              onActionClick={(action) => console.log('Home action:', action)}
              onViewAllPlan={openFarmingPlanFromHome}
              _activeFlow={activeFlow}
            />
          </div>
        )}

        {/* Shared Card Transition Overlay (Flow 1 & 2) */}
        {sharedTransition && (
          <SharedCardTransition
            startRect={sharedTransition.startRect}
            endRect={sharedTransition.endRect}
            cardData={sharedTransition.cardData}
            onComplete={finishSharedTransition}
            isGameVariant={false}
          />
        )}

        {/* Row Cards Transition Overlay (Flow 3: Entire Row Upward Glide) */}
        {rowTransition && (
          <RowCardsTransition
            startTop={rowTransition.startTop}
            endTop={rowTransition.endTop}
            cards={rowTransition.cards}
            onComplete={finishRowTransition}
          />
        )}
      </div>
    </MobileFrame>
  );
}




