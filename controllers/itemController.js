const Item = require("../models/itemModel");
const ObjectId = require("mongodb").ObjectID;
module.exports = {
  testItems: async (req, res) => {
    try {
      //to test the connection
      res.status(201).json({ message: "success connection to api" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getAllItems: async (req, res) => {
    try {
      const items = await Item.find();
      console.log(items);
      res.status(201).json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addItem: async (req, res) => {
    const newitem = new Item(req.body);
    try {
      const newItem = await newitem.save();
      res.status(201).json(newItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateItem: async (req, res) => {
    try {
      const updatedItem = await Item.findOneAndUpdate(
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
      res.status(201).json(updatedItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  patchItem: async (req, res) => {
    try {
      const updateObject = req.body; // {last_name : "smith", age: 44}
      const id = req.params.id;
      const updatedItem = await Item.updateOne(
        { _id: ObjectId(id) },
        { $set: updateObject },
      );
      res.status(201).json(updatedItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteItem: async (req, res) => {
    try {
      await res.item.remove();
      res.status(200).json({ message: "Deleted Item" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getItem: async (req, res, next) => {
    let item;
    try {
      item = await Item.findById(req.params.id);
      if (item == null) {
        return res.status(404).json({ message: "Cannot find Item" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.item = item;
    next();
  },
};
