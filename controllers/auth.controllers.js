// get the body
// check if user with email exist already
// hash the password
// create verificationToken
// save the user with that verificiaitonToken and its expiresDate of 7 days from now
// create a jwt auth token for cookie with saved user._id;
// save the user if not in db
import bcrypt from "bcryptjs";

import { User } from "../backend/models/user.models.js";
import { generateTokenAndSetCookie } from "../backend/utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../backend/mailTrap/emails.js";
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields required!");
    }

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ message: "User with the email already exist!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // random token betweeen 1 to 100000(inclusive)
    const verificationToken = (
      Math.floor(Math.random() * 10000) + 1
    ).toString();

    // structure the user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60, // 24 hours time limit
    });

    // save the user
    await user.save();

    // set the jwt auth token to response cookie
    generateTokenAndSetCookie(res, user._id);

    // send the verification code to email
    sendVerificationEmail(user.email, verificationToken);

    // return the response
    res.status(201).json({
      success: true,
      message: "User Created Successfully!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("/login Route");
};

export const logout = async (req, res) => {
  res.send("/logout Route");
};
