import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { isAuth, isAdmin, generateToken } from "../utils.js";
import sendMail from "../sendMail.js";
import crypto from "crypto";

const userRouter = express.Router();

userRouter.post(
  "/forgot",
  expressAsyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send({ message: "User not found with this email" });
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({
      validateBeforeSave: false,
    });
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
    const message = `Hello ${user.name}, \n\n Someone has requested to reset password for your Amazona Account, If that is you click the link below to reset your password. \n\n ${resetPasswordUrl}\n\n If you have not requested this email, then please ignore and DO NOT share it. \n \n Thank you for shopping with Amazona`;
    try {
      await sendMail({
        email: user.email,
        subject: `Amazona Password Recovery`,
        message,
      });

      res.send({
        message: `Email sent. Check your Email to reset your password`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({
        validateBeforeSave: false,
      });
      console.log(error);

      res.send({
        message: "Error Occured",
      });
    }
  })
);

// reset password
userRouter.put(
  "/password/reset/:token",
  expressAsyncHandler(async (req, res) => {
    try {
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user) {
        return res
          .status(404)
          .send({ message: "Invalid or expired Token/url" });
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      return;

      // await user.save();
    } catch (error) {
      console.log(error);
    }
  })
);
//

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }

        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser),
        });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(404).send({ message: "Another user has such email" });
    }
  })
);

userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      await user.remove();
      res.send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const user1 = await User.findOne({ email: req.body.email });
    if (user1) {
      res.status(401).send({ message: "Email already has another user." });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    const { name, email } = req.body;
    const sent = await sendMail({
      email: email,
      subject: `Welcome to Amazona`,
      message: ` Hello ${name},\n Welcome to Amazona Online Shopping. \n We are happy to see you here`,
    });
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
      sent,
      message: "Welcome to Amazona.",
    });
  })
);

userRouter.put(
  "/change/password",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      if (bcrypt.compareSync(req.body.oldpassword, user.password)) {
        if (req.body.newpassword) {
          user.password = bcrypt.hashSync(req.body.newpassword, 8);
        }

        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser),
        });
        return;
      }
    }
    res.status(401).send({ message: "Incorrect old password" });
  })
);
//
userRouter.post(
  "/contacts",
  expressAsyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    const sent = await sendMail({
      email: `samuelndewa2018@gmail.com`,
      subject: `Contact Us`,
      message: ` Hello Amazona,\n${name}, of email ${email} and number ${subject} says:\n${message}`,
    });
    res.send({
      sent,
      message: "Email sent. We will reply soon.",
    });
  })
);

export default userRouter;
