import React, {useState, useEffect} from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import {useHistory} from "react-router-dom";
import {useStateValue} from "./StateProvider";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "./reducer";
import axios from "./axios";
import {db} from "./firebase";


function Payment(){
    const[{basket,user},dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(()=>{
        if(basket.length>0){
            const getClientSecret = async() => {
                const response = await axios({
                    method : 'post',
                    //Stripe requires currency in subunits
                    url : `/payments/create?total=${getBasketTotal(basket)*100}`
                });
                setClientSecret(response.data.clientSecret);
            }
    
            getClientSecret();
        }
        
    }, [basket])

    console.log("The secret is", clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            
            db.collection('user').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                    basket : basket,
                    amount : paymentIntent.amount,
                    created : paymentIntent.created
                })
            

            setSucceeded(true);
            setError(null)
            setProcessing(false)
            
            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
            
            
        });

    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return(
        <div className="payment">
            <div className="payment__container">
                <h2>Checkout({basket?.length} items)</h2>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>GE-1752344-52</p>
                        <p>Ashongman Estate, Accra</p>
                    </div>
                    <div className="payment__changeAddress">
                        <button className="payment__changeAddressBtn">Change Address</button>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and order</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct id={item.id} title={item.title} price={item.price} img={item.img} rating={item.rating}/>
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title1">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement className="payment__card" onChange={handleChange}/>
                            <div className="payment__priceDetails">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total : {(value)}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeperator={true}
                                    prefix={"$"}
                                />
                                <button className="payment__confirmBtn" disabled={processing||disabled||succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )  
}

export default Payment;