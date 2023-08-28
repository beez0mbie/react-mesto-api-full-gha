import React from 'react';

const PopupWithForm = ({ title, name, children, isOpen, onClose, buttonText, onSubmit }) => {
  const handleMouseDown = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  };
  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      id={`popup-${name}`}
      onMouseDown={handleMouseDown}>
      <div className="popup__container">
        <button
          aria-label="Закрыть попап"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <form
          name={name}
          className="popup-form"
          onSubmit={onSubmit}>
          <fieldset className="popup-form__fieldset">
            <h2 className="popup-form__title">{title}</h2>
            {children}
            <button
              type="submit"
              aria-label={buttonText}
              className="popup-form__button">
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
