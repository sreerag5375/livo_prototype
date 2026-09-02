import { useState } from 'react';
import './MapPinpointScreen.css';

export default function MapPinpointScreen({ fieldData, onBack, onConfirm, language = 'en' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showGuidanceModal, setShowGuidanceModal] = useState(true);
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [locationName, setLocationName] = useState('Palakkad, Kerala');
  const [fieldArea, setFieldArea] = useState('1.5');
  const [isPinning, setIsPinning] = useState(false);

  const isMl = language === 'ml';
  const fieldName = fieldData?.fieldName || 'Paddy Field';

  // Helper to generate a 4-point polygon field area around center (cx, cy)
  const createFieldAreaPolygon = (cx, cy) => {
    return [
      { x: Math.max(10, cx - 12), y: Math.max(12, cy - 10) },
      { x: Math.min(90, cx + 14), y: Math.max(12, cy - 8) },
      { x: Math.min(90, cx + 16), y: Math.min(88, cy + 12) },
      { x: Math.max(10, cx - 10), y: Math.min(88, cy + 10) },
    ];
  };

  // Handle map click: generate complete 4-corner field area plot around tapped point
  const handleMapClick = (e) => {
    if (showGuidanceModal) {
      setShowGuidanceModal(false);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 100;
    const cy = ((e.clientY - rect.top) / rect.height) * 100;

    setIsPinning(true);
    setTimeout(() => setIsPinning(false), 350);

    const newPolygon = createFieldAreaPolygon(cx, cy);
    setPolygonPoints(newPolygon);
    setLocationName('Palakkad, Kerala');
  };

  // Clear marked field polygon area
  const handleClearPoints = (e) => {
    e.stopPropagation();
    setPolygonPoints([]);
  };

  const handleLocateMe = (e) => {
    e.stopPropagation();
    setShowGuidanceModal(false);
    const centerPolygon = createFieldAreaPolygon(50, 48);
    setPolygonPoints(centerPolygon);
    setLocationName('Palakkad, Kerala');
    setIsPinning(true);
    setTimeout(() => setIsPinning(false), 350);
  };

  const handleManualTriggerDetails = () => {
    if (polygonPoints.length === 0) {
      setPolygonPoints(createFieldAreaPolygon(50, 48));
    }
    setLocationName('Palakkad, Kerala');
    setShowDetailsSheet(true);
  };

  const handleSaveDetails = (e) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm({
        ...fieldData,
        locationName,
        fieldArea: `${fieldArea} acres`,
        polygonPoints,
      });
    }
  };

  // Convert polygonPoints array to SVG points string
  const svgPointsStr = polygonPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Calculate polygon centroid for centering "1.5 ac" area label
  const centerPos =
    polygonPoints.length > 0
      ? {
          x: polygonPoints.reduce((acc, p) => acc + p.x, 0) / polygonPoints.length,
          y: polygonPoints.reduce((acc, p) => acc + p.y, 0) / polygonPoints.length,
        }
      : null;

  return (
    <div className="map-screen">
      {/* Map Viewport Canvas */}
      <div className="map-viewport" onClick={handleMapClick}>
        <img
          src="/assets/images/add_field/map.png"
          alt="Satellite Map"
          className="map-bg-img"
          draggable="false"
        />

        {/* Drawn Field Polygon Area Overlay & Centered Acreage Text */}
        {polygonPoints.length >= 3 && (
          <>
            <svg className="map-polygon-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon
                points={svgPointsStr}
                fill="rgba(51, 65, 85, 0.65)"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeDasharray="4 2.5"
              />
            </svg>

            {/* Central Field Name Badge (e.g. "Banana Field") */}
            {centerPos && (
              <div
                className="map-center-field-badge"
                style={{ left: `${centerPos.x}%`, top: `${centerPos.y}%` }}
              >
                <span>{fieldName}</span>
              </div>
            )}
          </>
        )}

        {/* 4 Corner Pins on Map Polygon */}
        {polygonPoints.map((pt, idx) => (
          <div
            key={idx}
            className={`map-corner-pin ${isPinning ? 'pin-bounce' : ''}`}
            style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
          >

            {/* SVG Red Corner Pin Marker */}
            <div className="map-pin-svg-wrap">
              <svg width="34" height="42" viewBox="0 0 38 48" fill="none">
                <path
                  d="M19 0C8.50659 0 0 8.50659 0 19C0 33.25 19 48 19 48C19 48 38 33.25 38 19C38 8.50659 29.4934 0 19 0Z"
                  fill="#EF4444"
                />
                <circle cx="19" cy="19" r="8" fill="#FFFFFF" />
              </svg>
            </div>
          </div>
        ))}

        {/* Google Map Watermark */}
        <span className="map-watermark">Google</span>
      </div>

      {/* Top Floating Search Header */}
      <div className="map-top-bar">
        <button
          type="button"
          className="map-back-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="map-search-pill">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="map-search-icon"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="map-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isMl ? 'ഇവിടെ ലൊക്കേഷൻ തിരയുക' : 'Search Location here'}
          />
        </div>
      </div>

      {/* Floating Instruction Banner under Search Bar (Hidden when field area polygon exists!) */}
      {polygonPoints.length === 0 && !showGuidanceModal && !showDetailsSheet && (
        <div className="map-instruction-banner">
          <span className="map-instruction-icon">👆</span>
          <span>
            {isMl
              ? 'നിങ്ങളുടെ കൃഷിയിടം വരയ്ക്കാൻ മാപ്പിൽ ടാപ്പ് ചെയ്യുക.'
              : 'Tap on the map to start drawing your field.'}
          </span>
        </div>
      )}

      {/* Floating Action Buttons Column */}
      <div className="map-fab-column">
        {/* Undo / Reset Field Plot FAB Button (Shown when field area exists) */}
        {polygonPoints.length > 0 && (
          <button
            type="button"
            className="map-fab-btn map-fab-clear-btn"
            onClick={handleClearPoints}
            aria-label="Remove Field Mark"
            title="Remove field area"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        )}

        {/* Info FAB */}
        <button
          type="button"
          className="map-fab-btn"
          onClick={() => setShowGuidanceModal(true)}
          aria-label="Map Help"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00796B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>

        {/* Locate Me FAB */}
        <button
          type="button"
          className="map-fab-btn"
          onClick={handleLocateMe}
          aria-label="My Location"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00796B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
          </svg>
        </button>
      </div>

      {/* Bottom Confirm Location CTA Bar */}
      {!showGuidanceModal && !showDetailsSheet && (
        <div className="map-bottom-bar">
          <button
            type="button"
            className="map-confirm-btn"
            onClick={handleManualTriggerDetails}
          >
            {isMl ? 'ലൊക്കേഷൻ സ്ഥിരീകരിക്കുക' : 'Confirm Location'}
          </button>
        </div>
      )}

      {/* MODAL 1: "Draw Your Field area" Onboarding Guidance Modal Sheet */}
      {showGuidanceModal && (
        <div
          className="map-sheet-backdrop"
          onClick={() => setShowGuidanceModal(false)}
        >
          <div
            className="map-guidance-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="map-sheet-handle" />

            <div className="map-guidance-header">
              <h2 className="map-guidance-title">
                {isMl ? 'തോട്ടത്തിന്റെ വിസ്തൃതി വരയ്ക്കാം' : 'Draw Your Field area'}
              </h2>
              <button
                type="button"
                className="map-guidance-close-btn"
                onClick={() => setShowGuidanceModal(false)}
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="map-illustration-box">
              <div className="map-illu-map-bg">
                <svg width="100%" height="100%" viewBox="0 0 280 200">
                  <rect width="280" height="200" fill="#e0f2fe" />
                  <path d="M0,80 Q100,60 280,110" stroke="#bae6fd" strokeWidth="12" fill="none" />
                  <path d="M40,200 L240,0" stroke="#cbd5e1" strokeWidth="16" fill="none" />

                  <polygon
                    points="130,25 220,70 160,150 50,115"
                    fill="rgba(51, 65, 85, 0.55)"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />

                  <g transform="translate(130, 25)">
                    <path d="M0,0 C-6,-12 6,-12 0,-18" stroke="#ef4444" strokeWidth="2" />
                    <circle cx="0" cy="-14" r="8" fill="#ef4444" />
                    <circle cx="0" cy="-14" r="3" fill="#ffffff" />
                  </g>

                  <g transform="translate(220, 70)">
                    <circle cx="0" cy="-14" r="8" fill="#ef4444" />
                    <circle cx="0" cy="-14" r="3" fill="#ffffff" />
                  </g>

                  <g transform="translate(160, 150)">
                    <circle cx="0" cy="-14" r="8" fill="#ef4444" />
                    <circle cx="0" cy="-14" r="3" fill="#ffffff" />
                  </g>

                  <g transform="translate(50, 115)">
                    <circle cx="0" cy="-14" r="8" fill="#ef4444" />
                    <circle cx="0" cy="-14" r="3" fill="#ffffff" />
                    <circle cx="0" cy="-14" r="14" stroke="#f87171" strokeWidth="1.5" fill="none" opacity="0.8" />
                    <g transform="translate(-18, -4)">
                      <path
                        d="M12 24 C10 24 8 22 8 20 L8 8 C8 6.5 9 5 10.5 5 C12 5 13 6.5 13 8 L13 14 M13 10 C13 8.5 14 7.5 15.5 7.5 C17 7.5 18 8.5 18 10 L18 14 M18 11 C18 9.5 19 8.5 20.5 8.5 C22 8.5 23 9.5 23 11 L23 16 C23 21 19 24 14 24 Z"
                        fill="#fde68a"
                        stroke="#d97706"
                        strokeWidth="1.2"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <p className="map-guidance-desc">
              {isMl
                ? 'മാപ്പിൽ നിങ്ങളുടെ തോട്ടം കണ്ടെത്തുക, അതിർത്തി വരയ്ക്കാൻ കോണുകളിൽ ടാപ്പ് ചെയ്യുക.'
                : 'Locate your field on the map, then tap the corners to draw its boundary.'}
            </p>

            <button
              type="button"
              className="map-guidance-btn"
              onClick={() => setShowGuidanceModal(false)}
            >
              {isMl ? 'തുടരാം' : 'continue'}
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: "Your field details" Form Sheet */}
      {showDetailsSheet && (
        <div
          className="map-sheet-backdrop"
          onClick={() => setShowDetailsSheet(false)}
        >
          <form
            className="map-details-card"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSaveDetails}
          >
            <div className="map-sheet-handle" />

            <h2 className="map-details-title">
              {isMl ? 'തോട്ടത്തിന്റെ വിവരങ്ങൾ' : 'Your field details'}
            </h2>

            <div className="map-details-group">
              <label className="map-details-label">
                {isMl ? 'തോട്ടത്തിന്റെ വിസ്തൃതി' : 'Field area'}
              </label>
              <input
                type="text"
                className="map-details-input"
                value={fieldArea}
                onChange={(e) => setFieldArea(e.target.value)}
                placeholder={isMl ? 'വിസ്തൃതി നൽകുക (ഏക്കർ)' : 'Enter field area (acres)'}
              />
            </div>

            <div className="map-details-cta-wrap">
              <button type="submit" className="map-save-btn">
                {isMl ? 'സെറ്റപ്പ് പൂർത്തിയാക്കുക' : 'Finish setup'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
