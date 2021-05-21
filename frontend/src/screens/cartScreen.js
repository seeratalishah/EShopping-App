import React from 'react';
export default function cartScreen(probs)
{
    const productId = probs.match.params.id;
    const quantity =probs.location.serach?Number(probs.location.serach.split('=')[1]):1;
    return(
        <div>
                    <h1>My Cart</h1>
                    <p> Item selected: {productId} Quantity: {quantity}</p>
        </div>
    )
}
