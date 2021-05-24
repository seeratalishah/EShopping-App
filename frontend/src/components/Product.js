import React from 'react';
import Rating from './Rating.js';
import {Link} from 'react-router-dom';
export default function Product(probs)
{
    const {product} = probs;
    return(
        <div key={product._id} className="card">
              <Link to={`/product/${product._id}`}>
                <img className="medium" src={product.image} alt="product"/>
              </Link>
              <div className="card-body">
                <Link to={`/product/${product._id}`}><h1>{product.name}</h1></Link>
                <Rating rating ={product.rating} reviews = {product.reviews}></Rating>
                  <div className="price">
                    {product.price}
                  </div>
              </div>
            </div>
    )
}