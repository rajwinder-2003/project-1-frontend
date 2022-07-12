import React, {useState} from "react";
import {useNavigate, Navigate} from 'react-router-dom';
import { signin, authenticate, isAuthenticate } from "../Auth/helper";
import Base from "../components/Base";

const Signin = () => {
    let navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,
    });

    const {email, password, error, loading, didRedirect } = values;
    const {user} = isAuthenticate();

    const onChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };

    const onSubmit = e => {
        e.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect: true
                    });
                });
            }
        })
        .catch(console.log("signin request failed"));
    };

    const performRedireact = () => {
        if(didRedirect){
            if(user && user.role === 1) {
                return navigate("/admin/dashboard");
            }else {
                return navigate("/user/dashboard");
            }
        }
        if(isAuthenticate()){
            return <Navigate to="/"/>
        }
    }

    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
     };
 
     const errorMessage = () => {
        return(
         <div className="row">
             <div className="col-md-6 offset-3 text-start">
                 <div className="alert alert-danger"
                     style={{display: error ? "" : "none"}}
                     >
                     {error}
                 </div>
             </div>
         </div>
         )
     };

    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-3 text-start">
                    <form>
                        <div className="form-group">
                            <label className="text-light mt-3">Email</label>
                            <input onChange={onChange("email")} value={email} className="form-control mt-2" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-3">Password</label>
                            <input onChange={onChange("password")} value={password} className="form-control mt-2" type="password" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-outline-info w-100 mt-3">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base title="Sign in page" description="A page for user sign in!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedireact()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default Signin;