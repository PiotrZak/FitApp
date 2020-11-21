import React, { useState } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { mainTheme } from 'theme/mainTheme';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';

import MainTemplate from 'templates/MainTemplate';
import { routes } from 'utils/routes';
import LoginPage from 'modules/Auth/LoginPage';
import ForgotPasswordPage from 'modules/Auth/ForgotPasswordPage';
import ResetPasswordPage from 'modules/Auth/ResetPasswordPage';
import ActivateAccountPage from 'modules/Auth/ActivateAccountPage';
import ConfirmationPage from 'modules/Auth/ConfirmationPage';
import Categories from 'modules/Exercises/Categories';
import Category from 'modules/Exercises/Category/Category';

import OrganizationUsers from 'modules/Users/OrganizationUsers';
import { PrivateRoute, Role } from '../utils/PrivateRoute';
import { ThemeContext } from 'support/context/ThemeContext';
import { LanguageContext } from 'support/context/LanguageContext';
import { userContext } from 'support/context/UserContext';

import MenuTemplate from 'templates/MenuTemplate';
import AddExerciseRefactor from 'modules/Exercises/Exercises/AddExerciseRefactor';

export const history = createBrowserHistory();

const Root = () => {
  const [theme] = useState(mainTheme);
  const [user] = useState(JSON.parse((localStorage.getItem('user'))));
  const [selectedLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ lang: selectedLanguage }}>
      <ThemeContext.Provider value={{ theme }}>
        <ThemeProvider theme={theme}>
          <userContext.Provider value={{ user }}>
            <BrowserRouter history={history}>
              <MainTemplate>
                <Switch>
                  <Route path={routes.login} component={LoginPage} />
                  <Route path={routes.forgotPassword} component={ForgotPasswordPage} />
                  <Route path={routes.resetPassword} component={ResetPasswordPage} />
                  <Route path={routes.activate} component={ActivateAccountPage} />
                  <Route path={routes.confirmation} component={ConfirmationPage} />
                  <MenuTemplate>
                    <Route path={routes.categories} component={Categories} />
                    <PrivateRoute path={routes.category} component={Category} />

                    <PrivateRoute roles={[Role.Owner]} path={routes.organizationUsers} component={OrganizationUsers} />
                  </MenuTemplate>
                </Switch>
              </MainTemplate>
            </BrowserRouter>
          </userContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default Root;
