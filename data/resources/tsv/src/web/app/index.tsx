// Dependencies
import React from 'react';
import { useDispatch } from 'react-redux';
// Declarations
import { AppReducerActionEnum } from '@declares/nui';
import { IUser } from '@declares/user';
// Hooks
import { useNuiEvent } from '../hooks';
// Components
import Modules from '../modules';

/**
 * Main application component
 * @returns
 */
function App() {
  const dispatch = useDispatch();

  // Listen for data from the server when user is logged in
  useNuiEvent('DOMContentLoaded', (user: IUser) => {
    dispatch({
      type: AppReducerActionEnum.SET_USER,
      user: {
        id: null,
        source: user.source,
        Name: user.Name,
      } as IUser,
    });
    dispatch({
      type: AppReducerActionEnum.SET_LOADING,
      loading: true,
    });
  });
  // Dispatch loading user data to the store
  useNuiEvent('setUser', (user: IUser) => {
    dispatch({
      type: AppReducerActionEnum.SET_USER,
      user: user,
    });
  });

  return (
    <>
      <Modules />
    </>
  );
}

export default App;
