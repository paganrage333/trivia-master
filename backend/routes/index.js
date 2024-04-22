const express = require("express");
const router = express.Router();
const AuthRouter  = require('./auth')
const questionRouter  = require('./question')
const usersRouter  = require('./users')
router.use("/auth", AuthRouter);
router.use("/question", questionRouter);
router.use("/users", usersRouter);
module.exports = router;