const ShopModal = require("../Model/ShopCreateSchema");
const UserModel = require("../Model/UserSchema");
const cloudinary = require("cloudinary");
const sendMail = require("../Utils/SendEmail");
const jwt = require("jsonwebtoken");
const brypt = require("bcrypt");

// const twilio = require("twilio");

// const sendSMS = async (number, OTP) => {
//   try {
//     const accountSid = "ACc5133a914b2ad56df1eead524819c7a7";
//     const authToken = "a3e45b0b5c715c005c52ddd43c547679";
//     const client = twilio(accountSid, authToken);
//     await client.messages.create({
//       body: `Your OTP is ${OTP}`,
//       from: "+14302336782",
//       to: `+92${number}`,
//     });
//     console.log("OTP sent successfully");
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  createShop: async (req, res) => {
    try {
      const {
        shopName,
        number,
        email,
        Adress,
        zipcode,
        password,
        shopDescription,
      } = req.body;
      if (
        !shopName ||
        !number ||
        !email ||
        !Adress ||
        !zipcode ||
        !password ||
        !shopDescription
      ) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter All the fields",
        });
      }
      const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "Inventory",
        width: 150,
        crop: "scale",
      });
      const isExistUser = await UserModel.findOne({ email });
      const isExistShopName = await ShopModal.findOne({ shopName });
      if (!isExistUser) {
        return res.status(400).json({
          success: false,
          message: "Plaese Register Your Email First Then You will Create Shop",
        });
      }
      if (!isExistShopName) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot create shop becasue a shop already present with this name",
        });
      }
      const isNumber = await ShopModal.findOne({ number });
      if (isNumber) {
        return res.status(400).json({
          success: false,
          message:
            "this number already present in a shop plaese try another number",
        });
      }

      const IsShopEmail = await ShopModal.findOne({ email });
      if (IsShopEmail) {
        return res.status(400).json({
          success: false,
          message: "Plaese Login Your Email Already Present",
        });
      }
      const myOTP = Math.floor(Math.random() * 999 + 1000);

      await ShopModal.create({
        shopName,
        email,
        password,
        number,
        Adress,
        zipcode,
        shopDescription,
        OTP: myOTP,
        OTP_Expire: Date.now() + 10 * 60 * 1000,
        avatar: {
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        },
      });

      try {
        await sendMail({
          email: isExistUser.email,
          subject: "Active your Account from YourShop",
          message: `Hello ${isExistUser.name} Your OTP is ${myOTP}`,
        });
        res.status(200).json({
          success: true,
          message: `Please Check Your ${isExistUser.email} Email To active account`,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    } catch (error) {
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

      const seller = await ShopModal.findOne({ OTP });
      if (!seller) {
        return res.status(400).json({
          success: false,
          message: "OTP is incorrect plaese retry",
        });
      }
      if (seller.OTP !== req.body.OTP) {
        (seller.OTP_Expire = null), (seller.OTP = null);
        (seller.verify = true), await seller.save();
        res.status(200).json({
          success: true,
          message: "Your Shop Craeted Successfuly",
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

  // ----------------------- login to shop
  LoginShop: async function (req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter Email or Password",
        });
      }
      const ShopOwner = await ShopModal.findOne({ email });
      if (!ShopOwner) {
        return res.status(400).json({
          success: false,
          message: "Email Not Exist Plaese SignUp",
        });
      }
      if (ShopOwner.verify === false) {
        return res.status(400).json({
          success: false,
          message: "First Plaese Verify Your Account",
        });
      }

      const isMatch = await brypt.compare(password, ShopOwner.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter Valid Email or Password",
        });
      } else {
        const user = await UserModel.findOne({ email });
        (user.role = "seller"), await user.save();
        const Token = await jwt.sign(
          { _id: ShopOwner._id },
          process.env.jwt_shop,
          {
            expiresIn: "7d",
          }
        );
        res.status(200).json({
          success: true,
          message: "Login to shop Successfuly",
          Token,
          ShopOwner,
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ---------------- get Shop Owner
  getShopOwner: async (req, res) => {
    try {
      const owner = await ShopModal.findById(req.user._id)
        .populate("products")
        .populate("events");
      res.status(200).json({
        success: true,
        owner,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ----------------------------- get single owner
  getSingleOwner: async (req, res) => {
    try {
      const owner = await ShopModal.findById(req.params.id)
        .populate("products")
        .populate("events");
      if (!owner) {
        return res.status(401).send("No such shop exists");
      }
      res.status(200).json({
        success: true,
        owner,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
