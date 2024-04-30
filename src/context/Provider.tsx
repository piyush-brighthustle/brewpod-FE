import React, { createContext, useReducer, ReactNode } from 'react';
import authInitialState from '../context/initialStates/authState';
import auth from '../reducers/auth';

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);

  return <GlobalContext.Provider value={{ authState, authDispatch }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
