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
        let missingFields = [];
        if (!name) {
          missingFields.push("name");
        }
        if (!description) {
          missingFields.push("description");
        }
        if (!category) {
          missingFields.push("category");
        }
        if (!Tags) {
          missingFields.push("Tags");
        }
        if (!originalPrice) {
          missingFields.push("originalPrice");
        }
        if (!discountPrice) {
          missingFields.push("discountPrice");
        }
        if (!stock) {
          missingFields.push("stock");
        }

        return res.status(400).json({
          success: false,
          message: `Please enter the following fields: ${missingFields.join(
            ", "
          )}`,
        });
      }
      let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      let imagesLink = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "sample",
        });

        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      const ownerid = await ShopModal.findById(req.user._id);
      req.body.images = imagesLink;
      req.body.owner = ownerid._id;
      const product = await ProductModel.create(req.body);
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

  // ----------------------- get owner all products

  ownerProducts: async (req, res) => {
    try {
      const ownerProducts = await ProductModel.find({
        owner: req.user._id,
      }).populate("owner");

      res.status(200).json({
        ownerProducts,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ------------------------ Delete product by owner

  deleteProductByOwner: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "No Product Found",
        });
      }

      const owner = await ShopModal.findById(req.params._id);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
