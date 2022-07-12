import React, { useState } from 'react'
import { isAuthenticate } from '../Auth/helper';
import Base from '../components/Base';
import AdminLeftSide from '../user/AdminLeftSide';
import {createCategory} from './helper/adminapicall';

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticate();

    const handelOnChange = (e) => {
        setError("");
        setName(e.target.value)
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        //backend request fired

        createCategory(user._id, token, {name})
            .then(data => {
                if (data.error) {
                    setError(true);
                } else {
                    setError("");
                    setSuccess(true);
                    setName("");
                }
            });

    };

    const successMessage = () => {
        if (success) {
            return <h4 className='text-success'>Category created successfully</h4>
        }
    };

    const warningMessage = () => {
        if (error) {
            return <h4 className='text-warning'>Failed to create category</h4>
        }
    };

    const myCategoryForm = () => {
       return(
        <form>
            <div className="form-group">
                <p className="lead text-white">Enter the category</p>
                <input type="text"
                className='form-control my-3'
                onChange={handelOnChange}
                value={name}
                autoFocus
                required
                placeholder='For Ex. Summer'
                />
                <button onClick={onSubmit} className="btn btn-outline-dark">Create Category</button>
            </div>
        </form>
       )
    };  
      return (
            
            <Base 
            title='Create a category here' 
            description='Add a new category for new tshirts'
            className='bg-info container p-4'
            >
                <div className="row">
                    <div className="col-3">
                        <AdminLeftSide/>
                    </div>
                    <div className="col-9">
                        {successMessage()}
                        {warningMessage()}
                        {myCategoryForm()}
                    </div>
                </div> 
            </Base>
        )
};

export default AddCategory;




    
