import { useState, useEffect } from 'react';
import './SharedCardTransition.css';

export default function SharedCardTransition({
  startRect,
  endRect,
  cardData,
  onComplete,
  isGameVariant = false,
}) {
  // Stages: 'lift' -> 'travel' -> 'settle'
  const [stage, setStage] = useState('lift');

  const liftDuration = isGameVariant ? 260 : 200;
  const travelDuration = isGameVariant ? 840 : 800;
  const settleDuration = isGameVariant ? 220 : 150;

  useEffect(() => {
    // 1. Lift stage
    const tLift = setTimeout(() => {
      setStage('travel');
    }, liftDuration);

    // 2. Travel stage
    const tTravel = setTimeout(() => {
      setStage('settle');
    }, liftDuration + travelDuration);

    // 3. Settle stage
    const tSettle = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, liftDuration + travelDuration + settleDuration);

    return () => {
      clearTimeout(tLift);
      clearTimeout(tTravel);
      clearTimeout(tSettle);
    };
  }, [onComplete, liftDuration, travelDuration, settleDuration]);

  // Compute current geometry based on stage
  const isLift = stage === 'lift';
  const isTravel = stage === 'travel';
  const isSettle = stage === 'settle';

  const currentRect = isLift ? startRect : endRect;

  const style = {
    top: `${currentRect.top}px`,
    left: `${currentRect.left}px`,
    width: `${currentRect.width}px`,
    height: `${currentRect.height}px`,
  };

  return (
    <div
      className={`shared-card-container stage-${stage} ${
        isGameVariant ? 'is-game-variant' : ''
      }`}
      style={style}
    >
      {/* Game Variant Special Effects */}
      {isGameVariant && isLift && (
        <>
          <div className="game-energy-ring ring-1" />
          <div className="game-energy-ring ring-2" />
        </>
      )}

      {isGameVariant && isTravel && (
        <>
          <div className="game-holo-sweep" />
          <div className="game-sparkle-trail">
            <span className="sparkle s1">✦</span>
            <span className="sparkle s2">★</span>
            <span className="sparkle s3">✦</span>
          </div>
        </>
      )}

      {isGameVariant && isSettle && (
        <>
          <div className="game-impact-shockwave" />
          <div className="game-impact-flash" />
        </>
      )}

      <div className={`shared-card-inner stage-${stage} ${isGameVariant ? 'is-game-inner' : ''}`}>
        {/* Step / Quest Badge */}
        <div className={`shared-card-badge ${!isLift ? 'fade-out' : ''} ${isGameVariant ? 'game-badge' : ''}`}>
          {isGameVariant
            ? '★ QUEST 1 READY ★'
            : cardData?.stepBadge || 'STEP 1 OF 4'}
        </div>

        {/* Artwork Image */}
        <img
          src={cardData?.image || '/assets/images/onboarding/roadmap/1.png'}
          alt={cardData?.title || 'Plant Health Check'}
          className="shared-card-img"
          draggable="false"
        />

        {/* Title overlay settles smoothly into Home card overlay */}
        <div className={`shared-card-overlay ${isSettle ? 'visible' : ''}`}>
          <h3 className="shared-card-title">{cardData?.title || 'Plant Health Check'}</h3>
        </div>
      </div>
    </div>
  );
}
