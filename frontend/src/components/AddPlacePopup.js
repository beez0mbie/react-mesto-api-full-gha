import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, buttonText }) => {
  const { formValues, setFormValues, handleChangeForm } = useForm({
    place: '',
    link: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setFormValues({
        place: '',
        link: '',
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: formValues.place,
      link: formValues.link,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое Место"
      name="card-form"
      buttonText={buttonText}
      onSubmit={handleSubmit}>
      <label className="popup-form__field">
        <input
          type="text"
          name="place"
          id="place"
          placeholder="Название"
          className="popup-form__input"
          minLength="2"
          maxLength="30"
          value={formValues.place}
          onChange={handleChangeForm}
          required
        />
        <span className="popup-form__input-error popup-input-place-error"></span>
      </label>
      <label className="popup-form__field">
        <input
          type="url"
          name="link"
          id="link"
          placeholder="Ссылка на картинку"
          className="popup-form__input"
          value={formValues.link}
          onChange={handleChangeForm}
          required
        />
        <span className="popup-form__input-error popup-input-link-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
