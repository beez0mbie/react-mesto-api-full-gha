import React from 'react';
import { CurrentUserContext } from '../contexts';
import { hasMyLike } from '../utils';

const Card = ({ card, onCardClick, onCardLike, onCardTrashClick }) => {
  const userInfo = React.useContext(CurrentUserContext);

  const isMyCard = userInfo._id === card.owner;

  return (
    <div className="card">
      {isMyCard && (
        <button
          aria-label="Удалить"
          type="button"
          className="card__trash"
          onClick={() => onCardTrashClick(card)}></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={() => onCardClick(card)}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__heart-container">
          <button
            aria-label="Лайк"
            type="button"
            className={`card__heart ${hasMyLike(card, userInfo) && 'card__heart_active'}`}
            onClick={() => onCardLike(card)}></button>
          <p className="card__heart-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
