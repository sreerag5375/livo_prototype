import { useState, useEffect } from 'react';

import MobileFrame from './components/MobileFrame';

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

import FieldSetupDoneScreen from './screens/FieldSetupDoneScreen';
import FieldDetailsScreen from './screens/FieldDetailsScreen';
import SprayingConditionsScreen from './screens/SprayingConditionsScreen';


export default function App() {

  const [currentScreen, setCurrentScreen] = useState('splash');

  const [language, setLanguage] = useState('en');

  const [transitionState, setTransitionState] = useState(null);

  /*
   * Keeps track of where the Farming Path / Roadmap
   * was opened from.
   *
   * 'goals' = Roadmap opened from Goals
   * 'home'  = Roadmap opened from Home
   */
  const [roadmapSource, setRoadmapSource] = useState('goals');

  const [fieldData, setFieldData] = useState(null);

  /*
   * Used by Add Field flow.
   *
   * Currently defaults to weather because the existing
   * Add Field flow continues to Weather Planning.
   */
  const [targetFeature, setTargetFeature] = useState('weather');

  const [hasSkippedGuidance, setHasSkippedGuidance] = useState(false);

  const [accountStep, setAccountStep] = useState(1);


  /*
   * =========================================================
   * FEATURE → FARMING PATH BACK
   * =========================================================
   *
   * All feature screens use this function for their Back button.
   *
   * Examples:
   *
   * AI Chat → Back → Farming Path
   * Scan Result → Back → Farming Path
   * Add Field → Back → Farming Path
   * Weather Planning → Back → Farming Path
   * Spraying Conditions → Back → Farming Path
   */
  const handleFeatureBackToRoadmap = () => {

    if (transitionState) return;

    setTransitionState({
      from: currentScreen,
      to: 'roadmap',
      direction: 'slide-right',
    });

    setTimeout(() => {
      setCurrentScreen('roadmap');
      setTransitionState(null);
    }, 400);
  };


  /*
   * =========================================================
   * ADD FIELD FLOW
   * =========================================================
   */

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
    setCurrentScreen('field-setup-done');
  };

  /*
   * =========================================================
   * FIELD SETUP DONE → FIELD DETAILS
   * =========================================================
   *
   * The main CTA on Field Setup Done opens the
   * Field Details subpage.
   */
  const handleFieldSetupDoneContinue = () => {
    setCurrentScreen('field-details');
  };


  /*
   * Field Details → Field Setup Done
   *
   * The Field Details page is a subpage of the setup flow,
   * so its Back button returns to Field Setup Done.
   */
  const handleFieldDetailsBack = () => {
    setCurrentScreen('field-setup-done');
  };


  /*
   * =========================================================
   * SPLASH
   * =========================================================
   */

  const startSplashTransition = () => {

    if (transitionState) return;

    setTransitionState({
      from: 'splash',
      to: 'language',
      direction: 'fade',
    });

    setTimeout(() => {

      setCurrentScreen('language');

      setTransitionState(null);

    }, 480);
  };


  useEffect(() => {

    if (currentScreen !== 'splash') return;

    const timer = setTimeout(() => {

      startSplashTransition();

    }, 1800);

    return () => clearTimeout(timer);

  }, [currentScreen]);


  const goToLanguageFromSplash = () => {

    startSplashTransition();

  };


  /*
   * =========================================================
   * LANGUAGE
   * =========================================================
   */

  const goToLivoIntro = (selectedLang) => {

    if (selectedLang) {
      setLanguage(selectedLang);
    }

    if (transitionState) return;

    setTransitionState({
      from: 'language',
      to: 'livo-intro',
      direction: 'slide-left',
    });

    setTimeout(() => {

      setCurrentScreen('livo-intro');

      setTransitionState(null);

    }, 400);
  };


  const goBackToLanguage = () => {

    if (transitionState) return;

    setTransitionState({
      from: 'livo-intro',
      to: 'language',
      direction: 'slide-right',
    });

    setTimeout(() => {

      setCurrentScreen('language');

      setTransitionState(null);

    }, 400);
  };


  /*
   * =========================================================
   * ACCOUNT CREATION
   * =========================================================
   */

  const goToAccountCreation = () => {

    if (transitionState) return;

    setTransitionState({
      from: 'livo-intro',
      to: 'account-creation',
      direction: 'slide-left',
    });

    setTimeout(() => {

      setCurrentScreen('account-creation');

      setTransitionState(null);

    }, 400);
  };


  const goBackToLivoIntro = () => {

    if (transitionState) return;

    setTransitionState({
      from: 'account-creation',
      to: 'livo-intro',
      direction: 'slide-right',
    });

    setTimeout(() => {

      setCurrentScreen('livo-intro');

      setTransitionState(null);

    }, 400);
  };


  const goToChallengesFromAccount = () => {

    if (transitionState) return;

    setTransitionState({
      from: 'account-creation',
      to: 'challenges',
      direction: 'slide-left',
    });

    setTimeout(() => {

      setCurrentScreen('challenges');

      setTransitionState(null);

    }, 400);
  };


  /*
   * =========================================================
   * SUCCESS
   * =========================================================
   */

  const goBackToAccountFromSuccess = () => {

    if (transitionState) return;

    setTransitionState({
      from: 'success',
      to: 'account-creation',
      direction: 'slide-right',
    });

    setTimeout(() => {

      setCurrentScreen('account-creation');

      setTransitionState(null);

    }, 400);
  };


  const goToOnboardingFromSuccess = () => {

    if (transitionState) return;

    setTransitionState({
      from: 'success',
      to: 'onboarding',
      direction: 'slide-left',
    });

    setTimeout(() => {

      setCurrentScreen('onboarding');

      setTransitionState(null);

    }, 400);
  };


  /*
   * =========================================================
   * ONBOARDING
   * =========================================================
   */

  const goToChallenges = () => {

    if (transitionState) return;

    setTransitionState({
      from: 'onboarding',
      to: 'challenges',
      direction: 'slide-left',
    });

    setTimeout(() => {

      setCurrentScreen('challenges');

      setTransitionState(null);

    }, 400);
  };


  const goToHomeFromOnboarding = () => {

    setHasSkippedGuidance(true);

    if (transitionState) return;

    setTransitionState({
      from: 'onboarding',
      to: 'home',
      direction: 'slide-left',
    });

    setTimeout(() => {

      setCurrentScreen('home');

      setTransitionState(null);

    }, 400);
  };


  /*
   * =========================================================
   * CHALLENGES
   * =========================================================
   */

  const goBackToAccountFromChallenges = () => {

    setAccountStep(4);

    if (transitionState) return;

    setTransitionState({
      from: 'challenges',
      to: 'account-creation',
      direction: 'slide-right',
    });

    setTimeout(() => {

      setCurrentScreen('account-creation');

      setTransitionState(null);

    }, 400);
  };


  const goToGoals = () => {

    if (transitionState) return;

    setTransitionState({
      from: 'challenges',
      to: 'goals',
      direction: 'slide-left',
    });

    setTimeout(() => {

      setCurrentScreen('goals');

      setTransitionState(null);

    }, 400);
  };


  /*
   * =========================================================
   * GOALS
   * =========================================================
   */

  const goBackToChallenges = () => {

    if (transitionState) return;

    setTransitionState({
      from: 'goals',
      to: 'challenges',
      direction: 'slide-right',
    });

    setTimeout(() => {

      setCurrentScreen('challenges');

      setTransitionState(null);

    }, 400);
  };


  /*
   * =========================================================
   * FARMING PATH / ROADMAP
   * =========================================================
   */

  const goToRoadmap = () => {

    /*
     * Roadmap was opened from Goals.
     * Therefore its own Back button should return to Goals.
     */
    setRoadmapSource('goals');

    if (transitionState) return;

    setTransitionState({
      from: 'goals',
      to: 'roadmap',
      direction: 'slide-left',
    });

    setTimeout(() => {

      setCurrentScreen('roadmap');

      setTransitionState(null);

    }, 400);
  };


  /*
   * Roadmap's own Back button.
   *
   * This is DIFFERENT from feature Back.
   *
   * Roadmap opened from Goals:
   * Roadmap → Back → Goals
   *
   * Roadmap opened from Home:
   * Roadmap → Back → Home
   */
  const handleRoadmapBack = () => {

    if (roadmapSource === 'home') {

      goToHome();

      return;
    }

    if (transitionState) return;

    setTransitionState({
      from: 'roadmap',
      to: 'goals',
      direction: 'slide-right',
    });

    setTimeout(() => {

      setCurrentScreen('goals');

      setTransitionState(null);

    }, 400);
  };


  /*
   * =========================================================
   * HOME
   * =========================================================
   */

  const goToHome = () => {

    if (transitionState) return;

    setTransitionState({
      from: 'roadmap',
      to: 'home',
      direction: 'slide-left',
    });

    setTimeout(() => {

      setCurrentScreen('home');

      setTransitionState(null);

    }, 400);
  };


  const handleSkipGuidanceToHome = () => {

    setHasSkippedGuidance(true);

    goToHome();

  };


  /*
   * =========================================================
   * CAMERA / HEALTH CHECK FLOW
   * =========================================================
   */

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


  /*
   * =========================================================
   * HOME → FARMING PATH
   * =========================================================
   */

  const openFarmingPlanFromHome = () => {

    /*
     * Important:
     * When Farming Path is opened from Home,
     * its own Back button should return to Home.
     */
    setHasSkippedGuidance(false);

    setRoadmapSource('home');

    if (transitionState) return;

    setTransitionState({
      from: 'home',
      to: 'roadmap',
      direction: 'slide-left',
    });

    setTimeout(() => {

      setCurrentScreen('roadmap');

      setTransitionState(null);

    }, 400);
  };


  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <MobileFrame
      bottomBg={
        [
          'onboarding',
          'account-creation',
          'language',
          'livo-intro',
        ].includes(currentScreen)
          ? '#ffffff'
          : '#4a2508'
      }
      overlayStatusBar={
        [
          'onboarding',
          'camera-scan',
          'camera-confirm',
          'ai-chat',
        ].includes(currentScreen)
      }
    >

      <div className="app-screen-container">


        {/* =====================================================
            SPLASH
        ===================================================== */}

        {(currentScreen === 'splash' ||
          transitionState?.from === 'splash') && (

            <SplashScreen
              onSkip={goToLanguageFromSplash}
              isExiting={
                transitionState?.from === 'splash'
              }
            />

          )}


        {/* =====================================================
            LANGUAGE
        ===================================================== */}

        {(currentScreen === 'language' ||
          transitionState?.to === 'language' ||
          transitionState?.from === 'language') && (

            <div
              className={`screen-layer ${transitionState?.to === 'language' &&
                transitionState?.direction === 'fade'
                ? 'fade-enter'
                : transitionState?.from === 'language' &&
                  transitionState?.direction === 'slide-left'
                  ? 'slide-left-exit'
                  : transitionState?.to === 'language' &&
                    transitionState?.direction === 'slide-right'
                    ? 'slide-right-enter'
                    : ''
                }`}
            >

              {/* <LanguageScreen
              onContinue={goToLivoIntro}
              initialLanguage={language}
            /> */}
              <LanguageScreen
                onContinue={goToLivoIntro}
                onTestRoadmap={() => {
                  setRoadmapSource('home');
                  setCurrentScreen('roadmap');
                }}
              />

            </div>

          )}


        {/* =====================================================
            LIVO INTRO
        ===================================================== */}

        {(currentScreen === 'livo-intro' ||
          transitionState?.to === 'livo-intro' ||
          transitionState?.from === 'livo-intro') && (

            <div
              className={`screen-layer ${transitionState?.to === 'livo-intro' &&
                transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'livo-intro' &&
                  transitionState?.direction === 'slide-right'
                  ? 'slide-right-enter'
                  : transitionState?.from === 'livo-intro' &&
                    transitionState?.direction === 'slide-left'
                    ? 'slide-left-exit'
                    : transitionState?.from === 'livo-intro' &&
                      transitionState?.direction === 'slide-right'
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


        {/* =====================================================
            ACCOUNT CREATION
        ===================================================== */}

        {(currentScreen === 'account-creation' ||
          transitionState?.to === 'account-creation' ||
          transitionState?.from === 'account-creation') && (

            <div
              className={`screen-layer ${transitionState?.to === 'account-creation' &&
                transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'account-creation' &&
                  transitionState?.direction === 'slide-right'
                  ? 'slide-right-enter'
                  : transitionState?.from === 'account-creation' &&
                    transitionState?.direction === 'slide-left'
                    ? 'slide-left-exit'
                    : transitionState?.from === 'account-creation' &&
                      transitionState?.direction === 'slide-right'
                      ? 'slide-right-exit'
                      : ''
                }`}
            >

              <AccountCreationScreen
                key={`account-${accountStep}`}
                initialStep={accountStep}
                onComplete={goToChallengesFromAccount}
                onBackToIntro={goBackToLivoIntro}
                language={language}
              />

            </div>

          )}


        {/* =====================================================
            SUCCESS
        ===================================================== */}

        {(currentScreen === 'success' ||
          transitionState?.to === 'success' ||
          transitionState?.from === 'success') && (

            <div
              className={`screen-layer ${transitionState?.to === 'success' &&
                transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'success' &&
                  transitionState?.direction === 'slide-right'
                  ? 'slide-right-enter'
                  : transitionState?.from === 'success' &&
                    transitionState?.direction === 'slide-left'
                    ? 'slide-left-exit'
                    : transitionState?.from === 'success' &&
                      transitionState?.direction === 'slide-right'
                      ? 'slide-right-exit'
                      : ''
                }`}
            >

              <SuccessScreen
                onComplete={goToOnboardingFromSuccess}
                onBack={goBackToAccountFromSuccess}
                language={language}
              />

            </div>

          )}


        {/* =====================================================
            ONBOARDING
        ===================================================== */}

        {(currentScreen === 'onboarding' ||
          transitionState?.to === 'onboarding' ||
          transitionState?.from === 'onboarding') && (

            <div
              className={`screen-layer ${transitionState?.to === 'onboarding' &&
                transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'onboarding' &&
                  transitionState?.direction === 'slide-right'
                  ? 'slide-right-enter'
                  : transitionState?.from === 'onboarding' &&
                    transitionState?.direction === 'slide-left'
                    ? 'slide-left-exit'
                    : transitionState?.from === 'onboarding' &&
                      transitionState?.direction === 'slide-right'
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


        {/* =====================================================
            CHALLENGES
        ===================================================== */}

        {(currentScreen === 'challenges' ||
          transitionState?.to === 'challenges' ||
          transitionState?.from === 'challenges') && (

            <div
              className={`screen-layer ${transitionState?.to === 'challenges' &&
                transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'challenges' &&
                  transitionState?.direction === 'slide-right'
                  ? 'slide-right-enter'
                  : transitionState?.from === 'challenges' &&
                    transitionState?.direction === 'slide-left'
                    ? 'slide-left-exit'
                    : transitionState?.from === 'challenges' &&
                      transitionState?.direction === 'slide-right'
                      ? 'slide-right-exit'
                      : ''
                }`}
            >

              <ChallengesScreen
                onBack={goBackToAccountFromChallenges}
                onContinue={goToGoals}
                language={language}
              />

            </div>

          )}


        {/* =====================================================
            GOALS
        ===================================================== */}

        {(currentScreen === 'goals' ||
          transitionState?.to === 'goals' ||
          transitionState?.from === 'goals') && (

            <div
              className={`screen-layer ${transitionState?.to === 'goals' &&
                transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'goals' &&
                  transitionState?.direction === 'slide-right'
                  ? 'slide-right-enter'
                  : transitionState?.from === 'goals' &&
                    transitionState?.direction === 'slide-left'
                    ? 'slide-left-exit'
                    : transitionState?.from === 'goals' &&
                      transitionState?.direction === 'slide-right'
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


        {/* =====================================================
            FARMING PATH / ROADMAP
        ===================================================== */}

        {(currentScreen === 'roadmap' ||
          transitionState?.to === 'roadmap' ||
          transitionState?.from === 'roadmap') && (

            <div
              className={`screen-layer ${transitionState?.to === 'roadmap' &&
                transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'roadmap' &&
                  transitionState?.direction === 'slide-right'
                  ? 'slide-right-enter'
                  : transitionState?.from === 'roadmap' &&
                    transitionState?.direction === 'slide-left'
                    ? 'slide-left-exit'
                    : transitionState?.from === 'roadmap' &&
                      transitionState?.direction === 'slide-right'
                      ? 'slide-right-exit'
                      : ''
                }`}
            >

              <RoadmapScreen
                /*
                 * Roadmap's own Back:
                 * Goals or Home depending on source.
                 */
                onBack={handleRoadmapBack}

                /*
                 * Card 1:
                 * Plant Health Check
                 */
                onStartScan={goToCameraScan}

                /*
                 * Card 2:
                 * Farming Help
                 */
                onOpenAiChat={() => {
                  setCurrentScreen('ai-chat');
                }}

                /*
                 * Card 3:
                 * Add Field
                 *
                 * This opens the existing Add Field screen.
                 */
                onOpenAddField={handleOpenAddField}

                /*
                 * Footer:
                 * Later, Go to Home
                 */
                onGoHome={handleSkipGuidanceToHome}

                /*
                 * If Roadmap is opened from Home,
                 * skip the initial generation animation.
                 */
                skipGeneration={roadmapSource === 'home'}

                language={language}
              />

            </div>

          )}


        {/* =====================================================
            CAMERA SCAN
        ===================================================== */}

        {currentScreen === 'camera-scan' && (

          <div className="screen-layer">

            <CameraScanScreen
              onClose={() => {
                handleFeatureBackToRoadmap();
              }}
              onCapture={goToCameraConfirm}
            />

          </div>

        )}


        {/* =====================================================
            CAMERA CONFIRM
        ===================================================== */}

        {currentScreen === 'camera-confirm' && (

          <div className="screen-layer">

            <CameraConfirmScreen
              onRetake={goToCameraScan}
              onConfirm={goToScanResult}
            />

          </div>

        )}


        {/* =====================================================
            SCAN RESULT
        ===================================================== */}

        {currentScreen === 'scan-result' && (

          <div className="screen-layer">

            <ScanResultScreen
              onBack={handleFeatureBackToRoadmap}
              onViewTreatment={goToTreatmentPlan}
            />

          </div>

        )}


        {/* =====================================================
            TREATMENT PLAN
        ===================================================== */}

        {currentScreen === 'treatment-plan' && (

          <div className="screen-layer">

            <TreatmentPlanScreen
              onBack={goToScanResult}
              onDownload={goToHome}
              onShare={goToHome}
            />

          </div>

        )}


        {/* =====================================================
            AI CHAT
        ===================================================== */}

        {currentScreen === 'ai-chat' && (

          <div className="screen-layer">

            <AiChatScreen
              onBack={handleFeatureBackToRoadmap}
              language={language}
            />

          </div>

        )}


        {/* =====================================================
            ADD FIELD
        ===================================================== */}

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


        {/* =====================================================
            MAP PINPOINT
        ===================================================== */}

        {currentScreen === 'map-pinpoint' && (

          <div className="screen-layer">

            <MapPinpointScreen
              fieldData={fieldData}
              onBack={() => {
                setCurrentScreen('add-field');
              }}
              onConfirm={handleMapConfirm}
              language={language}
            />

          </div>

        )}

        {/* =====================================================
    FIELD SETUP DONE
    ===================================================== */}

        {currentScreen === 'field-setup-done' && (

          <div className="screen-layer">

            <FieldSetupDoneScreen
              fieldData={fieldData}
              onBack={handleFeatureBackToRoadmap}
              onContinue={handleFieldSetupDoneContinue}
              language={language}
            />

          </div>

        )}


        {/* =====================================================
            FIELD DETAILS
        ===================================================== */}

        {currentScreen === 'field-details' && (

          <div className="screen-layer">

            <FieldDetailsScreen
              fieldData={fieldData}
              onBack={handleFieldDetailsBack}
              language={language}
            />

          </div>

        )}


        {/* =====================================================
            SPRAYING CONDITIONS
        ===================================================== */}

        {currentScreen === 'spraying-conditions' && (

          <div className="screen-layer">

            <SprayingConditionsScreen
              onBack={handleFeatureBackToRoadmap}
              language={language}
            />

          </div>

        )}


        {/* =====================================================
            HOME
        ===================================================== */}

        {(currentScreen === 'home' ||
          transitionState?.to === 'home' ||
          transitionState?.from === 'home') && (

            <div
              className={`screen-layer ${transitionState?.to === 'home' &&
                transitionState?.direction === 'slide-left'
                ? 'slide-left-enter'
                : transitionState?.to === 'home' &&
                  transitionState?.direction === 'slide-right'
                  ? 'slide-right-enter'
                  : transitionState?.from === 'home' &&
                    transitionState?.direction === 'slide-left'
                    ? 'slide-left-exit'
                    : transitionState?.from === 'home' &&
                      transitionState?.direction === 'slide-right'
                      ? 'slide-right-exit'
                      : ''
                }`}
            >

              <HomeScreen
                hideAllCards={false}

                onActionClick={(action) => {

                  if (
                    action === 'health-check' ||
                    action === 'scan'
                  ) {
                    goToCameraScan();
                  }

                }}

                onOpenAiChat={() => {
                  setCurrentScreen('ai-chat');
                }}

                onOpenAddField={handleOpenAddField}

                onViewAllPlan={openFarmingPlanFromHome}

                language={language}

                showGuidanceCard={hasSkippedGuidance}
              />

            </div>

          )}

      </div>

    </MobileFrame>
  );
} 