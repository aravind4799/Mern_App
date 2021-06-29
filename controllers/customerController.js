const Customer = require("../models/customerModel");
const ObjectId = require("mongodb").ObjectID;
module.exports = {
  testCustomers: async (req, res) => {
    try {
      res.status(201).json({ message: "success connection to api" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getAllCustomers: async (req, res) => {
    try {
      const customers = await Customer.find();
      console.log(customers);
      res.status(201).json(customers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addCustomer: async (req, res) => {
    console.log(req.body);
    const newcustomer = new Customer(req.body);

    try {
      const newCustomer = await newcustomer.save();
      res.status(201).json(newCustomer);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const updatedCustomer = await Customer.findOneAndUpdate(
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
      res.status(201).json(updatedCustomer);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  patchCustomer: async (req, res) => {
    try {
      const updateObject = req.body; // {last_name : "smith", age: 44}
      const id = req.params.id;
      const updatedCustomer = await Customer.updateOne(
        { _id: ObjectId(id) },
        { $set: updateObject },
      );
      res.status(201).json(updatedCustomer);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      await res.customer.remove();
      res.status(200).json({ message: "Deleted Customer" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getCustomer: async (req, res, next) => {
    let customer;
    try {
      customer = await Customer.findById(req.params.id);
      if (customer == null) {
        return res.status(404).json({ message: "Cannot find Customer" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.customer = customer;
    next();
  },
};
