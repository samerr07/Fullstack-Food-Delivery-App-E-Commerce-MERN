const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/productRoute");
const Stripe = require("stripe")

const server = express();

//middlewares
dotenv.config()
server.use(cors());
server.use(express.json({limit:"10mb"}));
server.use("/api/v1/user",userRouter.router);
server.use("/api/v1/product",productRouter.router);

//connecting a database
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://codersam:SjjKsp1l26C5yzlt@cluster0.zqjxscu.mongodb.net/?retryWrites=true&w=majority');
    console.log("Database Connected")
}


server.get("/",(req,res)=>{
    res.send("Happy bday Shivangi")
})

//Payment Gateway

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
server.post("/api/v1/create-checkout-session",async(req,res)=>{
    
    // console.log(req.body)
    try{
        const params = {
            submit_type : 'pay',
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : "auto",
            shipping_options : [{shipping_rate : "shr_1NjPZcSHtP90HBqj1syHuORg"}],
  
            line_items : req.body.map((item)=>{
              return{
                price_data : {
                  currency : "inr",
                  product_data : {
                    name : item.name,
                    // images : [item.image]
                  },
                  unit_amount : item.price * 100,
                },
                adjustable_quantity : {
                  enabled : true,
                  minimum : 1,
                },
                quantity : item.qty
              }
            }),
  
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`,
  
        }
  
        
        const session = await stripe.checkout.sessions.create(params)
        // console.log(session)
        res.status(200).json(session.id)
    }
       catch (err){
          res.status(err.statusCode || 500).json(err.message)
       }

})


//listen to server

server.listen(8080,()=>{
    console.log("Server Started")
})
