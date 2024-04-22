const jwt = require("jsonwebtoken");


exports.createJwtToken = (payload) => {
  console.log("payload", payload);
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET_STRING || "Om%:DG*aU4;6o5;@[zov5l4=NB1vZJ",
    { expiresIn: "5d" }
  );
  return token;
};

exports.verifyJwtToken = (token, next) => {
  try {

    const { UserID} = jwt.verify(
      token,
      process.env.JWT_SECRET_STRING || "Om%:DG*aU4;6o5;@[zov5l4=NB1vZJ"
    );
    console.log(UserID)
    return {UserID};
  } catch (err) {
    next(err);
  }
};
