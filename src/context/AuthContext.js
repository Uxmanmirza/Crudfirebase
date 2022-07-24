import React, { useReducer, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase";
export const AuthContext = createContext();

const initialState = { isAuthenticated: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, { isAuthenticated: true }, action.payload);
    case "LOGOUT":
      return { isAuthenticated: false };
    default:
      return state;
  }
};

export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", payload: { user } });
      } else {
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}
