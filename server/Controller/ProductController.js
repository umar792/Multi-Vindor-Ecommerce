const ProductModel = require("../Model/ProductSchema");
const cloudinary = require("cloudinary");
const ShopModal = require("../Model/ShopCreateSchema");

module.exports = {
  // ------------------------- create Products
  createProducts: async (req, res) => {
    try {
      const {
        name,
        description,
        category,
        Tags,
        originalPrice,
        discountPrice,
        stock,
      } = req.body;
      if (
        !name ||
        !description ||
        !category ||
        !Tags ||
        !originalPrice ||
        !discountPrice ||
        !stock
      ) {
        return res.status(400).json({
          success: false,
          message: "Plaese enter all fields",
        });
      }
      // const mycloud = await cloudinary.v2.uploader.upload(req.body.images, {
      //   folder: "Inventory",
      //   width: 150,
      //   crop: "scale",
      // });
      const ownerid = await ShopModal.findById(req.user._id);
      const product = await ProductModel.create({
        name,
        description,
        category,
        Tags,
        originalPrice,
        discountPrice,
        stock,
        owner: ownerid._id,
        avatar: {
          public_id: "mycloud.public_id",
          url: "mycloud.secure_url",
        },
      });
      ownerid.products.push(product._id);
      await ownerid.save();

      res.status(200).json({
        success: true,
        message: "Product Create Successfuly",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
