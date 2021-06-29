const express = require("express");
const router = express.Router();

// Importing all Controllers
const invoiceController = require("../controllers/invoiceController");


// Getting invoice as pdf
router.post('/pdf', invoiceController.getPdfInvoice);

// Getting all invoice
router.get('/', invoiceController.getAllInvoices);

// Getting One
router.get('/:id', invoiceController.getInvoice, (req, res) => {
    res.json(res.invoice);
  });

// Creating one
router.post('/', invoiceController.addInvoice);

// Updating One
router.put('/:id', invoiceController.getInvoice, invoiceController.updateInvoice);

// Patch Customer
router.patch('/:id', invoiceController.getInvoice, invoiceController.patchInvoice);

// Deleting One
router.delete('/:id', invoiceController.getInvoice, invoiceController.deleteInvoice);


module.exports = router;
