const express = require("express");
const app = express();
const userModel = require("../models/user.models");
const userRoutes = express.Router();
const bcrypt = require('bcrypt');

app.use(express.json());

userRoutes.get("/list", async (req,res)=>{
    let data = await userModel.find();
    res.json({msg: "List of Users", data: data});
});


userRoutes.post("/addUser", async (req,res) => {
    
    try {
        let {name,email,password} = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
        const newUser = new userModel({...req.body,password:hashPassword });
        const savedUser = await newUser.save();
        res.status(201).send("User Created and Saved");
    } catch (error) {
        res.status(400).json(error);
    }
});

userRoutes.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send("User Not Found!!!");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).send("Invalid Password!!!");
        }

        res.status(201).json({
            msg: "Login Successful",
            userId: user._id,
            userName: user.name,
            email: user.email
        });

    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = userRoutes;
