import './SplashScreen.css';

export default function SplashScreen({ onSkip, isExiting }) {
  return (
    <div
      className={`splash-screen ${isExiting ? 'splash-screen-exiting' : ''}`}
      onClick={onSkip}
    >
      <div className="splash-logo-wrapper">
        <img
          src="/assets/brand/logo.png"
          alt="Livo Logo"
          className="splash-logo"
        />
      </div>
    </div>
  );
}


