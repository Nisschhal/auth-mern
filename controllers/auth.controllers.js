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
import {
  sendVerificationEmail,
  sendWelcomEmail,
} from "../backend/mailTrap/emails.js";

// SIGN UP LOGIC: get the data, verify the data, create a email verfication code, save the user with that code, create and set jwt auth token on cookie, send the verification email to the user
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
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours time limit
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

// VERIFY THE EMAIL: check the user with that code and its expiry date, remove the verficationToken from the user, set isVerified to true, send the welcome email
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  console.log(code);
  console.log(Date.now());
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    console.log(user);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Code!!" });

    // update the user verified fields
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // send the welcome email
    await sendWelcomEmail(user.email, user.name);

    // AFTER ALL DONE SEND THE RESPONSE
    res.status(201).json({
      success: true,
      message: "User verified Successfully!",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log(`Error while verifying email ${error}`);
  }
};
// export const verifyEmail = async (req, res) => {
//   const { code } = req.body;
//   console.log("Verification code:", code);

//   try {
//     // Check the current timestamp
//     const currentTime = Date.now();
//     console.log("Current timestamp:", currentTime);

//     // Construct the query
//     const query = {
//       verificationToken: code,
//       verificationTokenExpiresAt: { $gt: currentTime },
//     };
//     console.log("Query:", query);

//     // Find the user
//     const user = await User.findOne(query);
//     console.log("User found:", user);

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invalid Code!!" });
//     }

//     // Update the user
//     user.isVerified = true;
//     user.verificationToken = undefined;
//     user.verificationTokenExpiresAt = undefined;
//     await user.save();

//     // Send the welcome email
//     await sendWelcomEmail(user.email, user.name);

//     res.status(201).json({
//       success: true,
//       message: "User verified Successfully!",
//       user: { ...user._doc, password: undefined },
//     });
//   } catch (error) {
//     console.log(`Error while verifying email ${error}`);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
