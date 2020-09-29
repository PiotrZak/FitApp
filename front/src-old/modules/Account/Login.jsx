import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FormInput } from 'common/FormInput';
import { Button } from 'common/buttons/Index';
import { useDispatch } from 'react-redux';
import { userService } from 'services/userServices';
import { validationUtil } from 'utils/validation.util';
import { alertActions } from 'redux/actions/alert.actions';

import { Icon } from 'common/Icon';
import { motivationalQuotesEnglish } from 'utils/motivationalQuotes';

import loginPhoto from 'assets/img/login.jpg';

export const LoginPage = () => {
  const loginError = 'Try again! those credentials are invalid';

  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const requiredFields = ['email', 'password'];
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name } = e.target;
    userData[name] = e.target.value;
    setUserData(userData);
    validationUtil.runSetErrors(name, setErrors, errors, requiredFields, userData);
  };

  const submitForm = () => {
    const confirm = validationUtil.runValidateOnSubmit(setErrors, errors, requiredFields, userData);
    confirm && authenticateUser(userData);
  };

  const authenticateUser = (userData) => {
    userService
      .login(userData)
      .then((data) => {
        console.log(data);
        dispatch(alertActions.success('Congratulations! You are log in.'));
        localStorage.setItem('user', JSON.stringify(data));
        if (data.role === 'Trainer') {
          history.push('/users');
        } else if (data.role === 'Organization') {
          history.push('/users');
        } else if (data.role === 'User') {
          history.push(`/user/${data.userId}`);
        }
      })
      .catch((error) => {
        dispatch(alertActions.error(loginError));
      });
  };

  const renderRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotesEnglish.length);
    return motivationalQuotesEnglish[randomIndex];
  };

  return (
    <div className="container-login">
      <div className="container-login__image">
        <img src={loginPhoto} alt="Logo" />
        ;
      </div>
      <div className="container-login__content">
        <h3>{renderRandomQuote()}</h3>
        <FormInput id="email" name="email" onChange={handleInput} label="Email" hasError={errors.email} />
        <FormInput id="password" name="password" type="password" onChange={handleInput} label="Password" hasError={errors.password} />
        <Button className="btn btn--primary btn--lg" onClick={submitForm} name="Login" />
        <NavLink
          to="/forgotpassword"
          activeClassName="active"
        >
          <div className="navigation__menu__icon">
            <Icon name="forget" fill="white" />
            Forget password?
          </div>
        </NavLink>
      </div>
    </div>
  );
};
