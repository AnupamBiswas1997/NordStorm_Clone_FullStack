import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import "../styles/productContentStyle.css";

export function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Fetch product details from the backend
        axios.get(`http://localhost:3000/products/${productId}`)
            .then((response) => {
                setProduct(response.data);
                setSelectedImage(response.data.images[0]);  // Set the first image as default
            })
            .catch((error) => console.error("Error fetching product:", error));

        // Check if the user is logged in
        const userEmail = localStorage.getItem("UserEmail");
        if (userEmail) {
            setIsLoggedIn(true);
        }
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            alert("Please log in to add items to your cart.");
            return;
        }

        const email = localStorage.getItem("UserEmail");
        const productId = product._id;
        const quantity = 1; // Default to 1 item for simplicity

        axios.post("http://localhost:3000/cart/add", { email, productId, quantity })
            .then(response => {
                alert("Item added to cart successfully!");

                // Set a timeout to refresh the page after 1 second
                setTimeout(() => {
                    window.location.reload(); // This will reload the page
                }, 1000); // Adjust the timeout as needed (in milliseconds)
            })
            .catch(error => {
                console.error("Error adding to cart:", error);
                alert("Failed to add item to cart.");
            });
    };

    return (
        <div>
            <Navbar />
            <div id="productParentDiv">
                <ImageSelector images={product.images} onSelectImage={setSelectedImage} />
                <ActualImage src={selectedImage} />
                <ProductDescription
                    name={product.name}
                    description={product.description}
                    highlights={product.highlights}
                    brand={product.brand}
                />
                <ProductPriceDetails
                    price={product.price}
                    stock={product.stock}
                    handleAddToCart={handleAddToCart}
                />
            </div>
            <Footer />
        </div>
    );
}

function ImageSelector({ images, onSelectImage }) {
    return (
        <div id="imageSelector">
            {images.map((imgSrc, index) => (
                <ToggleImage key={index} src={imgSrc} onClick={() => onSelectImage(imgSrc)} />
            ))}
        </div>
    );
}

function ToggleImage({ src, onClick }) {
    return (
        <div id="toogleImg" onClick={onClick}>
            <img src={src} alt="Product Preview" />
        </div>
    );
}

function ActualImage({ src }) {
    return (
        <div id="actualImg">
            <img src={src} alt="Main Product" />
        </div>
    );
}

function ProductDescription({ name, description, highlights, brand }) {
    return (
        <div id="prodDes">
            <div className="prodName">{name}</div>
            <div className="prodSmallText">{brand}</div>
            <div className="prodHeader">Product Highlights</div>
            <div className="prodBullets">
                <ul>
                    {highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                    ))}
                </ul>
            </div>
            <div className="prodDescription">{description}</div>
        </div>
    );
}

function ProductPriceDetails({ price, stock, handleAddToCart }) {
    return (
        <div id="prodPriceDetails">
            <div id="prodPriceBullet">₹{price}</div>
            <div id="stockInfo">In Stock: {stock}</div>
            <button id="addToCartBtn" onClick={handleAddToCart}>
                Add To Cart
            </button>
        </div>
    );
}
