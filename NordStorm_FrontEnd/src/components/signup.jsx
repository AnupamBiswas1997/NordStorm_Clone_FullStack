import React from 'react';
import '../styles/signupStyle.css';
import LoginPageImg1 from "../assets/LoginPageImg1.png";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export const Signup = () => { 

    let navigate = useNavigate();

    async function handleSignupSubmit(e) {
        e.preventDefault();

        const obj = {
            name: e.target.Username.value,
            email: e.target.Email.value,
            password: e.target.Password.value,
        };

        try {
            const response = await axios.post("http://localhost:3000/users/addUser", obj);
            alert("User Signed Up Successfully");
            navigate("/login");
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Error signing up. Please try again.");
        }
    }

    return (
        <div id='SignupPage'>
            <div id='ImageDiv'>
                <img src={LoginPageImg1} alt="Signup Illustration" />
            </div>
            <div id='SignupForm'>
                <div id='SignupBoldText'>Signup</div>
                <div id='SignupsmallText'>Get Exclusive discounts, Easily tracked deliveries and returns, Speedy checkout</div>
                <form onSubmit={handleSignupSubmit}>
                    <input type="text" id="signupUsername" name='Username' placeholder='Enter Name ' required />
                    <input type="email" id="signupEmail" name='Email' placeholder='Enter Email ID' required />
                    <input type="password" id='signupPassword' name='Password' placeholder='Enter Password' required />
                    <input type="submit" value="Signup" id='SignupSubmit' />
                </form>
                <div id='SignupsmallText'>Existing User? <Link to="/login"><u>Login Here</u></Link></div>
            </div>
        </div>
    );
};
