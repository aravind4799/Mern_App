//Import the library into your project
var easyinvoice = require('easyinvoice');
var fs = require('fs');
const ObjectId = require("mongodb").ObjectID;
const InvoiceModel = require("../models/invoiceModel");


let data = {
  "documentTitle": "RECEIPT", //Defaults to INVOICE
  "currency": "INR",
  "taxNotation": "vat", //or gst
  "marginTop": 25,
  "marginRight": 25,
  "marginLeft": 25,
  "marginBottom": 25,
  "logo": "https://www.graphicdesignforum.com/uploads/default/86fd6dc9263ee22d2fac7cc0fa37ab2f34894bc0", //or base64
  //"logoExtension": "png", //only when logo is base64
  "bottomNotice": "Kindly pay your invoice within 15 days."
};

//Create your invoice! Easy!
// const getInvoice = easyinvoice.createInvoice(data, async function (result) {
//     //The response will contain a base64 encoded PDF file
//     // const data = {};
//     // const result = await easyinvoice.createInvoice(data);                       
//     await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
//     // console.log(result.pdf);
// });



module.exports = {
  getPdfInvoice: async (req, res) => {
    try {

      let invoiceDetails = { ...data, ...req.body };
      const result = await easyinvoice.createInvoice(invoiceDetails);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addInvoice: async (req, res) => {
    try {
      const newInvoice = new InvoiceModel(req.body);
      const savedInvoice = await newInvoice.save();
      res.status(201).json(savedInvoice);
    }
    catch (err) {
      res.status(400).json({ message: err.message });
    }

  },
  getAllInvoices: async (req, res) => {
    try {
      const invoices = await InvoiceModel.find();
      console.log(invoices);
      res.status(201).json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateInvoice: async (req, res) => {
    try {
      const updatedInvoice = await InvoiceModel.findOneAndUpdate(
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
      res.status(201).json(updatedInvoice);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  patchInvoice: async (req, res) => {
    try {
      const updateObject = req.body;
      const id = req.params.id;
      const updatedInvoice = await InvoiceModel.updateOne(
        { _id: ObjectId(id) },
        { $set: updateObject },
      );
      res.status(201).json(updatedInvoice);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteInvoice: async (req, res) => {
    try {
      await res.invoice.remove();
      res.status(200).json({ message: "Deleted Invoice" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getInvoice: async (req, res, next) => {
    let invoice;
    try {
      invoice = await InvoiceModel.findById(req.params.id);
      if (invoice == null) {
        return res.status(404).json({ message: "Cannot find Invoice" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.invoice = invoice;
    next();
  },

};

