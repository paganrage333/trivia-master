const sendEmail = require("../../utils/emailservice");
const { createJwtToken } = require("../../utils/token");
const bcrypt = require('bcrypt')

const Users = require("../../models").Users

const moment =require('moment')

exports.login = async (req, res, next) => {
    try {
      let password = req.body.Password.trim()
      let user_email = req.body.Email.trim();
      let user = await Users.findOne({ where: { Email: user_email } });
      if (user) {
        
        console.log(password, user,"ssssssssssss");
        let compare = await bcrypt.compare(password, user.Password);
        if (compare) {
            if(user.VerifiedEmail != true){
                return res.json({
                    status: 201,
                    success: false,
                    msg: "Please Verify your email first",
                  }); 
            }
  
          const token = createJwtToken({UserID:user.UserID,Email:user.Email})
          return res.json({
            data: user,
            token,
            status: 200,
            success: true,
            msg: "Logged in successfully",
          });
        } else {
          return res.json({
            status: 201,
            success: false,
            msg: "Invalid password",
          });
        }
      } else {
        return res.json({
          status: 201,
          success: false,
          msg: "Invalid email",
        });
      }
    } catch (error) {
      next(error);
    }
  };  
exports.register = async (req, res, next) => {
    try {
      
      let {UserName,Email,Password}  = req.body
      console.log(Password)
      let user = await Users.findOne({ where: { Email: Email } });
      if (user) {  
          
          return res.json({
            status: 200,
            success: false,
            msg: "User already exist",
          });
        }
        let  userDetail = {UserName,Email}
        let salt = await bcrypt.genSalt(10);
        userDetail.Password = await bcrypt.hash(Password, salt);
        console.log(userDetail)
        
        let newUser = await Users.create({...userDetail})
        console.log(newUser)
        sendEmail({user:newUser,emailType:'otp',})

        return res.json({
            status: 200,
            success: true,
            msg: "registered successfully",
          });
     
    } catch (error) {
      next(error);
    }
  };  
exports.VerifyMail = async (req, res, next) => {
    try {
      
      let token = req.params.token
      console.log(token)
      let user = await Users.findOne({ where: { Token: token } });

      if (!user) {  
          
          return res.json({
            status: 200,
            success: false,
            msg: "Invalid Token",
          });
        }
        console.log(user.TokenExpired)
       if(moment().isAfter(user.TokenExpired)){
        return res.json({
            status: 200,
            success: false,
            Expired :true,
            msg: "Token Expired",
          });
       }

          
        await Users.update({Token:null,TokenExpired:null,VerifiedEmail:true},{ where: { Token: token } });
      
        
        delete user.dataValues.Password
        delete user.dataValues.Token
        delete user.dataValues.TokenExpired
        return res.json({
            status: 200,
            success: true,
            msg: "Email verifed successfully",
          });
     
    } catch (error) {
      next(error);
    }
  };  
exports.reSendMail = async (req, res, next) => {
    try {
      
      let token = req.params.token
      let user = await Users.findOne({ where: { Token: token } });
      if (!user) {  
          
          return res.json({
            status: 200,
            success: false,
            msg: "Invalid Token",
          });
        }
       

          sendEmail({user,emailType:"otp"})
        return res.json({
            status: 200,
            success: true,
            msg: "Email sent",
          });
     
    } catch (error) {
      next(error);
    }
  };  
