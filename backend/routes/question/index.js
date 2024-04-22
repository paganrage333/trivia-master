const express = require("express");
const router = express.Router();
const QueController = require("../../controller/question/index");

 const APIAuth = require("../../middlewares/jwt_auth");

 router.post("/getQuestionByCat",APIAuth,QueController.getQuestionByCat);
 router.post("/ViewQuestion",APIAuth,QueController.ViewQuestion);
 router.get("/getQuestion",APIAuth,QueController.getQuestion);
 router.post("/AddUpdateQuestion",APIAuth,QueController.AddUpdateQuestion);
 router.post("/deleteQuestion",APIAuth,QueController.deleteQuestion);
module.exports = router;