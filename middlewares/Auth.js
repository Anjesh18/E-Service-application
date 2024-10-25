import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res
        .status(404)
        .json({ message: "Token not available", success: false });
    }
    const decode=await jwt.verify(token, 'secret123')
    req.id=decode.userId
    next()
  } catch (error) {
    return res.status(400).json({message:error.message,success:false})
  }
};
