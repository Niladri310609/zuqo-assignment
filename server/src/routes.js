const express = require("express");
const { SignUpUser, loginUser } = require("./controller");
const router = express.Router();

router.post("/agent/signup", SignUpUser)
router.post("/agent/login", loginUser);






router.all("/*", function (req, res) {
    res
      .status(406)
      .send({ status: false, message: "The api you requested is not available" });
  });
  
  module.exports = router;