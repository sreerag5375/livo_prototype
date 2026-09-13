import './FieldDetailsScreen.css';

export default function FieldDetailsScreen({
    fieldData,
    onBack,
    language = 'en',
}) {
    const isMl = language === 'ml';

    return (
        <div className="field-details-screen">

            {/* =====================================================
          TOP FIELD IMAGE
          The complete top field section is now a single image.
          No duplicate field name, location, crop, area, or farm
          information is rendered in HTML.
      ===================================================== */}

            <section className="field-details-top-image">
                <img
                    src="/assets/images/field_details_inner_page/top_map.png"
                    alt={isMl ? 'ഫീൽഡ് വിശദാംശങ്ങൾ' : 'Field details'}
                    className="field-details-top-img"
                    draggable="false"
                />

                {/* Functional back button over the image */}
                <button
                    type="button"
                    className="field-details-image-back-btn"
                    onClick={onBack}
                    aria-label="Back"
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#126f6b"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
            </section>


            {/* =====================================================
          SCROLLABLE DETAILS
      ===================================================== */}

            <main className="field-details-content">

                {/* =====================================================
            FIELD ALERTS
        ===================================================== */}

                <section className="field-details-section">
                    <div className="field-details-section-heading">
                        <h2>
                            {isMl ? 'ഫീൽഡ് അലേർട്ടുകൾ' : 'Field Alerts'}
                        </h2>

                        <button type="button">
                            {isMl ? 'എല്ലാം കാണുക' : 'See All'}
                        </button>
                    </div>

                    <div className="field-details-alert-card">

                        <div className="field-details-alert-row">
                            <div className="field-details-alert-icon heat">
                                ☀
                            </div>

                            <span className="field-details-alert-name">
                                {isMl
                                    ? 'ചൂട് സമ്മർദ്ദ സാധ്യത'
                                    : 'Heat Stress Risk'}
                            </span>

                            <span className="field-details-alert-date">
                                14 – Jan
                            </span>
                        </div>

                        <div className="field-details-alert-divider" />

                        <div className="field-details-alert-row">
                            <div className="field-details-alert-icon rain">
                                ☁
                            </div>

                            <span className="field-details-alert-name">
                                {isMl
                                    ? 'കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു'
                                    : 'Heavy rain expected'}
                            </span>

                            <span className="field-details-alert-date">
                                14 – Jan
                            </span>
                        </div>

                    </div>
                </section>


                {/* =====================================================
            WEATHER / FERTILIZER / ACTIVITY TABS
        ===================================================== */}

                <div className="field-details-tabs">

                    <button
                        className="active"
                        type="button"
                    >
                        <span>🌤️</span>
                        {isMl ? 'കാലാവസ്ഥ' : 'Weather'}
                    </button>

                    <button type="button">
                        <span>🌱</span>
                        {isMl ? 'വളം' : 'Fertilizer'}
                    </button>

                    <button type="button">
                        <span>🪴</span>
                        {isMl ? 'പ്രവർത്തനം' : 'Activity'}
                    </button>

                </div>


                {/* =====================================================
            SPRAYING + WEATHER
        ===================================================== */}

                <section className="field-details-insights-image-wrap">
                    <img
                        src="/assets/images/field_details_inner_page/spraying_and_weather.png"
                        alt={
                            isMl
                                ? 'സ്പ്രേയിംഗ്, കാലാവസ്ഥ വിവരങ്ങൾ'
                                : 'Spraying conditions and weather details'
                        }
                        className="field-details-insights-img"
                        draggable="false"
                    />
                </section>

                <div className="field-details-bottom-space" />

            </main>

        </div>
    );
}
