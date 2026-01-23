import jwt from "jsonwebtoken";

const Userauth = (req, res, next) => {

  

  try {
    const token = req.cookies.token;



    if (!token) {
      return res.status(401).json({ success: false });  
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.userId = decoded.userId;


    next(); // ALWAYS pass control forward
  } catch (error) {

    
    
    return res.status(401).json({ success: false });
  }
};

export default Userauth;
