import React, { useState } from 'react';
import logo from '../images/Logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts';

const Header = ({ handleExit }) => {
  const curentUser = React.useContext(CurrentUserContext);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const location = useLocation();

  const actionHeader = location.pathname;

  const renderHeaderActions = () => {
    switch (actionHeader) {
      case '/sign-up':
        return (
          <Link
            className="header__action"
            to="/sign-in">
            Войти
          </Link>
        );
      case '/sign-in':
        return (
          <Link
            className="header__action"
            to="/sign-up">
            Регистрация
          </Link>
        );
      default:
        return (
          <>
            <p className="header__email">{curentUser.email}</p>
            <Link
              onClick={handleExit}
              className="header__action"
              to="/sign-in">
              Выйти
            </Link>
          </>
        );
    }
  };

  return (
    <header className="header">
      <div className="header__logo-container">
        <img
          src={logo}
          alt="Логотип 'Место'"
          className="header__logo"
        />
        <button
          onClick={() => setIsHamburgerActive((prevState) => !prevState)}
          className={`header__hamburger ${isHamburgerActive && 'header__hamburger_active'}`}
        />
      </div>
      <div
        className={`header__auth-container ${
          isHamburgerActive && 'header__auth-container_active'
        }`}>
        {renderHeaderActions()}
      </div>
    </header>
  );
};

export default Header;
