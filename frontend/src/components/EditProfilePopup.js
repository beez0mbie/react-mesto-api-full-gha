import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts';
import { useForm } from '../hooks/useForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, buttonText }) => {
  const currentUser = useContext(CurrentUserContext);
  const { formValues, setFormValues, handleChangeForm } = useForm({ name: '', description: '' });

  useEffect(() => {
    setFormValues({
      name: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: formValues.name,
      about: formValues.description,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="profile-form"
      buttonText={buttonText}>
      <label className="popup-form__field">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Введите имя профиля"
          className="popup-form__input"
          required
          minLength="2"
          maxLength="40"
          value={formValues.name}
          onChange={handleChangeForm}
        />
        <span className="popup-form__input-error popup-input-name-error"></span>
      </label>
      <label className="popup-form__field">
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Введите название работы"
          className="popup-form__input"
          required
          minLength="2"
          maxLength="200"
          value={formValues.description}
          onChange={handleChangeForm}
        />
        <span className="popup-form__input-error popup-input-job-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
