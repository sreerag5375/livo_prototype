import { useState, useEffect } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onSkip, isExiting }) {
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Prevent instant skip from button click-through on previous screen
    const timer = setTimeout(() => {
      setCanSkip(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (canSkip && onSkip) {
      onSkip();
    }
  };

  return (
    <div
      className={`splash-screen ${isExiting ? 'splash-screen-exiting' : ''}`}
      onClick={handleClick}
    >
      <div className="splash-logo-wrapper">
        <img
          src="/assets/brand/logo.png"
          alt="Livo Logo"
          className="splash-logo"
          draggable="false"
        />
      </div>
    </div>
  );
}
