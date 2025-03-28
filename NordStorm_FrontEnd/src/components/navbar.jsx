import "../styles/navbarstyle.css";
import { Link, useNavigate } from "react-router-dom";
import logoAsos1 from "../assets/logoNordStorm.PNG";
import { useEffect, useState } from "react";
import axios from "axios";

export function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    const storedUserName = localStorage.getItem("UserName");
    if (storedUserName) {
      setUserName(storedUserName);
      fetchCartData();
    }
  }, []);

  const fetchCartData = async () => {
    const userEmail = localStorage.getItem("UserEmail");
    if (userEmail) {
      try {
        setLoadingCart(true);
        const response = await axios.get(`http://localhost:3000/cart/${userEmail}`);
        const cart = response.data.data;
        setCartItems(cart.productList || []);
        const total = (cart.productList || []).reduce(
          (sum, item) => sum + (item.product?.price || 0) * item.quantity,
          0
        );
        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoadingCart(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserName(null);
    navigate("/");
  };

  const handleCartClick = () => {
    if (userName) {
      navigate("/cart"); // Navigate to the private cart page if user is authenticated
    } else {
      navigate("/login"); // Redirect to login if user is not authenticated
    }
  };

  return (
    <div id="Navbar">
      {/* Logo */}
      <div id="Nav1stSeg">
        <div>
          <Link to="/">
            <img src={logoAsos1} alt="asosLogo" />
          </Link>
        </div>
      </div>

      {/* Navigation Sections 
      <div id="Nav2ndSeg">
        <div className="navText">WOMEN</div>
        <div className="navText">MEN</div>
      </div>
      */}
      
      {/* Search Bar */}
      <div id="Nav3rdSeg">
        <div>
          <SearchComp />
        </div>
      </div>

      {/* User Section */}
      <div id="Nav4thSeg">
        {/* User Icon */}
        <div className="icon personIcon">
          <div className="material-symbols-outlined">person</div>
          {userName && <div className="userName">{userName}</div>}
          <div className="UserOverlay">
            {userName ? (
              <div className="menuItem">
                <button onClick={handleLogout} className="logoutButton">
                  Logout
                </button>
              </div>
            ) : (
              <div className="LoginSignup">
                <div className="SignIn">
                  <Link to="/login">Sign In</Link>
                </div>
                <div className="Register">
                  <Link to="/signup">Join</Link>
                </div>
              </div>
            )}
            <div className="menuItem2">
              <div>My Account</div>
              <div>My Orders</div>
              <div>Returns</div>
              <div>Contact Preferences</div>
            </div>
          </div>
        </div>

        {/* Favorite Icon */}
        <div className="icon">
          <span className="material-symbols-outlined">favorite</span>
        </div>

        {/* Cart Icon */}
        <div className="icon cartIcon" onClick={handleCartClick}>
          <span className="material-symbols-outlined">shopping_bag</span>
          <div className="CartOverlay">
            {loadingCart ? (
              <div className="loadingCart">Your cart is empty!</div>
            ) : cartItems.length > 0 ? (
              <div className="cartDetails">
                {cartItems.map((item, index) => (
                  <div className="cartItem" key={index}>
                    <div>{item.product?.name || "Unknown Item"}</div>
                    <div>
                      {item.quantity} x ₹{item.product?.price || 0}
                    </div>
                  </div>
                ))}
                <div className="cartTotal">
                  <strong>Total:</strong> ₹{totalPrice}
                </div>
              </div>
            ) : (
              <div className="emptyCart">Your cart is empty!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchComp() {
  return (
    <div id="searchbarbox">
      <input type="text" placeholder="Search for items and brands" id="SearchText" />
      <button>
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
}
