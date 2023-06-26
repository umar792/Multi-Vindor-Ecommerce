const EventModel = require("../Model/EventsSchema");
const cloudinary = require("cloudinary");
const ShopModal = require("../Model/ShopCreateSchema");

module.exports = {
  // ------------------------- create Products
  createEventProducts: async (req, res) => {
    try {
      const {
        name,
        description,
        category,
        Tags,
        originalPrice,
        discountPrice,
        stock,
        startDate,
        endDate,
      } = req.body;
      if (
        !name ||
        !description ||
        !category ||
        !Tags ||
        !originalPrice ||
        !discountPrice ||
        !stock ||
        !startDate ||
        !endDate
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
        if (!startDate) {
          missingFields.push("startDate");
        }
        if (!endDate) {
          missingFields.push("EndDate");
        }

        req.body.startDate = req.body.startDate.IOSString();
        req.body.endDate = req.body.endDate.IOSString();
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
      const Event = await EventModel.create(req.body);
      ownerid.events.push(Event._id);
      await ownerid.save();

      res.status(200).json({
        success: true,
        message: "Event Create Successfuly",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ------------------------ delete Event
  deleteEventByOwner: async (req, res) => {
    try {
      const product = await EventModel.findById(req.params.id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "No Event Found",
        });
      }

      const owner = await ShopModal.findById(req.user._id);
      if (product.owner.toString() === owner._id.toString()) {
        // Delete the product
        await EventModel.findByIdAndDelete(product._id);

        // Remove the product ID from the user's myProducts array
        owner.events = await owner.events.filter(
          (productId) => productId.toString() !== product._id.toString()
        );
        await owner.save();
        res.status(200).json({
          success: true,
          message: "Event Deleted Successfuly",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Sorry you cannot delete this product",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ----------------------- get owner all Events

  ownerEvensts: async (req, res) => {
    try {
      const ownerEvents = await EventModel.find({
        owner: req.user._id,
      }).populate("owner");

      res.status(200).json({
        ownerEvents,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ----------------get all events
  ALLEvents: async (req, res) => {
    try {
      const products = await EventModel.find().populate("owner");
      res.status(200).json({
        products,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
