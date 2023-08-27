const {Product} = require("./../model/product")
const mongoose = require("mongoose")

// Upload Product

exports.uploadProduct = async(req,res)=>{
    // console.log(req.body);
    const product = new Product(req.body)
    try{
        await product.save();
        return res.status(201).send({
            success:true,
            message:"Product uploaded Successfully !!!",
            product
        })
    }catch(err){
        console.log(err)
        return res.status(401).send({
            success:false,
            message:"Product not uploaded !!!",
        })
    }
}

//Get Product

exports.getProduct = async(req,res)=>{
    try{
        const products = await Product.find();
        return res.status(200).send({
            success:true,
            message:"Products fetched Successfully !!!",
            products
        })
    }catch(err){
        console.log(err)
        return res.status(401).send({
            success:false,
            message:"Products not fetched !!!",
        })
    }
}