import './FlowSelectScreen.css';

export default function FlowSelectScreen({ onSelectFlow }) {
  return (
    <div className="flow-select-screen">
      <div className="flow-select-container">
        <h1 className="flow-select-title">Choose the onboarding flow</h1>

        <div className="flow-select-buttons">
          <button
            type="button"
            className="flow-select-primary-btn"
            onClick={() => onSelectFlow(1)}
          >
            Onboarding 1
          </button>

          <button
            type="button"
            className="flow-select-primary-btn"
            onClick={() => onSelectFlow(2)}
          >
            Onboarding 2
          </button>

          <button
            type="button"
            className="flow-select-primary-btn"
            onClick={() => onSelectFlow(3)}
          >
            Onboarding 3
          </button>
        </div>
      </div>
    </div>
  );
}
