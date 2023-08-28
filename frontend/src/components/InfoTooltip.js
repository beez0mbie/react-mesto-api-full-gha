import React from 'react';
import sucsess_svg from '../images/tooltip-sucsess.svg';
import fail_svg from '../images/tooltip-fail.svg';

export default function InfoTooltip({ isOpen, onClose, sucsess }) {
  const handleMouseDown = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  };
  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      id={`popup-sign`}
      onMouseDown={handleMouseDown}>
      <div className="popup__container">
        <button
          aria-label="Закрыть попап"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <div className="popup-info">
          {sucsess ? (
            <>
              <img
                className="popup-info__svg"
                alt="sucsess"
                src={sucsess_svg}></img>
              <h2 className="popup-info__title">Вы&nbsp;успешно зарегистрировались!</h2>
            </>
          ) : (
            <>
              <img
                className="popup-info__svg"
                alt="fail"
                src={fail_svg}></img>
              <h2 className="popup-info__title">
                Что-то&nbsp;пошло&nbsp;не&nbsp;так! Попробуйте&nbsp;ещё&nbsp;раз.
              </h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
