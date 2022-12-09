import React from 'react';
import './Order.css';
import moment from "moment";
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from "react-currency-format";

function Order({order}){
    return(
        <div className="order">
            <div className="order__title">
                <div className="order__subtitle">
                    <h3>Order</h3>
                    <p>
                        #<small>{order.id}</small>
                    </p>
                </div>
                
                <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            </div>
            
            
                {order.data.basket?.map(item =>
                    <CheckoutProduct id={item.id} title={item.title} price={item.price} img={item.img} rating={item.rating} hideButton/>
                )}
                <CurrencyFormat
                renderText = {(value) => (
                    <>
                        <h3 className="order__total">Order total is {value}</h3>
                    </>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType ={"text"}
                thousandSeperator={true}
                prefix={"$"}
            />       
        </div>
    )
}

export default Order