const Vendor = require("../models/vendorModel");
const ObjectId = require("mongodb").ObjectID;
module.exports = {
  testVendors: async (req, res) => {
    try {
      res.status(201).json({ message: "success connection to api" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getAllVendors: async (req, res) => {
    try {
      const vendors = await Vendor.find();
      console.log(vendors);
      res.status(201).json(vendors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addVendor: async (req, res) => {
    console.log(req.body);
    const newvendor = new Vendor(req.body);

    try {
      const newVendor = await newvendor.save();
      res.status(201).json(newVendor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateVendor: async (req, res) => {
    try {
      const updatedVendor = await Vendor.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: req.body,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      res.status(201).json(updatedVendor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  patchVendor: async (req, res) => {
    try {
      const updateObject = req.body; // {last_name : "smith", age: 44}
      const id = req.params.id;
      const updatedVendor = await Vendor.updateOne(
        { _id: ObjectId(id) },
        { $set: updateObject },
      );
      res.status(201).json(updatedVendor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteVendor: async (req, res) => {
    try {
      await res.vendor.remove();
      res.status(200).json({ message: "Deleted Vendor" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getVendor: async (req, res, next) => {
    let vendor;
    try {
      vendor = await Vendor.findById(req.params.id);
      if (vendor == null) {
        return res.status(404).json({ message: "Cannot find Vendor" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.vendor = vendor;
    next();
  },
};
