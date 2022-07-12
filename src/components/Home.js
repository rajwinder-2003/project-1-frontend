import React, { useEffect, useState } from 'react'
import '../App.css';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreApiCall';




const Home = () => {
  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct()
  }, [])
  

  return (
    <Base title='Home page' description='welcome to the tshirt store'>
        <div className="row text-center">
            <h1 className="text-white">All of tshirts</h1>
            <div className="row">
              {products && products.map((product, index) => {
                  return(
                    <div key={index} className="col-4 mb-4">
                      <Card product={product}/>
                    </div>
                  )
              })}
            </div>
        </div>
    </Base>
  )
};
export default Home;
