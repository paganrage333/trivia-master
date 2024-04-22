const express = require("express");
const router = express.Router();
const UsersController = require("../../controller/users/index");

const APIAuth = require("../../middlewares/jwt_auth");
 
 router.post("/UpdateEmail",APIAuth,UsersController.UpdateEmail);
 router.post("/UpdateProfile",APIAuth,UsersController.UpdateProfile);
 router.get("/getProfile",APIAuth,UsersController.getProfile);
 router.get("/getReport",APIAuth,UsersController.getReport);
module.exports = router;