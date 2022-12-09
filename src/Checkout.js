import React from "react";
import { useStateValue } from "./StateProvider";
import './Checkout.css';
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout(){
    const [{basket, user}, dispatch] = useStateValue();

    return(
        <div className="checkout">
            <div className="checkout__left">
            <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"/>
            {basket?.length === 0 ? (
                <div>
                    {user ? (<h3>Hey, {user?.displayName}</h3>) : ('')}
                    <h2>Your shopping cart is empty</h2><br/>
                    <p>You have no items in your shopping cart. To purchase an item click the "add to cart" button next to the item</p>
                </div>
            ) : (
                <div className="container-fluid">
                    {user ? (<h3>Hey, {user?.displayName}</h3>) : ('')}
                    <h2 className="checkout__title">Your Shopping Cart:</h2>
                    {basket.map(item => (
                        <CheckoutProduct id={item.id} title={item.title} price={item.price} img={item.img} rating={item.rating}/>
                    ))}
                </div>
            )}
             </div>
             <div> 
                 {basket.length>0 && (
                    <div className="checkout__right">
                        <Subtotal/>
                    </div>
                 )}
            </div>
            
        </div>
    );
}

export default Checkout;