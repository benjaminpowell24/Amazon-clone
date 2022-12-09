import React from "react";
import './Product.css';
import './bootsupport.css';
import {useStateValue} from './StateProvider';
import { useAlert } from 'react-alert';

function Product({id, title, rating, price, img}){
    const [{basket}, dispatch] = useStateValue();
    
    const alert = useAlert();

    const itemInBasket = () => {
        return(
            alert.show("Item is already in cart")
        );
    }

    const addToBasket = () => { 
       const inBasket = basket.findIndex((basketItem) => basketItem.id === id);
        if(inBasket>=0){
            itemInBasket();   
        }
        else {
            dispatch({
                type: 'ADD_TO_BASKET',
                item: {
                    id : id,
                    title : title,
                    rating : rating,
                    price : price,
                    img : img,
                    qty : 1
                }
            });
            
       }
                       
    }
    return(
         <div className="card shadow-lg margin">
            <div className="card-body">
            <div className="card-title">{title}</div>
            <div className="card-subtitle"><small>$</small><strong>{price}</strong></div>
            <div className="product__rating">{
                Array(rating).fill().map((_) => (
                <p>⭐️</p>
                ))
            }
            </div>
            </div>
            <div className="card-body text-center">
                <img src={img} className="card-img"/>
            </div>
            <div className="card-footer">
                <button className="product__btn" onClick={addToBasket}>Add to cart</button>
            </div>
        </div>
    );
}

export default Product;