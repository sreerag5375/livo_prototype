import { useState, useRef, useEffect } from 'react';
import './FlowSwitcherPill.css';

export default function FlowSwitcherPill({
  activeFlow,
  onSelectFlow,
  onRestartFlow,
  onOpenSelector,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('pointerdown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="flow-switcher-pill-wrapper" ref={dropdownRef}>
      {/* Floating Pill Button */}
      <button
        type="button"
        className={`flow-switcher-pill ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Switch Onboarding Flow"
      >
        <span className="flow-switcher-dot" />
        <span className="flow-switcher-label">Flow {activeFlow}</span>
        <svg
          className={`flow-switcher-arrow ${isOpen ? 'rotated' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="flow-switcher-dropdown">
          <div className="flow-switcher-dropdown-header">
            <span>Onboarding Flows</span>
          </div>

          <button
            type="button"
            className={`flow-dropdown-item ${activeFlow === 1 ? 'active' : ''}`}
            onClick={() => {
              setIsOpen(false);
              onSelectFlow(1);
            }}
          >
            <div className="flow-dropdown-item-title">
              <span>Flow 1</span>
              {activeFlow === 1 && <span className="flow-active-check">✓</span>}
            </div>
            <span className="flow-dropdown-item-desc">First Card (Plant Health) Flight</span>
          </button>

          <button
            type="button"
            className={`flow-dropdown-item ${activeFlow === 2 ? 'active' : ''}`}
            onClick={() => {
              setIsOpen(false);
              onSelectFlow(2);
            }}
          >
            <div className="flow-dropdown-item-title">
              <span>Flow 2</span>
              {activeFlow === 2 && <span className="flow-active-check">✓</span>}
            </div>
            <span className="flow-dropdown-item-desc">Interactive Lock Reveal & CTAs</span>
          </button>

          <button
            type="button"
            className={`flow-dropdown-item ${activeFlow === 3 ? 'active' : ''}`}
            onClick={() => {
              setIsOpen(false);
              onSelectFlow(3);
            }}
          >
            <div className="flow-dropdown-item-title">
              <span>Flow 3</span>
              {activeFlow === 3 && <span className="flow-active-check">✓</span>}
            </div>
            <span className="flow-dropdown-item-desc">Game Quest & Fancy 3D Flight</span>
          </button>

          <div className="flow-dropdown-divider" />

          <button
            type="button"
            className="flow-dropdown-action-btn"
            onClick={() => {
              setIsOpen(false);
              if (onRestartFlow) onRestartFlow();
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span>Restart Current Flow</span>
          </button>

          <button
            type="button"
            className="flow-dropdown-action-btn"
            onClick={() => {
              setIsOpen(false);
              if (onOpenSelector) onOpenSelector();
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>All Flows Hub</span>
          </button>
        </div>
      )}
    </div>
  );
}
