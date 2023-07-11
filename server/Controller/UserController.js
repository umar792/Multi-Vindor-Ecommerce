const fs = require("fs");
const UserModel = require("../Model/UserSchema");
const path = require("path");
const jwt = require("jsonwebtoken");
const sendMail = require("../Utils/SendEmail");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Please Enter Name",
        });
      }
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Please Enter Email",
        });
      }
      if (!password) {
        return res.status(400).json({
          success: false,
          message: "Please Enter Password",
        });
      }

      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        const filename = req.file.filename;
        const filepath = `./uploads/${filename}`;
        fs.unlink(filepath, (err) => {
          if (err) {
            console.log(`Error in file deleting ${err.message}`);
            // res.status(400).json({ message: "Error in file deleting" });
          } else {
            console.log("file deleted successfuly");
            // res.status(400).json({ message: "file deleting" });
          }
        });
        return res.status(400).json({
          success: false,
          message: "User Already Exist",
        });
      }

      const filename = req.file.filename;
      if (filename === "undefined") {
        return res.status(400).json({
          success: false,
          message: "Please Select Your Profile Picture",
        });
      }
      const fileUrl = path.join(filename);
      const myOTP = Math.floor(Math.random() * 999 + 1000);

      const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
        OTP: myOTP,
        Expire_otp: Date.now() + 10 * 60 * 1000,
      };

      // --------------------------- ActivationTokon
      // const createActivationToken = async (user) => {
      //   try {
      //     const token = await jwt.sign(user, process.env.ACTIVATION_SECRET, {
      //       expiresIn: "5m",
      //     });
      //     return token;
      //   } catch (error) {
      //     console.log(error.message);
      //   }
      // };

      // const ActivationTokon = await createActivationToken(user);
      // var ActivationUrl = `http://localhost:3000/activation/${ActivationTokon}`;
      await UserModel.create(user);

      try {
        await sendMail({
          email: user.email,
          subject: "Active your Account from YourShop",
          message: `Hello ${user.name} Your OTP is ${myOTP}`,
        });
        res.status(200).json({
          success: true,
          message: `Please Check Your ${user.email} Email To active account`,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({
          success: false,
          message: `Duplicate ${Object.keys(error.keyValue)} error`,
        });
      }

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   --------------------- verify OTP
  verifyOTP: async (req, res) => {
    try {
      const { OTP } = req.body;
      if (!OTP) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter OTP",
        });
      }

      const user = await UserModel.findOne({ OTP });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "OTP is incorrect plaese retry",
        });
      }
      if (user.OTP !== req.body.OTP) {
        (user.Expire_otp = null), (user.OTP = null);
        (user.verify = true), await user.save();
        res.status(200).json({
          success: true,
          message: "Your Account  Craeted Successfuly",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "OTP is Incorrect",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ------------------ login User

  LoginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please Enter Email And Password",
        });
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User Not Exist",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Please fil valid information",
        });
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      res.status(200).cookie("token", token).json({
        success: true,
        message: "Login Successfuly",
        token,
        user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ------------------------ get load user
  LoadUser: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User Not Exist",
        });
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // --------------------------------- change Password

  changePassword: async (req, res) => {
    try {
      const { oldpassword, newpassword } = req.body;
      if (!newpassword) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter NewPassword",
        });
      }
      if (!oldpassword) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter OldPasasword",
        });
      }

      const user = await UserModel.findById(req.user._id);

      const isMatchchange = await bcrypt.compare(oldpassword, user.password);
      if (!isMatchchange) {
        return res.status(400).json({
          success: false,
          message: "Old password not match",
        });
      }

      user.password = newpassword;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password change successfuly",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
