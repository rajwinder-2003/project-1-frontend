import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { isAuthenticate } from '../Auth/helper';
import Base from '../components/Base';
import AdminLeftSide from '../user/AdminLeftSide';
import { getAllCategories, getProduct, updateProduct } from './helper/adminapicall';

const UpdateProduct = () => {
    const {productId} = useParams();
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

    const preload = (productId) => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                preloadCategories();
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData()
                    
                });
                
            }
        });
    };

    const preloadCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({
                    categories: data, formData: new FormData() 
                })
            }
        })
    };

    useEffect(() => {
      preload(productId);
      // eslint-disable-next-line
    }, []);
    

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: "", loading: true})
        updateProduct(productId, user._id, token, formData).then(data => {
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
            <h4>{createProduct} updated successfully</h4>
        </div>
    );

    const warningMessage = () => {
        if (error) {
            return (
                <div className="alert alert-danger">Failed to Update product</div>
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
            Update Product
          </button>
        </form>
    );
    
  

    
        
      return (
            
            <Base 
            title='Update a Product here' 
            description='Welcome to product Update section'
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

export default UpdateProduct;