// DEPENDENCIES
import React from 'react';
import { useDispatch } from 'react-redux';
// DECLARES
import { AppReducerActionEnum } from '../../core/declares/nui';
import { IUser } from '../../core/declares/user';
// HOOKS
import { useNuiEvent } from '../hooks';
// COMPONENTS
import Modules from '../modules';


function App() {
  const dispatch = useDispatch();

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
  useNuiEvent('setUser', (user: IUser) => {
    dispatch({
      type: AppReducerActionEnum.SET_USER,
      user: user
    })
  });

  return (
    <>
      <Modules />
    </>
  );
}

export default App;
