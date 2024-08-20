import User from "../modals/user.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const Register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(createError(400, "All fields are required!"));
    }

    if (password.length < 4) {
      return next(
        createError(400, "Password should be atleast 4 charaacters long.")
      );
    }

    const user = await User.findOne({ email });
    if (user) {
      return next(createError(409, "User with this email already exists!"));
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
    });

    if (newUser) {
      res.status(201).json({ message: "Used created successfully!" });
    } else {
      next(createError(500, "Something went wrong!"));
    }
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "All fields are required!"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(400, "User with this email does not exist!"));
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);

    const token = generateToken(user?._id);

    if (isPassCorrect) {
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        sameSite: "none",
        secure: true,
      });
    }

    if (user && isPassCorrect) {
      const { password, ...details } = user._doc;
      res.status(200).json(details);
    } else {
      return next(createError(400, "Invalid credentials!"));
    }
  } catch (error) {
    next(error);
  }
};

export const Logout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    next(error);
  }
};
