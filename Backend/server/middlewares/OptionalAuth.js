import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    req.userId = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
  } catch (err) {
    // Invalid token → treat as unauthenticated
    req.userId = null;
  }

  next();
};

export default optionalAuth;
