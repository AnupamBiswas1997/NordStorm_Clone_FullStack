const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    highlights: [String],
    price: Number,
    images: [String],
    stock: Number,
    brand: String
});

const productModel = mongoose.model("productModel", ProductSchema);

module.exports = productModel;
