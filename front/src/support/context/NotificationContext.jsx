import React, { createContext, useReducer, useContext } from 'react';
import { createPortal } from 'react-dom';
import Alert from '../../components/molecules/Alert/index'
import { useThemeContext } from '../../support/context/ThemeContext';

export const NotificationContext = createContext();

const initialState = [];

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const REMOVE_ALL = 'REMOVE_ALL';

export const NotificationReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          id: +new Date(),
          content: action.payload.content,
          type: action.payload.type
        }
      ];
    case REMOVE:
      return state.filter(t => t.id !== action.payload.id);
    case REMOVE_ALL:
      return initialState;
    default:
      return state;
  }
};

export const NotificationProvider = props => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, initialState);
  const notificationData = { notification, notificationDispatch };

  return (
    <NotificationContext.Provider value={notificationData}>
      {props.children}
      {createPortal(<Alert notification={notification} />, document.body)}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};