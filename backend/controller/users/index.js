const sendEmail = require("../../utils/emailservice");
const UserReport = require("../../models").UserReports
const Users = require("../../models").Users

exports.UpdateProfile = async (req, res, next) => {
    try {
      
      let userDetail = req.body
        delete userDetail.Email
        delete userDetail.UserID
      
      let exist = await Users.findOne({ where: { UserID:res.locals.user.UserID} });

      if (!exist) {  
          
          return res.json({
            status: 200,
            success: false,
            msg: "Invalid User",
          });
        }
        
      

          
        await Users.update({...userDetail},{ where: { UserID:res.locals.user.UserID } });
        let user = await Users.findOne({ where: { UserID:res.locals.user.UserID} });
        delete user.dataValues.Password
        delete user.dataValues.Token
        delete user.dataValues.TokenExpired
        return res.json({
            status: 200,
            success: true,
            data:user,
            msg: "User updated successfully",
          });
     
    } catch (error) {
      next(error);
    }
  };  
exports.UpdateEmail = async (req, res, next) => {
    try {
      
      let userDetail = req.body
      
      let exist = await Users.findOne({ where: { UserID:res.locals.user.UserID} });

      if (!exist) {  
          
          return res.json({
            status: 200,
            success: false,
            msg: "Invalid User",
          });
        }
      if (exist.dataValues.Email == userDetail.Email) {  
          
          return res.json({
            status: 200,
            success: false,
            msg: "Same Email",
          });
        }
        
      
         await Users.update({...userDetail,VerifiedEmail:false},{ where: { UserID:res.locals.user.UserID} });
        let user = await Users.findOne({ where: { UserID:res.locals.user.UserID} });
        
         sendEmail({user:user,emailType:"otp"}) 
        return res.json({
            status: 200,
            success: true,
            msg: "Please verify you Email",
          });
     
    } catch (error) {
      next(error);
    }
  };  
exports.getProfile = async (req, res, next) => {
    try {
      
      
      
      let exist = await Users.findOne({ where: { UserID:res.locals.user.UserID} });

      if (!exist) {  
          
          return res.json({
            status: 200,
            success: false,
            msg: "Invalid User",
          });
        }
     
        return res.json({
            status: 200,
            success: true,
            data:exist,
          });
     
    } catch (error) {
      next(error);
    }
  }; 
  exports.getReport = async (req, res, next) => {
    try {
      
      
      
      let exist = await UserReport.findAll({ where: { UserID:res.locals.user.UserID} });


     
        return res.json({
            status: 200,
            success: true,
            data:exist,
          });
     
    } catch (error) {
      next(error);
    }
  };   