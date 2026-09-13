import { useState } from 'react';
import './AddFieldScreen.css';

const CROPS_LIST = [
  {
    id: 'banana',
    nameEn: 'Banana',
    nameMl: 'വാഴ',
    image: '/assets/images/add_field/crops/banana.png',
  },
  {
    id: 'sun_flower',
    nameEn: 'Sunflower',
    nameMl: 'സൂര്യകാന്തി',
    image: '/assets/images/add_field/crops/sun_flower.png',
  },
  {
    id: 'chilly',
    nameEn: 'Chilli',
    nameMl: 'മുളക്',
    image: '/assets/images/add_field/crops/chilly.png',
  },
  {
    id: 'ginger',
    nameEn: 'Ginger',
    nameMl: 'ഇഞ്ചി',
    image: '/assets/images/add_field/crops/ginger.png',
  },
  {
    id: 'brinjal',
    nameEn: 'Brinjal',
    nameMl: 'വഴുതന',
    image: '/assets/images/add_field/crops/brinjal.png',
  },
  {
    id: 'paddy',
    nameEn: 'Paddy',
    nameMl: 'നെല്ല്',
    image: '/assets/images/add_field/crops/paddy.png',
  },
];

export default function AddFieldScreen({
  onBack,
  onComplete,
  targetFeature = 'weather',
  language = 'en',
}) {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [fieldName, setFieldName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingFieldName, setIsEditingFieldName] = useState(false);

  const isMl = language === 'ml';

  const filteredCrops = CROPS_LIST.filter((crop) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      crop.nameEn.toLowerCase().includes(query) ||
      crop.nameMl.toLowerCase().includes(query)
    );
  });

  const isValid =
    selectedCrop !== null &&
    fieldName.trim().length > 0;

  const handleSelectCrop = (crop) => {
    setSelectedCrop(crop);

    const defaultFieldName = isMl
      ? `${crop.nameMl} തോട്ടം`
      : `${crop.nameEn} Field`;

    setFieldName(defaultFieldName);

    // Start in non-editing mode.
    setIsEditingFieldName(false);
  };

  const handleEditFieldName = () => {
    setIsEditingFieldName(true);

    // Focus input after it becomes editable.
    setTimeout(() => {
      const input = document.querySelector(
        '.add-field-name-input'
      );

      if (input) {
        input.focus();
        input.select();
      }
    }, 0);
  };

  const handleSubmit = () => {
    if (!isValid || !onComplete) {
      return;
    }

    onComplete({
      fieldName: fieldName.trim(),
      crop: selectedCrop,
      targetFeature,
    });
  };

  return (
    <div className="add-field-screen">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="add-field-header">

        <button
          type="button"
          className="add-field-back-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00847C"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <h1 className="add-field-title">
          {isMl
            ? 'നിങ്ങൾ എന്താണ് കൃഷി ചെയ്യുന്നത്?'
            : 'What are you growing?'}
        </h1>

      </header>


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <main className="add-field-content">

        {/* =====================================================
            SEARCH
            ===================================================== */}

        <div className="add-field-search">

          <svg
            className="add-field-search-icon"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA5B2"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
            />

            <line
              x1="16.5"
              y1="16.5"
              x2="21"
              y2="21"
            />
          </svg>

          <input
            type="text"
            className="add-field-search-input"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder={
              isMl
                ? 'വിള തിരയുക...'
                : 'Search crop...'
            }
          />

          {searchQuery && (
            <button
              type="button"
              className="add-field-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>


        {/* =====================================================
            CROP GRID
            ===================================================== */}

        <div className="add-field-crops-grid">

          {filteredCrops.map((crop) => {

            const isSelected =
              selectedCrop?.id === crop.id;

            return (
              <button
                key={crop.id}
                type="button"
                className={`add-field-crop-item ${isSelected ? 'selected' : ''
                  }`}
                onClick={() =>
                  handleSelectCrop(crop)
                }
              >

                <div className="add-field-crop-circle">

                  <img
                    src={crop.image}
                    alt={
                      isMl
                        ? crop.nameMl
                        : crop.nameEn
                    }
                    className="add-field-crop-img"
                    draggable="false"
                  />

                  {isSelected && (
                    <span className="add-field-crop-check">

                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="5 12 10 17 19 7" />
                      </svg>

                    </span>
                  )}

                </div>

                <span className="add-field-crop-name">
                  {isMl
                    ? crop.nameMl
                    : crop.nameEn}
                </span>

              </button>
            );
          })}

        </div>


        {/* =====================================================
            NO SEARCH RESULTS
            ===================================================== */}

        {filteredCrops.length === 0 && (
          <div className="add-field-no-results">
            {isMl
              ? 'വിള കണ്ടെത്താനായില്ല'
              : 'No crops found'}
          </div>
        )}


        {/* =====================================================
            FIELD NAME
            ===================================================== */}

        {selectedCrop && (

          <section className="add-field-name-section">

            <label className="add-field-name-label">
              {isMl
                ? 'ഫീൽഡിന് ഒരു പേര് നൽകൂ'
                : 'Give your field a name'}
            </label>

            <div
              className={`add-field-name-box ${isEditingFieldName
                  ? 'is-editing'
                  : ''
                }`}
            >

              {/* Crop Icon */}

              <img
                src={selectedCrop.image}
                alt=""
                className="add-field-name-crop-img"
                draggable="false"
              />


              {/* Field Name */}

              <input
                type="text"
                className="add-field-name-input"
                value={fieldName}
                onChange={(e) =>
                  setFieldName(e.target.value)
                }
                readOnly={!isEditingFieldName}
                aria-label={
                  isMl
                    ? 'ഫീൽഡ് പേര്'
                    : 'Field name'
                }
              />


              {/* Edit Icon */}

              <button
                type="button"
                className="add-field-name-edit-btn"
                onClick={handleEditFieldName}
                aria-label={
                  isMl
                    ? 'ഫീൽഡ് പേര് തിരുത്തുക'
                    : 'Edit field name'
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                </svg>
              </button>

            </div>

          </section>

        )}

      </main>


      {/* =====================================================
          CONTINUE
          ===================================================== */}

      <footer className="add-field-cta-wrap">

        <button
          type="button"
          className="add-field-continue-btn"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          {isMl
            ? 'തുടരാം'
            : 'Continue'}
        </button>

      </footer>

    </div>
  );
}