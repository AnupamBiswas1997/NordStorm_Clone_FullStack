const express = require("express");
const productModel = require("../models/product.models"); // Import Product model
const productRoutes = express.Router();

productRoutes.use(express.json());

// Get all products with optional pagination and filters
productRoutes.get("/list", async (req, res) => {
    const { page = 1, limit = 10, brand, search } = req.query;
    const filter = {};

    if (brand) filter.brand = brand;
    if (search) filter.name = new RegExp(search, "i"); // Case-insensitive search

    try {
        const products = await productModel
            .find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const total = await productModel.countDocuments(filter);

        res.json({
            msg: "List of Products",
            data: products,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalProducts: total,
        });
    } catch (error) {
        res.status(400).json({ message: "Error fetching products", error });
    }
});

// Get a single product by ID
productRoutes.get("/:productId", async (req, res) => {
    try {
        const product = await productModel.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Add a new product
productRoutes.post("/add", async (req, res) => {
    console.log("Add product endpoint hit");
    console.log("Payload:", req.body);
    const { name, description, highlights, price, images, stock, brand } = req.body;

    // Validate required fields
    if (!name || !description || !price || !images || !stock || !brand) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

    try {
        const newProduct = new productModel({ name, description, highlights, price, images, stock, brand });
        const savedProduct = await newProduct.save();
        res.status(201).json({ msg: "Product Created", data: savedProduct });
    } catch (error) {
        res.status(400).json({ message: "Error creating product", error });
    }
});

// Update an existing product
productRoutes.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.json({ msg: "Product Updated", data: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: "Error updating product", error });
    }
});

// Delete a product
productRoutes.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.json({ msg: "Product Deleted", data: deletedProduct });
    } catch (error) {
        res.status(400).json({ message: "Error deleting product", error });
    }
});

module.exports = productRoutes;
