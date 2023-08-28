import React from 'react';
import * as apiAuth from '../utils/ApiAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

export default function Login({ handleLogin, handleInfoPopup, handleSetEmail }) {
  const navigate = useNavigate();
  const { formValues, handleChangeForm } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    apiAuth
      .authorize(formValues.email, formValues.password)
      .then((data) => {
        if (data) {
          handleLogin();
          handleSetEmail(formValues.email);
          navigate('/', { replace: true });
        }
      })
      .catch(() => handleInfoPopup(false));
  };

  return (
    <div className="sign">
      <h1 className="sign__title">Вход</h1>
      <form
        onSubmit={handleSubmit}
        id="login-form"
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
          Войти
        </button>
      </form>
    </div>
  );
}
