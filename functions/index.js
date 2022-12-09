const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51IDasuG92LuOtRegaLbe8KFvdnNXP0eLBNYsK3sh3YcOa6v5loQAMNmrta8CWriQhpnk5Mo8ltQ40kv11Vr7jVHr009OiXcqbH')

//API

//App config

const app = express();

//Middlewares

app.use(cors({origin:true}));
app.use(express.json());

//API routes


app.post("/payments/create", async (request, response) => {
    const total = Math.round(request.query.total);

    if (total>=1){
        console.log('Payment request received for this amount ',total);

        const paymentIntent = await stripe.paymentIntents.create({
            amount : total,
            currency : "usd",
        });

    
    response.status(201).send({
        clientSecret : paymentIntent.client_secret,
    })
}
    
})

//Listen command
//http://localhost:5001/clone-bfcfe/us-central1/api


exports.api = functions.https.onRequest(app)