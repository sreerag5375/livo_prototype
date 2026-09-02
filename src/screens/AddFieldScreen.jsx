import { useState } from 'react';
import './AddFieldScreen.css';

const CROPS_LIST = [
  { id: 'paddy', nameEn: 'Paddy', nameMl: 'നെല്ല്', image: '/assets/images/add_field/crops/paddy.png' },
  { id: 'banana', nameEn: 'Banana', nameMl: 'വാഴ', image: '/assets/images/add_field/crops/banana.png' },
  { id: 'sun_flower', nameEn: 'Sunflower', nameMl: 'സൂര്യകാന്തി', image: '/assets/images/add_field/crops/sun_flower.png' },
  { id: 'chilly', nameEn: 'Chilli', nameMl: 'മുളക്', image: '/assets/images/add_field/crops/chilly.png' },
  { id: 'ginger', nameEn: 'Ginger', nameMl: 'ഇഞ്ചി', image: '/assets/images/add_field/crops/ginger.png' },
  { id: 'brinjal', nameEn: 'Brinjal', nameMl: 'വഴുതന', image: '/assets/images/add_field/crops/brinjal.png' },
];

export default function AddFieldScreen({ onBack, onComplete, targetFeature = 'weather', language = 'en' }) {
  const [fieldName, setFieldName] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showCropSheet, setShowCropSheet] = useState(false);

  const isMl = language === 'ml';
  const isValid = fieldName.trim().length > 0 && selectedCrop !== null;

  const handleSelectCrop = (crop) => {
    setSelectedCrop(crop);
    setShowCropSheet(false);

    // Autofill field name with crop name + Field (e.g. "Paddy Field")
    const defaultAutoName = isMl ? `${crop.nameMl} തോട്ടം` : `${crop.nameEn} Field`;
    setFieldName(defaultAutoName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && onComplete) {
      onComplete({
        fieldName: fieldName.trim(),
        crop: selectedCrop,
        targetFeature,
      });
    }
  };

  return (
    <div className="add-field-screen">
      {/* Top Header Bar with Back Arrow */}
      <header className="add-field-header">
        <button
          type="button"
          className="add-field-back-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00796B"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </header>

      {/* Top Hero Banner with Speech Bubble */}
      <div className="add-field-hero-wrap">
        <img
          src="/assets/images/add_field/add_field_top_image.png"
          alt="Livo Farmer in Field"
          className="add-field-hero-img"
        />

        {/* Speech Bubble Overlay */}
        <div className="add-field-speech-bubble">
          <p className="add-field-speech-text">
            {isMl
              ? 'നിങ്ങളുടെ തോട്ടത്തെക്കുറിച്ച് എനിക്കറിയണം. 🌱'
              : "I'd love to know about your field. 🌱"}
          </p>
          <div className="add-field-speech-arrow" />
        </div>
      </div>

      {/* Form Area */}
      <form className="add-field-form" onSubmit={handleSubmit}>
        {/* 1st Field: Crop Select Input Dropdown */}
        <div className="add-field-form-group">
          <label className="add-field-label">
            {isMl ? 'നിങ്ങൾ എന്താണ് കൃഷി ചെയ്യുന്നത്?' : 'What are you growing'}
          </label>
          <button
            type="button"
            className={`add-field-select-btn ${selectedCrop ? 'selected' : ''}`}
            onClick={() => setShowCropSheet(true)}
          >
            {selectedCrop ? (
              <div className="add-field-selected-crop-val">
                <img
                  src={selectedCrop.image}
                  alt={selectedCrop.nameEn}
                  className="add-field-selected-icon"
                />
                <span>{isMl ? selectedCrop.nameMl : selectedCrop.nameEn}</span>
              </div>
            ) : (
              <span className="add-field-placeholder">
                {isMl ? 'വിള തിരഞ്ഞെടുക്കുക' : 'Select the crop'}
              </span>
            )}

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="add-field-dropdown-icon"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* 2nd Field: Field Name Input (Autofilled on Crop select) */}
        <div className="add-field-form-group">
          <label className="add-field-label">
            {isMl ? 'തോട്ടത്തിന്റെ പേര് എന്താണ്?' : 'What do you call this field'}
          </label>
          <input
            type="text"
            className="add-field-input"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            placeholder={isMl ? 'നിങ്ങളുടെ തോട്ടത്തിന്റെ പേര്' : 'Your field name'}
          />
        </div>

        {/* Continue CTA Button */}
        <div className="add-field-cta-wrap">
          <button
            type="submit"
            className="add-field-continue-btn"
            disabled={!isValid}
          >
            {isMl ? 'തുടരാം' : 'Continue'}
          </button>
        </div>
      </form>

      {/* Select Crop Bottom Sheet Modal */}
      {showCropSheet && (
        <div className="add-field-sheet-backdrop" onClick={() => setShowCropSheet(false)}>
          <div
            className="add-field-sheet-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="add-field-sheet-handle" />

            <h2 className="add-field-sheet-title">
              {isMl ? 'വിള തിരഞ്ഞെടുക്കുക' : 'Select Your Crop'}
            </h2>

            {/* Crops Grid */}
            <div className="add-field-crops-grid">
              {CROPS_LIST.map((crop) => {
                const isSelected = selectedCrop?.id === crop.id;
                return (
                  <button
                    key={crop.id}
                    type="button"
                    className={`add-field-crop-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectCrop(crop)}
                  >
                    <div className="add-field-crop-circle">
                      <img
                        src={crop.image}
                        alt={crop.nameEn}
                        className="add-field-crop-img"
                        draggable="false"
                      />
                    </div>
                    <span className="add-field-crop-name">
                      {isMl ? crop.nameMl : crop.nameEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
