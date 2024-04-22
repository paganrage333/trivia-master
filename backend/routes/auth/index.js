const express = require("express");
const router = express.Router();
const AuthController = require("../../controller/auth/index");


router.post("/login",AuthController.login);
router.post("/register",AuthController.register);
router.get("/VerifyMail/:token",AuthController.VerifyMail);
router.get("/reSendMail/:token",AuthController.reSendMail);

module.exports = router;