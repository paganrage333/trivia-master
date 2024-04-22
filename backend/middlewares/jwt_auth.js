const Users = require("../models").Users;
const {
  AUTH_TOKEN_MISSING_ERR,
  AUTH_HEADER_MISSING_ERR,
  JWT_DECODE_ERR,
  USER_NOT_FOUND_ERR,
} = require("../utils/error/errors");
const { verifyJwtToken } = require("../utils/token");
module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    console.log("header", header);
    if (!header) {
      next({
        status: 200,
        authRequired: true,
        message: AUTH_HEADER_MISSING_ERR,
      });
      return;
    }
    const token = header.split("Bearer ")[1];
    if (!token) {
      next({
        status: 200,
        authRequired: true,
        message: AUTH_TOKEN_MISSING_ERR,
      });
      return;
    }
    const {UserID} = verifyJwtToken(token, next);
    if (!UserID) {
      next({ status: 200, authRequired: true, message: JWT_DECODE_ERR });
      return;
    }
    // console.log("user88888*******************", userId);
    const user = await Users.findOne({
      where: {
        UserID: UserID,
      },
    });
    if (!user) {
      next({ status: 200, authRequired: true, message: USER_NOT_FOUND_ERR });
      return;
    }
    res.locals.user = user;
    next();
  } catch (err) {
    console.log('first')
    next(err);
  }
};
