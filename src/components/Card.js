import React, { useEffect, useState } from 'react'
import ImageHelper from './helper/ImageHelper';
import {Navigate} from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cardHelper';

const Card = ({ product, addtoCart = true, removeFromCart = false, setReload = f => f,  reload= undefined }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cardTitle = product ? product.name : "A photo from pexels"
    const cardDescription = product ? product.description : "default description"
    const cardPrice = product ? product.price : "default"

    const addToCart = () => {
      addItemToCart(product, () => setRedirect(true))
    }

    const getRedirect = (redirect) => {
      if (redirect) {
        return <Navigate to="/cart" />
      }
    };

    const showAddToCart = addtoCart => {
        return(
            addtoCart && (
                <button
                onClick={addToCart}
                className="btn w-100 btn-outline-warning mt-2 mb-2"
              >
                Add to Cart
              </button>
            )
        )
    };

    const showRemoveFromCart = (removeFromCart) => {
        return(
            removeFromCart && (
                <button
                onClick={() => {
                  removeItemFromCart(product._id);
                  setReload(!reload);
                }}
                className="btn w-100 btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            )
        )
    };

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
          {getRedirect(redirect)}
          <ImageHelper product={product}/>
          <p className="lead bg-info font-weight-normal text-wrap">
            {cardDescription}
          </p>
          <p className="btn btn-warning rounded  btn-sm px-4">$ {cardPrice}</p>
          <div className="row">
            <div className="col-12">{showAddToCart(addtoCart)}</div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
};

export default Card;
