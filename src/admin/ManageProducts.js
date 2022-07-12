import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../Auth/helper';
import Base from '../components/Base';
import AdminLeftSide from '../user/AdminLeftSide';
import { deleteProduct, getAllProducts } from './helper/adminapicall';

const ManageProduct = () => {

    const [products, setProducts] = useState([]);

    const {user, token} = isAuthenticate();

    const preload = () => {
        getAllProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        preload();
    }, [])

    const deleteThisProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        });
    };
    
        
      return (
            
            <Base 
            title='Welcome admin' 
            description='Manage products here'
            className='bg-info container p-4'
            >
                <div className="row">
                    <div className="col-3">
                        <AdminLeftSide/>
                    </div>
                    <div className="col-9">
                        <h2 className="mb-4">All products:</h2>
                                {products.map((product, index) => {
                                    return(
                                    <div key={index} className="row text-center mb-2 ">
                                        <div className="col-4">
                                            <h3 className="text-white text-left">{product.name}</h3>
                                        </div>
                                        <div className="col-4">
                                            <Link
                                            className="btn btn-success"
                                            to={`/admin/product/update/${product._id}`}
                                            >
                                                <span className="">Update</span>
                                            </Link>
                                        </div>
                                        <div className="col-4">
                                            <button onClick={() => {
                                                deleteThisProduct(product._id)
                                            }} className="btn btn-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    );
                                })};
                        
                    </div>
                </div> 
            </Base>
        )
};

export default ManageProduct;