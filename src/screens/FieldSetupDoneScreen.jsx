import './FieldSetupDoneScreen.css';

export default function FieldSetupDoneScreen({
    fieldData,
    onBack,
    onContinue,
    language = 'en',
}) {
    const isMl = language === 'ml';

    return (
        <div className="field-setup-done-screen">

            {/* =====================================================
          HEADER
          ===================================================== */}

            <header className="field-setup-done-header">

                <button
                    type="button"
                    className="field-setup-done-back-btn"
                    onClick={onBack}
                    aria-label="Back"
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00847C"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <h1 className="field-setup-done-title">
                    {isMl ? (
                        <>
                            നിങ്ങളുടെ ഫീൽഡ്
                            <br />
                            തയ്യാറായി
                        </>
                    ) : (
                        <>
                            Paddy Field Setup
                            <br />
                            Done
                        </>
                    )}
                </h1>

            </header>


            {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

            <main className="field-setup-done-content">

                <div className="field-setup-card-wrap">
                    <img
                        src="/assets/images/onboarding/field_card.png"
                        alt="Field details"
                        className="field-setup-card-img"
                        draggable="false"
                    />
                </div>


                {/* =====================================================
            CONTINUE BUTTON
            ===================================================== */}

                <button
                    type="button"
                    className="field-setup-done-continue-btn"
                    onClick={onContinue}
                >
                    {isMl
                        ? 'ഫീൽഡ് വിശദാംശങ്ങൾ കാണുക'
                        : 'See Full Field Details'}

                    <span className="field-setup-done-arrow">
                        ↗
                    </span>
                </button>

            </main>


            {/* =====================================================
          BOTTOM PADDY IMAGE
          ===================================================== */}

            <div className="field-setup-paddy-bg">

                <img
                    src="/assets/images/onboarding/field_paddy.png"
                    alt=""
                    className="field-setup-paddy-img"
                    draggable="false"
                />

            </div>

        </div>
    );
}