import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { NonExistPage } from './404';
import InfoTooltip from './InfoTooltip';
import DeleteCardPopup from './DeleteCardPopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils';
import * as apiAuth from '../utils/ApiAuth';
import { CurrentUserContext, CardsContext } from '../contexts';
import { hasMyLike } from '../utils';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isSucsess, setIsSucsess] = useState(false);
  const [cardIdToDelete, setCardIdToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
    cohort: '',
    email: '',
    _id: '',
  });
  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const isPopupOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isDeletePopupOpen ||
    isInfoPopupOpen ||
    isImagePopupOpen;

  useEffect(() => {
    if (isLoggedIn) {
      handleGetAppInfo();
    } else {
      handleTokenCheck();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClosePopupByEsc = (event) => {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    };
    if (isPopupOpen) {
      document.addEventListener('keydown', handleClosePopupByEsc);
    }
    return () => document.removeEventListener('keydown', handleClosePopupByEsc);
  }, [isPopupOpen]);

  const handleTokenCheck = () => {
    apiAuth
      .checkToken()
      .then((res) => {
        if (res) {
          const email = res.email;
          setCurrentUser((prevState) => ({
            ...prevState,
            email,
          }));
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => console.error(`Error apiAuth.checkToken():\n ${err}`));
  };

  const handleGetAppInfo = () => {
    api
      .getAppInfo()
      .then((res) => {
        const [userInfo, cards] = res;
        setCurrentUser((prevState) => ({
          ...prevState,
          ...userInfo,
        }));
        setCards(cards.reverse());
      })
      .catch((err) => console.error(`Error api.getAppInfo():\n ${err}`));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleExit = () => {
    apiAuth.logout();
    setIsLoggedIn(false);
  };

  const handleSetEmail = (email) => {
    setCurrentUser((prevState) => ({
      ...prevState,
      email,
    }));
  };

  const handleInfoPopup = (isSucsess) => {
    setIsSucsess(isSucsess);
    setIsInfoPopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleCardTrashClick = (card) => {
    setIsDeletePopupOpen(true);
    setCardIdToDelete(card._id);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setCardIdToDelete(null);
  };

  const handleCardLike = (card) => {
    const isLiked = hasMyLike(card, currentUser);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // проходимся по текущему стейту карточек находим карточку с нужным айди и возвращаем массив с замененной карточкой newCard
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.error(`Error api.changeLikeCardStatus():\n ${err}`));
  };

  const handleDeleteCard = (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.error(`Error api.deleteCard():\n ${err}`));
  };

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(() => closeAllPopups())
      .catch((error) => console.error(`Error in next request:${request}\n${error}`))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlace = (card) => {
    handleSubmit(() =>
      api.addCard(card.name, card.link).then((newCard) => {
        setCards([newCard, ...cards]);
      }),
    );
  };

  const handleUpdateAvatar = (currentUser) => {
    handleSubmit(() =>
      api.updateAvatar(currentUser.avatar).then((user) => {
        setCurrentUser((prevState) => ({ ...prevState, ...user }));
      }),
    );
  };

  const handleUpdateUser = (currentUser) => {
    handleSubmit(() =>
      api.updateUserInfo(currentUser.name, currentUser.about).then((user) => {
        setCurrentUser((prevState) => ({
          ...prevState,
          ...user,
        }));
      }),
    );
  };

  return (
    <CardsContext.Provider value={cards}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header handleExit={handleExit} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardTrashClick={handleCardTrashClick}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="sign-in"
              element={
                <Login
                  handleLogin={handleLogin}
                  handleInfoPopup={handleInfoPopup}
                  handleSetEmail={handleSetEmail}
                />
              }
            />
            <Route
              path="sign-up"
              element={<Register handleInfoPopup={handleInfoPopup} />}
            />
            <Route
              path="*"
              element={
                <ProtectedRoute
                  element={NonExistPage}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
          <Footer />
          <InfoTooltip
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
            sucsess={isSucsess}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}></EditAvatarPopup>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}></EditProfilePopup>
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            buttonText={isLoading ? 'Сохранение...' : 'Создать'}></AddPlacePopup>
          <DeleteCardPopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            cardId={cardIdToDelete}
            onDeleteCard={handleDeleteCard}
          />
          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </CardsContext.Provider>
  );
}

export default App;
