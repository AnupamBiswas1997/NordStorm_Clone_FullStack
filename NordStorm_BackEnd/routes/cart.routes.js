const express = require("express");
const cartModel = require("../models/cart.models");
const productModel = require("../models/product.models");
const cartRoutes = express.Router();

cartRoutes.use(express.json());

// Get the cart for a specific user
cartRoutes.get("/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const cart = await cartModel
            .findOne({ email })
            .populate("productList.product", "name description highlights price images stock brand");
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found for this user." });
        }
        res.status(200).json({ msg: "Cart Details", data: cart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(400).json({ error: error.message });
    }
});

// Add or update items in the cart
cartRoutes.post("/add", async (req, res) => {
    const { email, productId, quantity } = req.body;
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found." });
        }

        let cart = await cartModel.findOne({ email });
        if (!cart) {
            cart = new cartModel({
                email,
                productList: [{ product: productId, quantity }]
            });
        } else {
            const productIndex = cart.productList.findIndex(item => item.product.toString() === productId);
            if (productIndex > -1) {
                cart.productList[productIndex].quantity += quantity;
            } else {
                cart.productList.push({ product: productId, quantity });
            }
        }

        await cart.save();
        res.status(201).json({ msg: "Product added/updated in cart successfully.", data: cart });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(400).json({ error: error.message });
    }
});

// Remove an item from the cart
cartRoutes.delete("/remove", async (req, res) => {
    const { email, productId } = req.body;
    try {
        const cart = await cartModel.findOne({ email });
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found." });
        }

        cart.productList = cart.productList.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.status(200).json({ msg: "Product removed from cart.", data: cart });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(400).json({ error: error.message });
    }
});

// Clear the cart
cartRoutes.delete("/clear", async (req, res) => {
    const { email } = req.body;
    try {
        const cart = await cartModel.findOne({ email });
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found." });
        }

        cart.productList = [];
        await cart.save();
        res.status(200).json({ msg: "Cart cleared successfully." });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = cartRoutes;
