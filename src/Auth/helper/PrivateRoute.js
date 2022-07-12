import React from "react";
import {Navigate} from "react-router-dom";
import {isAuthenticate} from "./index";


const PrivateRoute = ({ children }) => {
  
  if (!isAuthenticate()) {
     // user is not authenticated
     return <Navigate to="/signin" />;
  }

  return children;
  
};

export default PrivateRoute;