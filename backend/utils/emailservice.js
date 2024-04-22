var nodemailer = require("nodemailer");
const moment = require("moment");
const {v4 :uuidv4} = require("uuid");
const { read, readFileSync } = require("fs");
const Users = require("../models").Users

const sendEmail = async ({user, mailContent, emailType}) => {
  if (emailType === "otp") {
    var TokenExpired = moment().add(5,'minute')
    let Token = uuidv4()
    let up = await Users.update(
      { Token,TokenExpired },
      { where: { UserID: user.UserID } }
    );
    console.log(up)
    let Content = readFileSync(
      __dirname + "/../views/EmailTempletes/otp.ejs",
      "utf8"
    );
    
    Content = Content.replace("${token}", Token);
    Content = Content.replace("${userName}", user.UserName);
    Content = Content.replace("${link}", `${process.env.BASE_URL}/verify/${Token}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.MAIL_ID,
      to: user.Email,
      subject: "Verify Email",
      html: Content,
    };
    console.log(mailOptions)
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email Send>>>>>>>>>>>>>>>>>>>>");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
 
  else {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });
    let mailOptions = {
      from: process.env.MAIL_ID,
      to: user.Email,
      subject: mailContent.subject,
      html: mailContent.fileContantent,
    };
    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      return false;
    }
  }
};
module.exports = sendEmail;
