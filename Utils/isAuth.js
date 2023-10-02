const JWT = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return res
        .status(401)
        .json({ success: false, status: 401, error: "token not found" });
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode.id;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, status: 500, error: error.message });
  }
};
