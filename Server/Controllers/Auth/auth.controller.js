import bcrypt from "bcryptjs";
import User from "../../Models/User.model.js";
import jwt from "jsonwebtoken";

//Register Controller
export const Register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(404).json({
        success: false,
        message: "User already exists with the same email. Please try again",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

//Login Controller
export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(404).json({
      success: false,
      message: "Email field is required",
    });
  }

  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(401).json({
        success: false,
        message: "Email not logged In. Please Register",
      });
    }

    const verify = await bcrypt.compare(password, findUser.password);
    if (!verify) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const jwtToken = jwt.sign(
      {
        id: findUser._id,
        role: findUser.role,
        email: findUser.email,
      },
      process.env.CLIENT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );

    res
      .cookie("token", jwtToken, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "Logged in successfully",
        userInfo: {
          email: findUser.email,
          userName: findUser.userName,
          role: findUser.role,
          id: findUser._id,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};
