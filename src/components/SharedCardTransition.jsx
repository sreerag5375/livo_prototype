import { useState, useEffect } from 'react';
import './SharedCardTransition.css';

export default function SharedCardTransition({
  startRect,
  endRect,
  cardData,
  onComplete,
}) {
  // Stages: 'lift' (200ms) -> 'travel' (800ms) -> 'settle' (150ms)
  const [stage, setStage] = useState('lift');

  useEffect(() => {
    // 1. Lift stage runs for 200ms
    const tLift = setTimeout(() => {
      setStage('travel');
    }, 200);

    // 2. Travel stage runs for 800ms (200 + 800 = 1000ms)
    const tTravel = setTimeout(() => {
      setStage('settle');
    }, 1000);

    // 3. Settle stage runs for 150ms (1000 + 150 = 1150ms)
    const tSettle = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 1150);

    return () => {
      clearTimeout(tLift);
      clearTimeout(tTravel);
      clearTimeout(tSettle);
    };
  }, [onComplete]);

  // Compute current geometry based on stage
  const isLift = stage === 'lift';
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
      className={`shared-card-container stage-${stage}`}
      style={style}
    >
      <div className={`shared-card-inner stage-${stage}`}>
        {/* Step Badge - visible during lift, fades out during travel */}
        <div className={`shared-card-badge ${!isLift ? 'fade-out' : ''}`}>
          {cardData?.stepBadge || 'STEP 1 OF 4'}
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
