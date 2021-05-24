import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProducts } from '../actions/productAction.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js'
import Rating from '../components/Rating.js';
import { useEffect } from 'react';


export default function ProductScreen(probs)
{
    const dispatch = useDispatch();
    const productId = probs.match.params.id;
    const [quantity, setQty] = useState(1);
    const productDetails = useSelector((state)=>state.productDetails);
    const {loading, error, product} = productDetails;

    useEffect(()=>{
    
        dispatch(detailsProducts(productId));
    }, [dispatch, productId]);

    const addToCartHandler = ()=>{
        probs.history.push(`/cart/${productId}?quantity =${quantity}`);
    }
 
    return(

        <div>

      {loading?(<LoadingBox></LoadingBox>):
      error?(<MessageBox variant="danger">{error}</MessageBox>):
      (

        <div>
        <a href='/'>Back</a>
    <div className="row top">
        <div className="col-2">

            <img className="fullimage" src={product.image} alt={product.name}></img>

        </div>
        <div className="col-1">
            <div>
                <ul>
                    <li>
                        <h1> {product.name}</h1>
                    </li>
                    <li>
                      <Rating rating = {product.rating} reviews = {product.reviews}></Rating>
                    </li>
                    <li>
                        <p>
                            <b>Description: </b>  {product.description}
                        </p>
                    </li>
                </ul>
            </div>
            <div className="ccart">
                <div className="card card-body">
                    <ul>
                    <li>
                        <div className="row">
                            <div>
                                Price:

                            </div>
                            <div className="price">
                                Rs.{product.price}
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div>
                                Status:

                            </div>
                            <div className="status">
                                {product.countInStock>0?(<span className="success">In stock</span>):(<span className="danger">Not in stock</span>)}
                            </div>
                        </div>
                    </li>
                    {product.countInStock>0 && (
                        <>
                    <li>

                        <div className="row">
                            <div>
                                Quantity
                            </div>
                            <div>
                                <select value={quantity} onChange={(e) => setQty(e.target.value)}>

                                    {[...Array(product.countInStock).keys()].map(
                                        (x)=>(
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )
                                    )}
                                    
                                </select>
                            </div>
                        </div>
                    </li>    

                    <li>
                        <button onClick={addToCartHandler} className="primary block">Add to cart</button>
                    </li>

                        </>
                    )}


                   
                    </ul>

                </div>
            </div>

        </div>
    </div>
    </div>

      )
      }
        
          </div>
       
    )
}