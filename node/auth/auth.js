const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "不存在token" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.auth = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "token无效" });
    }
  }
}
module.exports=authenticateToken;
