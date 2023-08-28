import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, buttonText }) => {
  const inputAvatar = useRef();

  useEffect(() => {
    if (!isOpen) {
      inputAvatar.current.value = '';
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="avatar-form"
      buttonText={buttonText}
      onSubmit={handleSubmit}>
      <label className="popup-form__field">
        <input
          type="url"
          name="popup-input-link-avatar"
          id="popup-input-link-avatar"
          placeholder="Ссылка на картинку"
          className="popup-form__input"
          ref={inputAvatar}
          required
        />
        <span className="popup-form__input-error popup-input-link-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
