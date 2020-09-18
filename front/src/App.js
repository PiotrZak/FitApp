import React, { useState, useEffect } from 'react';
import {
  Route, Switch, BrowserRouter, Link, NavLink
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { PrivateRoute } from './utils/PrivateRoute';

import { RegisterPage } from './modules/Account/Register';
import { ActivatePage } from './modules/Account/Activate';
import { LoginPage } from './modules/Account/Login';
import { ForgotPassword } from './modules/Account/ForgotPassword';

import { Plans } from './modules/Plans/Plans';
import { Plan } from './modules/Plans/Plan';

import { AllUsers } from './modules/Users/AllUsers';
import { Trainers } from './modules/Users/Trainers';
import { Clients } from './modules/Users/Clients';

import { User } from './modules/Users/User';

import Alert from './common/Alert';

import Menu from './Menu';

import { Categories } from './modules/Exercises/Category/Categories';
import { Category } from './modules/Exercises/Category/Category';

import './styles.scss';
// import { Exercises } from './modules/Exercises/Exercises';
import { Exercise } from './modules/Exercises/Exercise';
import { AddExercise } from './modules/Exercises/AddExercise';
import { EditExercise } from './modules/Exercises/EditExercise';
import { MyProfile } from './modules/Users/MyProfile';

export const history = createBrowserHistory();

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#303030',
  },
};

export const userContext = React.createContext();
export const ThemeContext = React.createContext(themes.dark);
export const LanguageContext = React.createContext();

const App = () => {
  const themeHook = useState('dark');
  const [user, setUser] = useState('test');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    setUser(JSON.parse(userData));
  }, []);

  // theme
  // ? import("./designsystem/_dark.scss")
  // : import("./designsystem/_light.scss")

  const renderMenu = () => {
    if (user) {
      if (user.role === 'Organization' || user.role === 'Trainer') {
        return <Menu />;
      }
    }
  };

  const renderAvatarMenu = () => {
    // if (user) {
    //   if (user.role === 'Organization' || user.role === 'Trainer') {
    return <AvatarMenu user={user} />;
    //   }
    // }
  };

  return (
    <div className="App">
      <LanguageContext.Provider
        value={{
          lang: selectedLanguage,
        }}
      >
        <ThemeContext.Provider value={{ theme: themeHook }}>
          <userContext.Provider value={{ user }}>
            <Alert />
            <BrowserRouter history={history}>
              {renderMenu()}
              {renderAvatarMenu()}
              <Switch>
                <PrivateRoute user={user} exact path="/register" component={RegisterPage} />
                <PrivateRoute user={user} exact path="/activate" component={ActivatePage} />
                <Route path="/login" component={LoginPage} />
                <Route user={user} path="/forgotpassword" component={ForgotPassword} />

                <PrivateRoute user={user} path="/categories" component={Categories} />
                <PrivateRoute user={user} path="/category/:id" component={Category} />
                <PrivateRoute user={user} path="/add-exercise" component={AddExercise} />
                <PrivateRoute user={user} path="/edit-exercise/:id" component={EditExercise} />
                <PrivateRoute user={user} path="/exercise/:id" component={Exercise} />

                <PrivateRoute user={user} path="/plans" component={Plans} />
                <PrivateRoute user={user} path="/plan/:id" component={Plan} />

                <PrivateRoute user={user} path="/users" component={AllUsers} />



                {/* Only Owner */}
                <PrivateRoute user={user} path="/trainers" component={Trainers} />

                {/* Only Trainers */}
                <PrivateRoute user={user} path="/clients" component={Clients} />

                <PrivateRoute user={user} path="/user/:id" accessRole={[1, 2, 3]} component={User} />
                <PrivateRoute user={user} path="/user/:id" accessRole={[1, 2, 3]} component={MyProfile} />

              </Switch>
            </BrowserRouter>
          </userContext.Provider>
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </div>
  );
};

const AvatarMenu = ({ user }) => {

  const toProfile = () => {
    history.push(`/user/${user.userId}`);
  };

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div className="profile">
      <ul id="mainmenu">
        <li>
            {user.avatar ?
              <img alt ={"test"} src={`data:image/jpeg;base64,${user.avatar}`} />
              : <h3> Welcome{user.firstName}</h3>
            }

            <ul>
              <li onClick={() => toProfile()}>
                <NavLink
                  to={`user}/${user.userId}`}
                  activeClassName="active"
                >
                  My Profile
                </NavLink></li>
              <li onClick={() => logout()}>Logout</li>
            </ul>

        </li>
      </ul>
    </div>
      );
    };
    
    
    export default App;
    
{ /* all Exercises */
      }
      { /* <Route path="/exercises" component={Exercises} /> */
      }
