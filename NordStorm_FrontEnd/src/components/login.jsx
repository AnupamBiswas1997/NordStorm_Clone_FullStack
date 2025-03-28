import React from "react";
import "../styles/loginStyle.css";
import LoginPageImg1 from "../assets/LoginPageImg1.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        localStorage.clear();

        const credentials = {
            email: e.target.UsernameEmail.value,
            password: e.target.Password.value,
        };

        try {
            const response = await axios.post("http://localhost:3000/users/login", credentials);

            if (response.status === 201) {
                // Store the user ID, name, and email in localStorage
                localStorage.setItem("UserID", response.data.userId); // Store UserID (email)
                localStorage.setItem("UserName", response.data.userName); // Store UserName
                localStorage.setItem("UserEmail", response.data.email); // Store email as UserEmail

                alert("Login Successful!");
                navigate("/"); // Navigate to the homepage or dashboard
            }
        } catch (error) {
            if (error.response?.status === 404) {
                alert("User Not Found!");
            } else if (error.response?.status === 400) {
                alert("Invalid Password!");
            } else {
                alert("An unexpected error occurred!");
            }
            console.error("Login Error:", error);
        }
    };

    return (
        <div id="LoginPage">
            <div id="ImageDiv">
                <img src={LoginPageImg1} alt="Login Page" />
            </div>
            <div id="LoginForm">
                <div id="LoginBoldText">Login</div>
                <div id="LoginsmallText">
                    Get Exclusive discounts, Easily tracked deliveries and returns, Speedy checkout
                </div>
                <form onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        id="loginUsernameEmail"
                        name="UsernameEmail"
                        placeholder="Enter Email ID"
                        required
                    />
                    <input
                        type="password"
                        id="loginPassword"
                        name="Password"
                        placeholder="Enter Password"
                        required
                    />
                    <input type="submit" value="Login" id="LoginSubmit" />
                </form>
                <div id="LoginsmallText">
                    New User? <Link to="/signup"><u>Signup Here</u></Link>
                </div>
            </div>
        </div>
    );
};
