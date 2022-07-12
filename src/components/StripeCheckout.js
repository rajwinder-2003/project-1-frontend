import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../Auth/helper';
import { cartEmpty, loadCart } from './helper/cardHelper';
import Stripe from 'react-stripe-checkout';
import { API } from '../Api';
import { createOrder } from './helper/orderHelper';

const StripeCheckout = ({products, setReload = f => f, reload= undefined}) => {
    
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAuthenticate() && isAuthenticate().token
    const userId = isAuthenticate() && isAuthenticate().user._id

    const getFinalPrice = () => {
       let amount = 0
       products.map(p => {
        amount = amount + p.price
       })
       return amount;
    };

    const makePayment = (token) => {
        const body = {
            token,
            products
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response);
            const {status} = response;
            console.log("STATUS", status);
        }).catch(error => console.log(error));
    };

    const showStripeButton = () => {
        return isAuthenticate() ? (
            <Stripe
            stripeKey="pk_test_51LItd3SCXPpzubhG9ism8iMsNkD45r69d1rYPwiCrYkkm8gb1xxYbEDgTYQlEG4nManFryVyEErzaaQArdYo0zOk0013UAJYKd"
            token={makePayment}
            amount={getFinalPrice() * 100}
            name="Buy Tshirts"
            shippingAddress
            billingAddress
            >
            <button className="btn btn-info">Pay with stripe</button>
            </Stripe>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    }
    
  return (
    <div>
        <h3 className='text-white'>Stripe Checkout $ {getFinalPrice()}</h3>
        {showStripeButton()}
    </div>
  )
};

export default StripeCheckout;
