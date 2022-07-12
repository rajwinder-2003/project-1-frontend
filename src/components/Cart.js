import React, { useEffect, useState } from 'react'
import '../App.css';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cardHelper';
import Paymentb from './Paymentb';
import StripeCheckout from './StripeCheckout';




const Cart = () => {
  
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
      setProducts(loadCart())
    }, [reload]);
    
    
    const loadAllProducts = products => {
        return(
            <div>
                <h2>This section is load to product</h2>
                {products.map((product, index) => (
                    <Card
                    key={index}
                    product={product}
                    removeFromCart={true}
                    addtoCart={false}
                    setReload={setReload}
                    reload={reload}
                    />
                ))}
            </div>
        )
    };

    const loadCheckout = () => {
        return(
            <div>
                <h2>This section for checkOut</h2>
            </div>
        )
    };
  

  return (
    <Base title='Cart page' description='Ready to checkout'>
        <div className="row text-center">
            <div className="col-6">{products.length > 0 ? loadAllProducts(products) : ( <h3>No Products in Cart</h3> ) }</div>
            <div className="col-6">
                {/* <StripeCheckout
                products={products}
                setReload={setReload}
                /> */}

                <Paymentb
                products={products}
                setReload={setReload}
                />
            </div>
        </div>
    </Base>
  )
};
export default Cart;
