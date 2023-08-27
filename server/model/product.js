const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name:String,
    category:String,
    price:String,
    image:String,
    description:String
});

exports.Product = mongoose.model('product', productSchema);