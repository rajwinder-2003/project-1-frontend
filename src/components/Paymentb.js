import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { cartEmpty, loadCart } from './helper/cardHelper';
import {getmeToken, processPayment} from './helper/paymentBHelper';
import {createOrder} from './helper/orderHelper';
import { isAuthenticate } from '../Auth/helper';
import DropIn from 'braintree-web-drop-in-react';

const Paymentb = ({products, setReload = f => f, reload= undefined}) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAuthenticate() && isAuthenticate().user._id
    const token = isAuthenticate() && isAuthenticate().token


    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            console.log("INFORMATION", info)
            if (info.error) {
                setInfo({...info, error: info.error})
            } else {
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    };

    const showbtdropIn = () => {
        return(
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                     <DropIn
                       options={{ authorization: info.clientToken }}
                       onInstance={instance => (info.instance = instance)}
                     />
                     <button className='btn btn-outline-info w-100' onClick={onPurchase}>Buy</button>
                    </div>
                ) : (
                    <>
                    <h3>Please login or add somthing to cart</h3>
                    <Link to="/signin">
                        <button className="btn btn-warning">Signin</button>
                    </Link>
                    </>
                ) }
            </div>
        )
    };

    useEffect(() => {
      getToken(userId, token)
    }, []);

    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                };

                processPayment(userId, token, paymentData)
                .then(response => {
                    setInfo({...info, success: response.success, loading: false})
                    console.log("PAYMENT SUCCESS")

                    const orderData = {
                        products: products,
                        transaction_id: response.transaction_id,
                        amount: response.transaction.amount
                    };

                    createOrder(userId, token, orderData);

                    cartEmpty(() => {
                        console.log("Did we goat a crash")
                    });
                    setReload(!reload);
                })
                .catch(error => {
                    setInfo({loading: false, success: false})
                    console.log("PAYMENT FAILAD")
                })
            })
    };

    const getAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price
        })
        return amount
    };
    

    
  return (
    <div>
       <h3>Your bill is {getAmount()} $</h3> 
       {showbtdropIn()}
    </div>
  )
};

export default Paymentb;
