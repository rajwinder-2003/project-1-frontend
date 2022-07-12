import React, { useEffect, useState } from 'react'
import { isAuthenticate } from '../Auth/helper';
import Base from '../components/Base';
import AdminLeftSide from '../user/AdminLeftSide';
import { getAllCategories, createaProduct } from './helper/adminapicall';

const AddProduct = () => {
    
    const {user, token} = isAuthenticate();

    const [ values, setValues ] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createProduct: "",
        getRedirect: false,
        formData: ""
    });

    const {name, description, price, stock, categories, loading, error, createProduct, formData} = values;

    const preload = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, categories: data, formData: new FormData()});
            }
        });
    };

    useEffect(() => {
      preload();
      // eslint-disable-next-line
    }, []);
    

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: "", loading: true})
        createaProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    stock: "",
                    price: "",
                    photo: "",
                    loading: false,
                    createProduct: data.name,
                    categories: ""
                })
            }
        })
    };

    const handleChange = name => e => {
        const value = name === "photo" ? e.target.files[0] : e.target.value
        formData.set(name, value);
        setValues({...values, [name]: value})
    };

    const successMessage = () => (
        <div className="alert alert-success mt-3"
        style={{display: createProduct ? "" : "none"}}
        >
            <h4>{createProduct} created successfully</h4>
        </div>
    );

    const warningMessage = () => {
        if (error) {
            return (
                <div className="alert alert-danger">Failed to create product</div>
            )
        }
    };

    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-success">
                    <h2>Loading...</h2>
                </div>
            )
        )
     };

    const createProductForm = () => (
        <form >
          <span>Upload photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-secondary">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mt-2">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group mt-1">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group mt-1">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group mt-1">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && 
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>{cate.name}</option>
              ))
              }
            </select>
          </div>
          <div className="form-group mt-1">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-dark mt-2">
            Create Product
          </button>
        </form>
    );
    
  

    
        
      return (
            
            <Base 
            title='Add a Product here' 
            description='Welcome to product creation section'
            className='bg-info container p-4'
            >
                <div className="row">
                    <div className="col-3">
                        <AdminLeftSide/>
                    </div>
                    <div className="col-9">
                        {loadingMessage()}
                        {successMessage()}
                        {warningMessage()}
                        {createProductForm()}
                    </div>
                </div> 
            </Base>
        )
};

export default AddProduct;