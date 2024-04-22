const { Op } = require("sequelize");

const Users = require("../../models").Users
const Questions = require("../../models").Questions
const UserReport = require("../../models").UserReports
exports.AddUpdateQuestion = async (req, res, next) => {
    try {
      
      let data = {...req.body}
        delete  data.QuestionID
        let QuestionID = req.body.QuestionID

      console.log(req.body)
     

     if(QuestionID){
        console.log('called')
        await   Questions.update({...data},{
            where:{QuestionID}
        })
        let que = await Questions.findOne({where:{QuestionID}})
        return res.json({
            status: 200,
            success: true,
            data:que,
            msg: "Question updated successfully",
          });
     }else{
        let que = await Questions.create({...data,UserID:res.locals.user.UserID})
        return res.json({
            status: 200,
            success: true,
            data:que,
            msg: "Question added successfully",
          });
     }
       
     
    } catch (error) {
      next(error);
    }
  };  
  exports.deleteQuestion = async (req, res, next) => {
    try {
      
    
        let QuestionID = req.body.QuestionID

      
        let que = await Questions.destroy({Where:{QuestionID}})
        return res.json({
            status: 200,
            success: true,
            data:que,
            msg: "Question updated successfully",
          });
       
     
    } catch (error) {
      next(error);
    }
  };  
  exports.ViewQuestion = async (req, res, next) => {
    try {
      
    
        let QuestionID = req.body.QuestionID
        let view= req.body.view

      if(QuestionID && QuestionID.length>0){

        var que = await Questions.update({viewed:view},{where:{QuestionID:{[Op.in]:QuestionID}}})
      }
        await UserReport.create({
          no_of_question:QuestionID.length,
          category:req.body.category,
          UserID:res.locals.user.UserID,
          no_of_question:req.body.no_of_question

        })
        return res.json({
            status: 200,
            success: true,
            data:que,
            msg: "Question updated successfully",
          });
       
     
    } catch (error) {
      next(error);
    }
  };  
  exports.getQuestion = async (req, res, next) => {
    try {
      
    
        

      
     
        let que = await Questions.findAll({
            where:{UserID:res.locals.user.UserID,showUser:true}
        })
        
        return res.json({
            status: 200,
            success: true,
            data:que,
          });
       
     
    } catch (error) {
      next(error);
    }
  };  
  exports.getQuestionByCat = async (req, res, next) => {
    try {
        let data = req.body
        let que = await Questions.findAll({
            where:{UserID:res.locals.user.UserID,...data}
        })
        
        return res.json({
            status: 200,
            success: true,
            data:que,
          });
       
     
    } catch (error) {
      next(error);
    }
  };  

