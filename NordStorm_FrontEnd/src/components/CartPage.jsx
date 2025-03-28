import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import "../styles/cartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart details
  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = () => {
    const userEmail = localStorage.getItem("UserEmail");

    if (userEmail) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/cart/${userEmail}`)
        .then((response) => {
          setCart(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
          setError("Failed to fetch cart data. Please try again later.");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("User email not found. Please log in.");
    }
  };

  // Handle item removal with setTimeout
  const removeFromCart = (productId) => {
    const userEmail = localStorage.getItem("UserEmail");

    if (userEmail) {
      axios
        .delete("http://localhost:3000/cart/remove", {
          data: { email: userEmail, productId },
        })
        .then(() => {
          // Delay the cart refresh
          setTimeout(() => {
            fetchCartData(); // Refresh the cart after removal
          }, 500); // 500ms delay
        })
        .catch((error) => {
          console.error("Error removing item:", error);
        });
    }
  };

  if (loading) return <div className="loadingMessage">Loading...</div>;
  if (error) return <div className="errorMessage">{error}</div>;

  // Empty cart message
  if (!cart || !cart.productList || cart.productList.length === 0)
    return (
      <div>
        <Navbar />
        <div className="emptyCartContainer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="Empty Cart"
            className="emptyCartImage"
          />
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven’t added anything to your cart yet.</p>
          <a href="/" className="shopNowButton">
            Shop Now
          </a>
        </div>
        <Footer />
      </div>
    );

  const totalPrice = cart.productList.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <div>
      <Navbar />
      <div className="cartContainer">
        <h2>Your Cart</h2>
        <ul>
          {cart.productList.map((item, index) => (
            <li key={index} className="cartItem">
              <img
                src={item.product?.images?.[0] || "https://via.placeholder.com/120"}
                alt={item.product?.name || "Product"}
                className="cartImage"
              />
              <div className="cartDetails">
                <h3>{item.product?.name || "Unknown Product"}</h3>
                <p>{item.product?.description || "No description available."}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.product?.price || 0}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="removeButton"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="cartTotal">
          <strong>Total: ₹{totalPrice}</strong>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
