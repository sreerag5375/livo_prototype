export default function HomeIndicator({ lightContent = true, style }) {
  return (
    <div className="home-indicator-container" style={style}>
      <div
        className="home-indicator-bar"
        style={{
          backgroundColor: lightContent
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(0, 0, 0, 0.35)',
        }}
      />
    </div>
  );
}

