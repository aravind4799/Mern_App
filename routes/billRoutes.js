const express = require("express");
const router = express.Router();

// Importing all Controllers
const billsController = require("../controllers/billController");

// ROUTES
//to test the connection
router.get('/api', billsController.testBills);

// Getting all
router.get('/', billsController.getAllBills);

// Getting One
router.get('/:id', billsController.getBill, (req, res) => {
  res.json(res.bill);
});

// Creating one
router.post('/', billsController.addBill);

// Updating One
router.put('/:id', billsController.getBill, billsController.updateBill);

// Patch Bill
router.patch('/:id', billsController.getBill, billsController.patchBill);

// Deleting One
router.delete('/:id', billsController.getBill, billsController.deleteBill);

module.exports = router;
