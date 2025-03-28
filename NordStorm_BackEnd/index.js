require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Add this line
const connectToDB = require("./config");
const userRoutes = require("./routes/user.routes");
const cartRoutes = require("./routes/cart.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

// Enable CORS for the frontend
app.use(cors({
    origin:  process.env.ORIGIN, // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.options("*", cors());

app.use(express.json());
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    try {
        connectToDB();
        console.log("Connected to DB!!!");
    } catch (error) {
        console.log("Failed to connect to DB!!!", error);
    }
    console.log(`Server Started on port ${PORT}`);
});
