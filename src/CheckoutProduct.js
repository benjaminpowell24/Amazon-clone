import React,{useState} from "react";
import './CheckoutProduct.css';
import './bootsupport.css';
import { useStateValue } from "./StateProvider";
import {useHistory} from "react-router-dom";
import { useAlert } from 'react-alert';


function CheckoutProduct({id, title, price, img, rating, hideButton}){
    const history = useHistory();
    const [{basket}, dispatch] = useStateValue();
    const[qty, setQty] = useState(1);

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        });
    }

    const alert = useAlert();

    function increaseQty(){
        if(qty<20){
            setQty(qty + 1);
            dispatch({
                type: 'INCREASE_QTY',
                id: id,
                qty: qty + 1
            });
        }
        else{
            return(
                alert.show("Max quantity reached! Contact us for bulk purchase")

            );
        }
        
    }

    function decreaseQty(){
        if(qty>1){
            setQty(qty - 1);
            dispatch({
                type: 'DECREASE_QTY',
                id: id,
                qty: qty - 1
            });
        }
        
        else{
            return(
                alert.show("Quantity cannot be less than 1")
            );
        }
        
    }

    return(
        <div className="checkoutProduct">
            <img className="checkoutProduct__img" src={img}/>
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price"><small>$</small><strong>{price}</strong></p>
                <div className="checkoutProduct__rating">
                {Array(rating).fill().map((_)=>(
                    <p>⭐</p>
                ))}
                </div>
                {!hideButton &&(
                    <div>   
                        <div className="checkoutProduct__qtyBtnGroup">
                            <button className="btn-increament-decreament" onClick={decreaseQty}>-</button>
                            <input className="checkoutProduct__qty" readOnly value={qty}/>
                            <button className="btn-increament-decreament" onClick={increaseQty}>+</button>
                        </div>               
                        <button onClick={removeFromBasket} className="checkoutProduct__removebtn">Remove from cart</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CheckoutProduct;