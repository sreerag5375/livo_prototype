export default function StatusBar({ time = '9:41', lightContent = true }) {
  const iconColor = lightContent ? '#FFFFFF' : '#0F172A';

  return (
    <div className="status-bar" style={{ color: iconColor }}>
      <span className="status-time">{time}</span>

      <div className="status-icons">
        {/* Cellular bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={iconColor}>
          <rect x="0" y="9" width="3" height="3" rx="0.75" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.75" />
          <rect x="9" y="3" width="3" height="9" rx="0.75" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.75" />
        </svg>

        {/* Wi-Fi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round">
          <path d="M1.5 3.5C5.5 -0.5 10.5 -0.5 14.5 3.5" />
          <path d="M3.8 6.5C6.2 4.2 9.8 4.2 12.2 6.5" />
          <circle cx="8" cy="10" r="1" fill={iconColor} stroke="none" />
        </svg>

        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.8" y="0.8" width="20.4" height="10.4" rx="3.2" stroke={iconColor} strokeWidth="1.2" />
          <rect x="2.5" y="2.5" width="14" height="7" rx="1.8" fill={iconColor} />
          <path d="M22.8 4C23.5 4.3 24 5 24 6C24 7 23.5 7.7 22.8 8" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
