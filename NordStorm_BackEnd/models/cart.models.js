const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    productList: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "productModel", required: true },
            quantity: { type: Number, required: true } // Quantity of this product in the cart
        }
    ]
});

const cartModel = mongoose.model("Cart", CartSchema);

module.exports = cartModel;
