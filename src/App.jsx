import { useState, useEffect, useRef } from 'react';
import MobileFrame from './components/MobileFrame';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import GoalsScreen from './screens/GoalsScreen';
import RoadmapScreen from './screens/RoadmapScreen';
import HomeScreen from './screens/HomeScreen';
import SharedCardTransition from './components/SharedCardTransition';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [transitionState, setTransitionState] = useState(null);
  const [roadmapSource, setRoadmapSource] = useState('goals');
  const [sharedTransition, setSharedTransition] = useState(null);

  const containerRef = useRef(null);
  const homeCardRef = useRef(null);

  useEffect(() => {
    // 1.8s delay on splash screen before smooth transition to onboarding
    const timer = setTimeout(() => {
      startSplashTransition();
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const startSplashTransition = () => {
    if (currentScreen !== 'splash' || transitionState) return;
    setTransitionState({ from: 'splash', to: 'onboarding', direction: 'fade' });
    setTimeout(() => {
      setCurrentScreen('onboarding');
      setTransitionState(null);
    }, 480);
  };

  const goToChallenges = () => {
    if (transitionState) return;
    setTransitionState({ from: 'onboarding', to: 'challenges', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('challenges');
      setTransitionState(null);
    }, 380);
  };

  const goBackToOnboarding = () => {
    if (transitionState) return;
    setTransitionState({ from: 'challenges', to: 'onboarding', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('onboarding');
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
  const startSharedTransitionToHome = (roadmapCardElement) => {
    if (!containerRef.current || !roadmapCardElement) {
      goToHome();
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const sRect = roadmapCardElement.getBoundingClientRect();
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

    setSharedTransition({
      startRect: startBox,
      endRect: endBox,
      cardData: {
        image: '/assets/images/onboarding/roadmap/1.png',
        title: 'Plant Health Check',
        description: 'A healthy crop is the foundation of your farming plan.',
        stepBadge: 'STEP 1 OF 4',
      },
    });
  };

  const finishSharedTransition = () => {
    setSharedTransition(null);
    setCurrentScreen('home');
    setRoadmapSource('home');
  };

  // Determine active/visible screen
  const activeScreen = transitionState ? transitionState.to : currentScreen;
  const isOnboarding = activeScreen === 'onboarding';
  const isHome = activeScreen === 'home' || sharedTransition !== null;

  return (
    <MobileFrame
      lightContent={false}
      statusBarLight={isHome}
      homeIndicatorLight={isOnboarding}
      screenBg="#FFFFFF"
      bottomBg={isOnboarding ? '#653814' : '#FFFFFF'}
      overlayStatusBar={isHome}
    >
      <div className="screens-container" ref={containerRef}>
        {/* Splash Screen */}
        {(currentScreen === 'splash' || transitionState?.from === 'splash') && (
          <div
            className={`screen-layer ${
              transitionState?.from === 'splash' ? 'screen-exit' : ''
            }`}
          >
            <SplashScreen
              onSkip={startSplashTransition}
              isExiting={transitionState?.from === 'splash'}
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
              onBack={goBackToOnboarding}
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
          sharedTransition !== null) && (
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
              sharedTransition !== null
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
              isExitingToHome={sharedTransition !== null}
            />
          </div>
        )}

        {/* App Home Screen */}
        {(currentScreen === 'home' ||
          currentScreen === 'roadmap' ||
          transitionState?.to === 'home' ||
          transitionState?.from === 'home' ||
          sharedTransition !== null) && (
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
              currentScreen === 'roadmap' && sharedTransition === null
                ? { opacity: 0, pointerEvents: 'none', zIndex: 0 }
                : sharedTransition !== null
                ? { zIndex: 2 }
                : undefined
            }
          >
            <HomeScreen
              firstCardRef={homeCardRef}
              isTransitioningFromPlan={sharedTransition !== null}
              hideCard1={sharedTransition !== null}
              onActionClick={(action) => console.log('Home action:', action)}
              onViewAllPlan={openFarmingPlanFromHome}
            />
          </div>
        )}

        {/* Shared Card Transition Overlay */}
        {sharedTransition && (
          <SharedCardTransition
            startRect={sharedTransition.startRect}
            endRect={sharedTransition.endRect}
            cardData={sharedTransition.cardData}
            onComplete={finishSharedTransition}
          />
        )}
      </div>
    </MobileFrame>
  );
}




