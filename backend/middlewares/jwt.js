import User from "../modals/user.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ message: "Token not found!" });
    }

    const isTokenVerified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(isTokenVerified.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(403).json({ message: "Not authenticated!" });
  }
};
