const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');

const stripe = require("stripe")("")

const app = express(); 
app.use(cors());
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("it is work")
})

app.post("/payment",(req,res)=>{
  const{product,token} = req.body;
  const transactionKey = uuid();
  return stripe.customers.create({
    email:token.email,
    source:token.id
  }).then((customer)=>{
    stripe.charges.create({
        amount:product.price,
        currency:'INR',
        customer:customer.id,
        receipt_email:token.email,
        description:product.name
    })
  }).then((result)=>{
    res.json(result)
  }).catch((err)=>{
    console.log(err)
  })
})

app.listen(5000,()=>{
    console.log("server has been started in 5000")
})