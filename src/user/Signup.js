import React, {useState} from "react";
import {Link} from 'react-router-dom';
import { signup } from "../Auth/helper";
import Base from "../components/Base";

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const {name, email, password, error, success} = values;

    const onChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };

    const onSubmit = e => {
        e.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true

                });
            }
        })
        .catch(console.log("Error in signup"));
    };

    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-3 text-start">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control mt-2" value={name} onChange={onChange("name")} type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-3">Email</label>
                            <input className="form-control mt-2" value={email} onChange={onChange("email")} type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-3">Password</label>
                            <input className="form-control mt-2" value={password} onChange={onChange("password")} type="password" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-outline-info w-100 mt-3">Submit</button>
                    </form>
                </div>
            </div>
        )
    };

    const successMessage = () => {
       return(
        <div className="row">
            <div className="col-md-6 offset-3 text-start">
                <div className="alert alert-success"
                    style={{display: success ? "" : "none"}}
                    >
                    New account was created successfuly. Please <Link to='/signin'>Login Here</Link>
                </div>
            </div>
        </div>
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

    return(
        <Base title="Sign up page" description="A page for user sign up!">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}

        </Base>
    )
}

export default Signup;