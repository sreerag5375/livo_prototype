import { useState, useEffect } from 'react';
import './RowCardsTransition.css';

export default function RowCardsTransition({
  startTop = 460,
  endTop = 396,
  cards = [],
  onComplete,
}) {
  // isMoving triggers the CSS transition for top
  const [isMoving, setIsMoving] = useState(false);
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    // Start upward glide after initial render tick (50ms)
    const tGlide = setTimeout(() => {
      setIsMoving(true);
    }, 50);

    // Settle after glide finishes (50 + 750 = 800ms)
    const tSettle = setTimeout(() => {
      setIsSettled(true);
    }, 800);

    // Complete handoff to Home at 950ms
    const tComplete = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 950);

    return () => {
      clearTimeout(tGlide);
      clearTimeout(tSettle);
      clearTimeout(tComplete);
    };
  }, [onComplete]);

  const currentTop = isMoving ? endTop : startTop;

  return (
    <div className={`row-transition-layer ${isMoving ? 'is-moving' : 'is-start'} ${isSettled ? 'is-settled' : ''}`}>
      {/* Dark backdrop veil that fades out smoothly as the row moves up, revealing Home (Image 3) */}
      <div className={`row-transition-backdrop ${isMoving ? 'fade-out' : ''}`} />

      {/* The entire horizontal row of cards gliding UPWARD */}
      <div
        className="row-transition-carousel"
        style={{ top: `${currentTop}px` }}
      >
        <div className="row-transition-inner">
          {cards.map((card, idx) => (
            <div
              key={card.id || idx}
              className={`row-transition-card ${idx === 0 ? 'is-first-card' : ''}`}
            >
              {/* Stylized Step Number at top-right (slides up & fades out) */}
              <span className={`row-transition-step-num ${isMoving ? 'fade-out' : ''}`}>
                {idx + 1}
              </span>

              {/* Artwork Image */}
              <img
                src={card.image}
                alt={card.title}
                className="row-transition-card-img"
                draggable="false"
              />

              {/* Title & Desc overlay at bottom */}
              <div className="row-transition-card-overlay">
                <h3 className="row-transition-card-title">{card.title}</h3>
                {idx === 0 && card.description && (
                  <p className={`row-transition-card-desc ${isMoving ? 'fade-out' : ''}`}>
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
