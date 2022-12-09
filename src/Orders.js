import React, { useEffect, useState } from 'react';
import { db } from "./firebase";
import './Orders.css';
import Order from './Order'
import { useStateValue } from './StateProvider';

function Orders(){
    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user){
            db.collection('user').doc(user?.uid).collection('orders').onSnapshot((snapshot) => {
                    const orderList = snapshot.docs.map((doc) => ({
                        id : doc.id,
                        data : doc.data()
                    }));
                    setOrders(orderList);
            });      
        }
        else{
            setOrders([])
        }
        
    },[user])
    
    return(
        <div className="orders">
            <h2>Your Orders:</h2>
            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order}/>
                ))}
            </div>
        </div>
    )
}

export default Orders