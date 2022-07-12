import React, {Fragment} from "react";
import {Link , useLocation, useNavigate} from 'react-router-dom';
import { signout, isAuthenticate } from "../Auth/helper";



const Navbar = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const currentTab = (path) => {
        if(location.pathname === path){
            return {color: "#0dcaf0"}
        } else {
            return {color: "#FFFFFF"}
        }
    }
    return(
        <div className="pt-2">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link style={currentTab("/")} className="nav-link" to ="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab("/cart")} className="nav-link" to ="/cart">
                        Cart
                    </Link>
                </li>
               {isAuthenticate() && isAuthenticate().user.role === 0 && (
                    <li className="nav-item">
                        <Link style={currentTab("/user/dashboard")} className="nav-link" to ="/user/dashboard">
                            U. Dashboard
                        </Link>
                    </li>
                )}
                {isAuthenticate() && isAuthenticate().user.role === 1 && (
                        <li className="nav-item">
                            <Link style={currentTab("/admin/dashboard")} className="nav-link" to ="/admin/dashboard">
                                A. Dashboard
                            </Link>
                        </li>
                )}
                {!isAuthenticate() && (
                    <Fragment>
                    <li className="nav-item">
                        <Link style={currentTab("/signup")} className="nav-link" to ="/signup">
                            SignUp
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentTab("/signin")} className="nav-link" to ="/signin">
                            SignIn
                        </Link>
                    </li>
                    </Fragment>
                )}

                {isAuthenticate() && (
                    <li className="nav-item">
                      <span
                      className="nav-link text-warning"
                      onClick={() => {
                        signout(() => {
                            navigate("/")
                        })
                      }}
                      >
                        Signout
                      </span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Navbar;