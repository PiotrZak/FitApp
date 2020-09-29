import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Icon from './common/Icon';
import Spacer from './common/Spacer';
import { userContext, ThemeContext, LanguageContext } from './App';

const routes = {
  categories: '/categories',
  plans: '/plans',
  users: '/users',
  myProfile: '/myprofile',
  organizations: '/organizations',
};

const Menu = () => {
  const [currentUrl, setCurrentUrl] = useState();

  const { lang } = useContext(LanguageContext);
  const { user } = useContext(userContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const currentUrl = window.location.href.split('/');
    setCurrentUrl(currentUrl[3]);
  }, [window.location.href]);

  return (
    <div className="navigation">
      <div className="navigation__menu">
        <NavLink
          exact
          to={routes.categories}
          activeClassName="active"
        >
          <div className="navigation__menu__icon"><Icon name="dumbbell" fill={currentUrl === routes.categories.substring(1) ? 'white' : '#666674'} width="28px" /></div>
        </NavLink>
        <Spacer h={20} />
        <NavLink
          to={routes.users}
          activeClassName="active"
        >
          <div className="navigation__menu__icon"><Icon name="list-ul" fill={currentUrl === routes.users.substring(1) ? 'white' : '#666674'} width="28px" /></div>
        </NavLink>
        <Spacer h={20} />
        <NavLink
          to={routes.plans}
          activeClassName="active"
        >
          <div className="navigation__menu__icon"><Icon name="clipboard-notes" fill={currentUrl === routes.plans.substring(1) ? 'white' : '#666674'} width="28px" /></div>
        </NavLink>
        <Spacer h={20} />
        <NavLink
          to={`${routes.myProfile}/${user.userId}`}
          activeClassName="active"
        >
          <div className="navigation__menu__icon"><Icon name="user-circle" fill={currentUrl === routes.myProfile.substring(1) ? 'white' : '#666674'} width="28px" /></div>
        </NavLink>
        <Spacer h={20} />
        <NavLink
          to={`${routes.organizations}/`}
          activeClassName="active"
        >
          <div className="navigation__menu__icon"><Icon name="clouds" fill={currentUrl === routes.organizations.substring(1) ? 'white' : '#666674'} width="28px" /></div>
        </NavLink>
      </div>
    </div>
  );
};

export default withRouter(Menu);
