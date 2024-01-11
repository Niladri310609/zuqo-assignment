const express = require("express");
require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");
const route = require("./routes")
const cors = require("cors");
const multer = require('multer');
const mongoose = require("mongoose");
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



  app.use("/", route);


  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  
