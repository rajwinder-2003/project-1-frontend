import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { isAuthenticate } from '../Auth/helper';
import Base from '../components/Base';
import AdminLeftSide from '../user/AdminLeftSide';
import {getCategory,updateaCategory} from './helper/adminapicall';

const UpdateCategory = () => {

    const {categoryId} = useParams();
    
    const [value, setvalue] = useState({
        name: "",
        error: "",
        success: "",
    });

    const {user, token} = isAuthenticate();

    const {name, error, success} = value;

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
            if (data.error) {
                setvalue({...name, error: data.error});
            } else {
                setvalue({
                    ...name,
                    name: data.name,
                });
                
            }
        });
    };

    useEffect(() => {
        preload(categoryId);
        // eslint-disable-next-line
      }, []);

    const handelOnChange = (e) => {
        setvalue(e.target.value)
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setvalue({...value, error: "", success: false})

        //backend request fired

        updateaCategory(categoryId, user._id, token, name)
            .then(data => {
                if (data.error) {
                    setvalue({...value, error: data.error})
                } else {
                    setvalue({
                        ...value,
                        name: "",
                        success: true
                    })
                }
            });

    };

    const successMessage = () => {
        if (success) {
            return <h4 className='text-success'>Category Updated successfully</h4>
        }
    };

    const warningMessage = () => {
        if (error) {
            return <h4 className='text-warning'>Failed to update category</h4>
        }
    };

    const myCategoryForm = () => {
       return(
        <form>
            <div className="form-group">
                <p className="lead text-white">Update the category</p>
                <input type="text"
                className='form-control my-3'
                onChange={handelOnChange}
                value={name}
                autoFocus
                required
                placeholder='For Ex. Summer'
                />
                <button onClick={onSubmit} className="btn btn-outline-dark">Update Category</button>
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

export default UpdateCategory;




    
