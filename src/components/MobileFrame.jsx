import StatusBar from './StatusBar';
import HomeIndicator from './HomeIndicator';

export default function MobileFrame({
  children,
  lightContent = false,
  statusBarLight,
  homeIndicatorLight,
  showIsland = true,
  screenBg = '#FFFFFF',
  bottomBg,
  overlayStatusBar = false,
}) {
  const isStatusBarLight = statusBarLight ?? lightContent;
  const isHomeIndicatorLight = homeIndicatorLight ?? lightContent;
  const isLight = !isStatusBarLight || screenBg?.toLowerCase() === '#ffffff' || screenBg?.toLowerCase() === '#fff';

  return (
    <div
      className={`device-wrapper ${isLight ? 'light-theme' : ''} ${
        overlayStatusBar ? 'overlay-status-bar' : ''
      }`}
      style={{ backgroundColor: screenBg }}
    >
      {showIsland && (
        <div className="device-island">
          <div className="device-island-lens" />
        </div>
      )}
      <StatusBar lightContent={isStatusBarLight} />
      <main className="screen-content">
        {children}
      </main>
      <HomeIndicator
        lightContent={isHomeIndicatorLight}
        style={bottomBg ? { backgroundColor: bottomBg, transition: 'background-color 0.4s ease' } : undefined}
      />
    </div>
  );
}

