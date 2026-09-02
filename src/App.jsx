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
import CameraScanScreen from './screens/CameraScanScreen';
import CameraConfirmScreen from './screens/CameraConfirmScreen';
import ScanResultScreen from './screens/ScanResultScreen';
import TreatmentPlanScreen from './screens/TreatmentPlanScreen';
import AiChatScreen from './screens/AiChatScreen';
import AddFieldScreen from './screens/AddFieldScreen';
import MapPinpointScreen from './screens/MapPinpointScreen';
import WeatherPlanningScreen from './screens/WeatherPlanningScreen';
import SprayingConditionsScreen from './screens/SprayingConditionsScreen';
import SharedCardTransition from './components/SharedCardTransition';
import RowCardsTransition from './components/RowCardsTransition';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('flow-select');
  const [activeFlow, setActiveFlow] = useState(1);
  const [language, setLanguage] = useState('en');
  const [transitionState, setTransitionState] = useState(null);
  const [roadmapSource, setRoadmapSource] = useState('goals');
  const [sharedTransition, setSharedTransition] = useState(null);
  const [rowTransition, setRowTransition] = useState(null);
  const [fieldData, setFieldData] = useState(null);
  const [targetFeature, setTargetFeature] = useState('weather');
  const [hasSkippedGuidance, setHasSkippedGuidance] = useState(false);

  const handleFeatureBackToRoadmap = () => {
    setRoadmapSource('home');
    setCurrentScreen(roadmapSource === 'home' ? 'home' : 'roadmap');
  };

  const handleOpenAddField = (feature = 'weather') => {
    setTargetFeature(feature);
    setCurrentScreen('add-field');
  };

  const handleAddFieldComplete = (data) => {
    setFieldData(data);
    setCurrentScreen('map-pinpoint');
  };

  const handleMapConfirm = (fullFieldData) => {
    setFieldData(fullFieldData);
    setCurrentScreen(fullFieldData.targetFeature === 'weather' ? 'weather-planning' : 'spraying-conditions');
  };

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

  const selectFlowAndStart = (flowNum) => {
    setActiveFlow(flowNum);
    setCurrentScreen('splash');
  };

  const goToLanguageFromSplash = () => {
    startSplashTransition();
  };

  const goToLivoIntro = (selectedLang) => {
    if (selectedLang) setLanguage(selectedLang);
    if (transitionState) return;
    setTransitionState({ from: 'language', to: 'livo-intro', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('livo-intro');
      setTransitionState(null);
    }, 400);
  };

  const goBackToLanguage = () => {
    if (transitionState) return;
    setTransitionState({ from: 'livo-intro', to: 'language', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('language');
      setTransitionState(null);
    }, 400);
  };

  const goToAccountCreation = () => {
    if (transitionState) return;
    setTransitionState({ from: 'livo-intro', to: 'account-creation', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('account-creation');
      setTransitionState(null);
    }, 400);
  };

  const goBackToLivoIntro = () => {
    if (transitionState) return;
    setTransitionState({ from: 'account-creation', to: 'livo-intro', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('livo-intro');
      setTransitionState(null);
    }, 400);
  };

  const goToSuccessFromAccount = () => {
    if (transitionState) return;
    setTransitionState({ from: 'account-creation', to: 'success', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('success');
      setTransitionState(null);
    }, 400);
  };

  const goBackToAccountFromSuccess = () => {
    if (transitionState) return;
    setTransitionState({ from: 'success', to: 'account-creation', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('account-creation');
      setTransitionState(null);
    }, 400);
  };

  const goToOnboardingFromSuccess = () => {
    if (transitionState) return;
    setTransitionState({ from: 'success', to: 'onboarding', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('onboarding');
      setTransitionState(null);
    }, 400);
  };

  const goToChallenges = () => {
    if (transitionState) return;
    setTransitionState({ from: 'onboarding', to: 'challenges', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('challenges');
      setTransitionState(null);
    }, 400);
  };

  const goToHomeFromOnboarding = () => {
    setHasSkippedGuidance(true);
    if (transitionState) return;
    setTransitionState({ from: 'onboarding', to: 'home', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('home');
      setTransitionState(null);
    }, 400);
  };

  const goBackToOnboardingFromChallenges = () => {
    if (transitionState) return;
    setTransitionState({ from: 'challenges', to: 'onboarding', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('onboarding');
      setTransitionState(null);
    }, 400);
  };

  const goToGoals = () => {
    if (transitionState) return;
    setTransitionState({ from: 'challenges', to: 'goals', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('goals');
      setTransitionState(null);
    }, 400);
  };

  const goBackToChallenges = () => {
    if (transitionState) return;
    setTransitionState({ from: 'goals', to: 'challenges', direction: 'slide-right' });
    setTimeout(() => {
      setCurrentScreen('challenges');
      setTransitionState(null);
    }, 400);
  };

  const goToRoadmap = () => {
    setRoadmapSource('goals');
    if (transitionState) return;
    setTransitionState({ from: 'goals', to: 'roadmap', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('roadmap');
      setTransitionState(null);
    }, 400);
  };

  const handleRoadmapBack = () => {
    if (roadmapSource === 'home') {
      goToHome();
    } else {
      if (transitionState) return;
      setTransitionState({ from: 'roadmap', to: 'goals', direction: 'slide-right' });
      setTimeout(() => {
        setCurrentScreen('goals');
        setTransitionState(null);
      }, 400);
    }
  };

  const goToHome = () => {
    if (transitionState) return;
    setTransitionState({ from: 'roadmap', to: 'home', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('home');
      setTransitionState(null);
    }, 400);
  };

  const handleSkipGuidanceToHome = () => {
    setHasSkippedGuidance(true);
    goToHome();
  };

  // Camera Scan Flow Handlers
  const goToCameraScan = () => {
    setCurrentScreen('camera-scan');
  };

  const goToCameraConfirm = () => {
    setCurrentScreen('camera-confirm');
  };

  const goToScanResult = () => {
    setCurrentScreen('scan-result');
  };

  const goToTreatmentPlan = () => {
    setCurrentScreen('treatment-plan');
  };

  const openFarmingPlanFromHome = () => {
    setHasSkippedGuidance(false);
    setRoadmapSource('home');
    if (transitionState) return;
    setTransitionState({ from: 'home', to: 'roadmap', direction: 'slide-left' });
    setTimeout(() => {
      setCurrentScreen('roadmap');
      setTransitionState(null);
    }, 400);
  };

  // Shared Card FLIP Transition from Roadmap Card 1 to Home Card 1
  const startSharedTransitionToHome = (cardElement, cardData, _cardIndex = 0) => {
    if (activeFlow === 3) {
      // Flow 3: Entire Row Upward Glide Transition
      const carouselEl = containerRef.current
        ? containerRef.current.querySelector('.roadmap-flow3-vertical-list') ||
          containerRef.current.querySelector('.roadmap-carousel')
        : null;

      const startTop = carouselEl ? carouselEl.getBoundingClientRect().top : 300;
      const endTop = 160;

      const flow3Cards = [
        {
          id: 1,
          title: 'Plant Health Check',
          description: 'Check your crop for early problems',
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
          title: 'Weather Planning',
          description: 'Plan farm work around the weather',
          image: '/assets/images/onboarding/roadmap/3.png',
        },
        {
          id: 4,
          title: 'Spraying Conditions',
          description: 'Find the right time to spray',
          image: '/assets/images/onboarding/roadmap/4.png',
        },
      ];

      setRowTransition({ startTop, endTop, cards: flow3Cards });
      setCurrentScreen('home');
      return;
    }

    // Flows 1 & 2: Shared Card FLIP Transition
    const targetEl = homeCardRef.current;
    if (!cardElement || !targetEl) {
      goToHome();
      return;
    }

    const startRect = cardElement.getBoundingClientRect();
    const endRect = targetEl.getBoundingClientRect();

    setSharedTransition({
      startRect,
      endRect,
      cardData: cardData || {
        id: 1,
        title: 'Plant Health Check',
        description: 'A healthy crop is the foundation of your farming plan.',
        image: '/assets/images/onboarding/roadmap/1.png',
      },
    });

    setCurrentScreen('home');
  };

  const finishSharedTransition = () => {
    setSharedTransition(null);
  };

  const finishRowTransition = () => {
    setRowTransition(null);
  };

  return (
    <MobileFrame
      bottomBg={['onboarding', 'account-creation', 'language', 'livo-intro'].includes(currentScreen) ? '#ffffff' : '#4a2508'}
      overlayStatusBar={['onboarding', 'camera-scan', 'camera-confirm', 'ai-chat'].includes(currentScreen)}
    >
      <div className="app-screen-container" ref={containerRef}>
        {/* Start Screen: Choose Onboarding Flow */}
        {currentScreen === 'flow-select' && (
          <FlowSelectScreen onSelectFlow={selectFlowAndStart} />
        )}

        {/* Animated Splash Screen */}
        {currentScreen === 'splash' && (
          <SplashScreen onComplete={goToLanguageFromSplash} />
        )}

        {/* Language Selection Screen */}
        {(currentScreen === 'language' ||
          transitionState?.to === 'language' ||
          transitionState?.from === 'language') && (
          <div
            className={`screen-layer ${
              transitionState?.to === 'language' && transitionState?.direction === 'fade'
                ? 'fade-enter'
                : transitionState?.from === 'language' && transitionState?.direction === 'slide-left'
                ? 'slide-left-exit'
                : transitionState?.to === 'language' && transitionState?.direction === 'slide-right'
                ? 'slide-right-enter'
                : ''
            }`}
          >
            <LanguageScreen
              onContinue={goToLivoIntro}
              initialLanguage={language}
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
              language={language}
            />
          </div>
        )}

        {/* Account Creation Screen */}
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
              language={language}
            />
          </div>
        )}

        {/* Success Celebration Screen */}
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
              onComplete={goToOnboardingFromSuccess}
              onBack={goBackToAccountFromSuccess}
              activeFlow={activeFlow}
              language={language}
            />
          </div>
        )}

        {/* Onboarding / Guidance Screen */}
        {(currentScreen === 'onboarding' ||
          transitionState?.to === 'onboarding' ||
          transitionState?.from === 'onboarding') && (
          <div
            className={`screen-layer ${
              transitionState?.to === 'onboarding' && transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'onboarding' && transitionState?.direction === 'slide-right'
                ? 'slide-right-enter'
                : transitionState?.from === 'onboarding' && transitionState?.direction === 'slide-left'
                ? 'slide-left-exit'
                : transitionState?.from === 'onboarding' && transitionState?.direction === 'slide-right'
                ? 'slide-right-exit'
                : ''
            }`}
          >
            <OnboardingScreen
              onNext={goToChallenges}
              onSkip={goToHomeFromOnboarding}
              language={language}
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
              onBack={goBackToOnboardingFromChallenges}
              onContinue={goToGoals}
              language={language}
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
              language={language}
            />
          </div>
        )}

        {/* Roadmap Screen */}
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
              onStartScan={goToCameraScan}
              onOpenAiChat={() => setCurrentScreen('ai-chat')}
              onOpenAddField={handleOpenAddField}
              onGoHome={handleSkipGuidanceToHome}
              onPlanReadyForHome={startSharedTransitionToHome}
              skipGeneration={roadmapSource === 'home'}
              hideCard1={sharedTransition !== null}
              isExitingToHome={sharedTransition !== null || rowTransition !== null}
              activeFlow={activeFlow}
              language={language}
            />
          </div>
        )}

        {/* Camera Scan Viewfinder Screen */}
        {currentScreen === 'camera-scan' && (
          <div className="screen-layer">
            <CameraScanScreen
              onClose={() => setCurrentScreen('roadmap')}
              onCapture={goToCameraConfirm}
            />
          </div>
        )}

        {/* Camera Photo Confirmation Screen */}
        {currentScreen === 'camera-confirm' && (
          <div className="screen-layer">
            <CameraConfirmScreen
              onRetake={goToCameraScan}
              onConfirm={goToScanResult}
            />
          </div>
        )}

        {/* Scan Result Diagnosis Screen */}
        {currentScreen === 'scan-result' && (
          <div className="screen-layer">
            <ScanResultScreen
              onBack={handleFeatureBackToRoadmap}
              onViewTreatment={goToTreatmentPlan}
            />
          </div>
        )}

        {/* Detailed Treatment Plan Screen */}
        {currentScreen === 'treatment-plan' && (
          <div className="screen-layer">
            <TreatmentPlanScreen
              onBack={goToScanResult}
              onDownload={goToHome}
              onShare={goToHome}
            />
          </div>
        )}

        {/* LIVO AI Assistant Chat Screen */}
        {currentScreen === 'ai-chat' && (
          <div className="screen-layer">
            <AiChatScreen
              onBack={handleFeatureBackToRoadmap}
              language={language}
            />
          </div>
        )}

        {/* Add Field Form Screen */}
        {currentScreen === 'add-field' && (
          <div className="screen-layer">
            <AddFieldScreen
              onBack={handleFeatureBackToRoadmap}
              onComplete={handleAddFieldComplete}
              targetFeature={targetFeature}
              language={language}
            />
          </div>
        )}

        {/* Map Pinpoint Screen */}
        {currentScreen === 'map-pinpoint' && (
          <div className="screen-layer">
            <MapPinpointScreen
              fieldData={fieldData}
              onBack={() => setCurrentScreen('add-field')}
              onConfirm={handleMapConfirm}
              language={language}
            />
          </div>
        )}

        {/* Weather Planning Screen */}
        {currentScreen === 'weather-planning' && (
          <div className="screen-layer">
            <WeatherPlanningScreen
              fieldData={fieldData}
              onBack={handleFeatureBackToRoadmap}
              language={language}
            />
          </div>
        )}

        {/* Spraying Conditions Screen */}
        {currentScreen === 'spraying-conditions' && (
          <div className="screen-layer">
            <SprayingConditionsScreen
              onBack={handleFeatureBackToRoadmap}
              language={language}
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
              onActionClick={(action) => {
                if (action === 'health-check' || action === 'scan') {
                  goToCameraScan();
                }
              }}
              onOpenAiChat={() => setCurrentScreen('ai-chat')}
              onOpenAddField={handleOpenAddField}
              onViewAllPlan={openFarmingPlanFromHome}
              _activeFlow={activeFlow}
              language={language}
              showGuidanceCard={hasSkippedGuidance}
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

        {/* Row Cards Transition Overlay (Flow 3) */}
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
