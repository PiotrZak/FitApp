import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute';

import { RegisterPage } from "./modules/Account/Register"
import { ActivatePage } from "./modules/Account/Activate"
import { LoginPage } from "./modules/Account/Login"
import { ForgotPassword } from "./modules/Account/ForgotPassword"

import { Plans } from "./modules/Plans/Plans"
import { Plan } from "./modules/Plans/Plan"

import { Users } from "./modules/Users/Users"
import { User } from './modules/Users/User';

import { createBrowserHistory } from 'history';
import Alert from "../src/common/Alert"

import Menu from "./Menu"

import { Categories } from './modules/Exercises/Category/Categories';
import { Category } from './modules/Exercises/Category/Category';

import './styles.scss';
// import { Exercises } from './modules/Exercises/Exercises';
import { Exercise } from './modules/Exercises/Exercise';
import { AddExercise } from './modules/Exercises/AddExercise';
import { EditExercise } from './modules/Exercises/EditExercise';

export const history = createBrowserHistory();

let App = () => {

  const [theme, setTheme] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    setUser(JSON.parse(userData))
  }, []);

  // theme
  // ? import("./designsystem/_dark.scss")
  // : import("./designsystem/_light.scss")

  const renderMenu = () => {
    if (user) {
      if (user.role == "Organization" || user.role == "Trainer") {
        return <Menu />
      }
    }
  }

  const renderAvatarMenu = () => {
    if (user) {
      if (user.role == "Organization" || user.role == "Trainer") {
        return <AvatarMenu user={user} />
      }
    }
  }

  return (
    <div className="App">
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

          <PrivateRoute user={user} path="/users" component={Users} />
          <PrivateRoute user={user} path="/user/:id" accessRole={[1, 2, 3]} component={User} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const AvatarMenu = ({ user }) => {

  const toProfile = () => {
    history.push(`/user/${user.userId}`);
  }

  const logout = () => {
    localStorage.removeItem('user');
    history.push(`/login`);
  }

  return (
    <div className="profile">
      <ul id="mainmenu">
        <li><h2>{user.firstName}</h2>
          <ul>
            <li onClick={() => toProfile()}>My Profile</li>
            <li onClick={() => logout()}>Logout</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
export default App;


{/* all Exercises */ }
{/* <Route path="/exercises" component={Exercises} /> */ }