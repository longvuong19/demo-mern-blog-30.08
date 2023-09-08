import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Unauthorized!");
  jwt.verify(token, process.env.SECRET, async (error, data) => {
    if (error) return res.status(403).json("Invalid token!");
    req.userId = data._id;
    next();
  });
};

export default verifyToken;
