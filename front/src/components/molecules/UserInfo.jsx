import React from 'react';
import {Avatar} from "../molecules/Avatar"

export const UserInfo = ({user}) => (
  <div className="user-container__info">
    {user &&
    <div>
      <Avatar avatar={user.avatar} id={user.userId}/>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>{user.role}</p>
      <p>{user.phoneNumber}</p>
      <p>{user.email}</p>
    </div>
    }
  </div>
)