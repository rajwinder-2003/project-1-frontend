import React from "react";
import {Navigate} from "react-router-dom";
import {isAuthenticate} from "./index";


const AdminRoute = ({ children }) => {

  if (isAuthenticate() && isAuthenticate().user.role === 1) {
     // user is not authenticated
     return children;
  }

  return <Navigate to="/signin" />;
  
};

export default AdminRoute;