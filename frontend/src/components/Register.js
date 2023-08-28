import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as apiAuth from '../utils/ApiAuth';
import { useForm } from '../hooks/useForm';

export default function Register({ handleInfoPopup }) {
  const navigate = useNavigate();
  const { formValues, handleChangeForm } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    apiAuth
      .register(formValues.password, formValues.email)
      .then((res) => {
        handleInfoPopup(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        handleInfoPopup(false);
        console.error(err);
      });
  };

  return (
    <div className="sign">
      <h1 className="sign__title">Регистрация</h1>
      <form
        onSubmit={handleSubmit}
        id="register-form"
        className="sign__form">
        <label
          htmlFor="email"
          className="sign__field"></label>
        <input
          required
          placeholder="Email"
          id="email"
          name="email"
          className="sign__input"
          type="text"
          value={formValues.email}
          onChange={handleChangeForm}
        />
        <label
          htmlFor="password"
          className="sign__field"></label>
        <input
          required
          placeholder="Пароль"
          id="password"
          name="password"
          className="sign__input"
          type="password"
          value={formValues.password}
          onChange={handleChangeForm}
        />
        <button
          type="submit"
          className="sign__button">
          Зарегистрироваться
        </button>
      </form>
      <div className="sign__signin">
        <p className="sign__signin-desc">Уже зарегистрированы?</p>
        <Link
          to="/sign-in"
          className="sign__signin-link">
          Войти
        </Link>
      </div>
    </div>
  );
}
