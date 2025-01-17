const JWT = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  try {
    let accessToken  = req.headers["authorization"]
     if (!accessToken)
      return res
        .status(401)
        .json({ success: false, status: 401, error: "Please login to use this feature" });
    
    const decode = JWT.verify(accessToken, process.env.JWT_SECRET);
    req.user = decode.id;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, status: 500, error: error.message });
  }
}; 
