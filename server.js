const express = require("express");
require("dotenv").config();
const {isValid,
    isValidRequestBody,
    isValidName,
    isValidEmail,
    isValidPassword,} = require('./validation')
const app = express();
const CryptoJs = require("crypto-js")
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const MONGO_URI = process.env.MONGO_URI;

const PORT = 7001;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  
    next();
  });
  
  app.use(
    cors({
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  );
  
  app.use(bodyParser.json());
  app.use(multer().any())


  app.use(bodyParser.urlencoded({ extended: true }));

  mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true  })
 .then(() => console.log("Mongodb connected"))
 .catch((err) => console.log(err));

 const UserSchema = new mongoose.Schema({
    firstName: {type:String,required:true, trim: true},
    lastName: {type:String, required:true,trim: true},
    email: {type:String, required:true, unique:true,trim: true},
    password:{type:String, required:true, unique:true,trim: true}, 
    
 } ,{timestamps:true});
  
 const UserModel = mongoose.model('User', UserSchema);


app.post('/agent/signup', async(req,res)=>{
    try {
        // ====================================== Destructuring the request Body ======================================
    
        let { firstName, lastName, email, password } = req.body;
        //============================================validations for inputs================================
    
        if (!isValidRequestBody(req.body)) {
          return res
            .status(406)
            .send({ status: false, message: "Input Data for Creating User" });
        }
      
    
        if (Object.keys(req.body).length == 0) {
          return res
            .status(406)
            .send({ status: false, message: "Input field cannot be empty" });
        }
    
        if (firstName == "") {
          return res
            .status(406)
            .send({ status: false, message: "fname cannot be empty" });
        }
    
        if (!isValid(firstName)) {
          return res
            .status(406)
            .send({ status: false, message: "firstName is required..." });
        }
        if (!isValidName(firstName))
          return res
            .status(406)
            .send({ status: false, message: "Please Enter a valid First Name" });
    
        if (lastName == "") {
          return res
            .status(406)
            .send({ status: false, message: "lname cannot be empty" });
        }
    
        if (!isValid(lastName)) {
          return res
            .status(406)
            .send({ status: false, message: "lastName is required..." });
        }
        if (!isValidName(lastName))
          return res
            .status(406)
            .send({ status: false, message: "Please Enter a valid last Name" });
    
        if (email == "") {
          return res
            .status(406)
            .send({ status: false, message: "email cannot be empty" });
        }
    
        if (!isValid(email)) {
          return res
            .status(406)
            .send({ status: false, message: "Email is required" });
        }
        if (!isValidEmail(email)) {
          return res
            .status(406)
            .send({ status: false, message: "Please enter a valid email" });
        }
    
        const isRegisteredEmail = await UserModel.findOne({ email: { $regex: new RegExp(email, 'i') } });
  
            if (isRegisteredEmail) {
          return res
            .status(403)
            .send({ status: false, message: "email id already registered" });
        }
    
        if (!isValid(password)) {
          return res
            .status(406)
            .send({ status: false, message: "Password is required" });
        }
        if (!isValidPassword(password)) {
          return res.status(406).send({
            status: false,
            message: "password is invalid",
          });
        }
        if (password == "" || password.toString().trim().length < 8) {
          return res.status(406).send({
            status: false,
            message: "Your password must be at least 8 characters",
          });
        }
    
        if (password.toString().trim().length > 15) {
          return res.status(406).send({
            status: false,
            message: "Password cannot be more than 15 characters",
          });
        }
    
        const hashedPassword = CryptoJs.SHA256(password).toString();
  
        req.body.password = hashedPassword;
    
    
        const userCreated = await UserModel.create(req.body);
    
        if (userCreated) {
          // sendVerifyMail(firstName, email, userCreated._id);
    
          res.status(201).send({
            status: true,
            message: "Sign up is successfully done, Welcome!",
            data: userCreated,
          });
        } else {
          res
            .status(406)
            .send({ status: false, message: "User registration has been failed" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, error: err.message });
      }
})

app.post('/agent/login', async(req,res)=>{
    try {
        let requestBody = req.body;
        const email = req.body.email?.trim()
        const password = req.body.password?.trim()
    
    
    
    
        // Validation starts
    
        if (!isValidRequestBody(requestBody)) {
          return res
            .status(400)
            .send({ status: false, message: "Please enter login credentials" });
        }
    
        if (!isValid(email)) {
          return res.status(400).send({ status: false, message: "Enter an email" });
        }
    
        if (!isValidEmail(email)) {
          return res.status(406).send({
            status: false,
            message: `Email should be a valid email address`,
          });
        }
    
        if (!isValid(password)) {
          res.status(400).send({ status: false, message: "enter a password" });
          return;
        }
    
        if (!(password.length >= 8 && password.length <= 15)) {
          return res.status(400).send({
            status: false,
            message: "Password should be Valid min 8 and max 15 ",
          });
        }
        // ===============================================Encrypting the password && create Token=============================
    
        const user = await UserModel.findOne({email: email });
        if (!user) {
          return res.status(401).send({
            status: false,
            message: `Invalid login credentials, email id doesn't exist`,
          });
        }
    
        let hashedPassword = user.password;
        let enteredPasswordHash = CryptoJs.SHA256(password).toString();
  
    
        const checkPassword = hashedPassword === enteredPasswordHash
    
        if (!checkPassword)
          return res.status(401).send({
            status: false,
            message: `Invalid login credentials , Invalid password`,
          });
    
        const token = jwt.sign(
          {
            userId: user._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 168 * 60 * 60,
          },
          `${process.env.JWT_SECRET_KEY}`
        );
    
        res.status(200).send({
          status: true,
          messsge: "User Login Successful",
          data: { userId: user, token: token },
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, error: error.message });
      }
})

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  