import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../Authentication/Login";

export default function PrivateRoutes(props) {
  const { isAuthenticated } = useContext(AuthContext);
  //   const { isAuthenticated } = authentication;
  //   console.log(user);
  const { Component } = props;

  if (!isAuthenticated) return <Login />;

  return <Component />;
}
