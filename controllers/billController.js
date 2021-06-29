const Bill = require("../models/billModel");
const ObjectId = require("mongodb").ObjectID;
module.exports = {
  testBills: async (req, res) => {
    try {
      //to test the connection
      res.status(201).json({ message: "success connection to api" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getAllBills: async (req, res) => {
    try {
      const bills = await Bill.find();
      console.log(bills);
      res.status(201).json(bills);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addBill: async (req, res) => {
    const newbill = new Bill(req.body);
    try {
      const newBill = await newbill.save();
      res.status(201).json(newBill);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateBill: async (req, res) => {
    try {
      const updatedBill = await Bill.findOneAndUpdate(
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
      res.status(201).json(updatedBill);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  patchBill: async (req, res) => {
    try {
      const updateObject = req.body; // {last_name : "smith", age: 44}
      const id = req.params.id;
      const updatedBill = await Bill.updateOne(
        { _id: ObjectId(id) },
        { $set: updateObject },
      );
      res.status(201).json(updatedBill);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteBill: async (req, res) => {
    try {
      await res.bill.remove();
      res.status(200).json({ message: "Deleted Bill" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getBill: async (req, res, next) => {
    let bill;
    try {
      bill = await Bill.findById(req.params.id);
      if (bill == null) {
        return res.status(404).json({ message: "Cannot find Bill" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.bill = bill;
    next();
  },
};
