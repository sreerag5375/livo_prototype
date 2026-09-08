import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import './FieldSuccessScreen.css';

export default function FieldSuccessScreen({ fieldData, onComplete, language = 'en' }) {
  const [checkmarkDone, setCheckmarkDone] = useState(false);
  const canvasRef = useRef(null);

  const isMl = language === 'ml';
  const fieldName = fieldData?.fieldName || (isMl ? 'നിങ്ങളുടെ തോട്ടം' : 'Your field');
  const titleText = isMl ? 'തോട്ടം വിജയകരമായി ചേർത്തു!' : 'Field added successfully!';
  const subtitleText = isMl
    ? `'${fieldName}' തയ്യാറാണ്. നമുക്ക് അതിലേക്ക് പോകാം.`
    : `'${fieldName}' is ready to go.`;

  useEffect(() => {
    let intervalId = null;

    const confettiTimer = setTimeout(() => {
      if (canvasRef.current) {
        const myConfetti = confetti.create(canvasRef.current, {
          resize: true,
          useWorker: true,
        });

        myConfetti({
          particleCount: 42,
          angle: 270,
          spread: 100,
          origin: { x: 0.5, y: -0.02 },
          startVelocity: 20,
          gravity: 0.9,
          ticks: 260,
          colors: ['#FFD54F', '#FFA000', '#00BCD4', '#4CAF50', '#00796B', '#FF7043'],
          scalar: 1.05,
        });

        const duration = 1600;
        const end = Date.now() + duration;

        intervalId = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(intervalId);
            return;
          }
          myConfetti({
            particleCount: 1,
            angle: 270,
            spread: 45,
            origin: { x: 0.12 + Math.random() * 0.76, y: -0.02 },
            startVelocity: 14 + Math.random() * 6,
            colors: ['#FFD54F', '#FFA000', '#00BCD4', '#4CAF50', '#00796B'],
            gravity: 0.9,
            ticks: 240,
            scalar: 1.0,
          });
        }, 140);
      }
    }, 50);

    const checkmarkTimer = setTimeout(() => {
      setCheckmarkDone(true);
    }, 280);

    const advanceTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2400);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(checkmarkTimer);
      clearTimeout(advanceTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [onComplete]);

  return (
    <div className="field-success-screen">
      <canvas ref={canvasRef} className="field-success-confetti-canvas" />

      <div className="field-success-content">
        <div className={`field-success-check-circle ${checkmarkDone ? 'burst' : ''}`}>
          <div className="field-success-check-glow" />
          <svg className="field-success-check-svg" viewBox="0 0 52 52" fill="none">
            <circle
              className="field-success-check-base"
              cx="26"
              cy="26"
              r="24"
              fill="url(#fieldSuccessGradient)"
            />
            <path
              className="field-success-check-path"
              d="M16 26.5L22.8 33.3L36.5 19.5"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="fieldSuccessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4CD9A8" />
                <stop offset="50%" stopColor="#00A67C" />
                <stop offset="100%" stopColor="#00796B" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className="field-success-title">{titleText}</h1>
        <p className="field-success-subtitle">{subtitleText}</p>
      </div>
    </div>
  );
}
