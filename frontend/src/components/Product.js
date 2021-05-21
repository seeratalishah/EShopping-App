import React from 'react';
import Rating from './Rating.js';
export default function Product(probs)
{
    const {product} = probs;
    return(
        <div key={product._id} className="card">
              <a href={`/product/${product._id}`}>
                <img className="medium" src={product.image} alt="product"/>
              </a>
              <div className="card-body">
                <a href={`/product/${product._id}`}><h1>{product.name}</h1></a>
                <Rating rating ={product.rating} reviews = {product.reviews}></Rating>
                  <div className="price">
                    {product.price}
                  </div>
              </div>
            </div>
    )
}