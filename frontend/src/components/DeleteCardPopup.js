import React from 'react';
import PopupWithForm from './PopupWithForm';

const DeleteCardPopup = ({ isOpen, onClose, cardId, onDeleteCard }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteCard(cardId);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Вы уверены?"
      name="delete-form"
      buttonText="Да"
    />
  );
};

export default DeleteCardPopup;
