import React, { useReducer, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase";
export const AuthContext = createContext();

const initialState = { isAuthenticated: true };

const reducer = (state, action) => {
  // console.log(state);
  //   console.log(action.payload);

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
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        // console.log(user);
        console.log("user is sign in");
        dispatch({ type: "LOGIN", payload: { user } });
        // ...
      } else {
        // User is signed out
        console.log("user is sign out");
        // ...
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}
