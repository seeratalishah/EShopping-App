import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartAction';
import MessageBox from '../components/MessageBox';
export default function CartScreen(probs)
{
    const productId = probs.match.params.id;
    const quantity =probs.location.search?Number(probs.location.search.split('=')[1]):1;
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();
  useEffect(()=>{
    
      dispatch(addToCart(productId, quantity));
  }, [dispatch, productId,quantity]);

  const removeCartItem = (id)=>{
      dispatch(removeFromCart(id));

  };

  const checkOut = () =>
  {
      probs.history.push('/signin?redirect=shipping')
  }
    return(
        <div className="row top">
            <div className="col-2">
                <h1>Cart Items</h1>
                {cartItems.length === 0? <MessageBox>Cart is empty. <Link to="/">Go for shopping now</Link></MessageBox>
                :
                <ul>
                    {
                        cartItems.map((item)=>
                        (
                            <li key={item.product}>
                                <div className="row">
                                    <div className="">
                                        <img src={item.image} alt={item.name} className="small"></img>
                                    </div>
                                    <div className="min-30r">
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div>
                                        <select value={item.quantity} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)) )}>
                                        {[...Array(item.countInStock).keys()].map(
                                        (x)=>(
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )
                                    )}
                                        </select>
                                    </div>
                                    <div>
                                        Rs. {item.price}
                                    </div>
                                    <div>
                                        <button type="button" onClick={()=> removeCartItem(item.product)}>remove</button>
                                    </div>
                                </div>

                            </li>
                        )

                        )
                    }
                </ul>
                }
            </div>

            <div className="col-2 cart-screen">
                <h2>Cart Details</h2>
                <div className="card card-body">
                <ul>
                    <li>
                        <h2>
                            Total items: {cartItems.reduce((a, c) => a+c.quantity, 0)} <h2> Subtotal: Rs. {cartItems.reduce((a, c)=> a+c.price*c.quantity, 0)}</h2>
                            
                        </h2>

                    </li>
                    <li>
                        <button type="button" onClick="checkOut" className="primary block" disabled={cartItems.length===0}>
                            Check Out
                        </button>
                    </li>
                </ul>
                </div>
                

            </div>
        </div>
    )
}
