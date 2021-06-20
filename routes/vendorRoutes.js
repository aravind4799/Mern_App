const express = require("express");
const router = express.Router();

// Importing all Controllers
const vendorsController = require("../controllers/vendorController");

// ROUTES
router.get('/api', vendorsController.testVendors);

// Getting all
router.get('/', vendorsController.getAllVendors);

// Getting One
router.get('/:id', vendorsController.getVendor, (req, res) => {
  res.json(res.vendor);
});

// Creating one
router.post('/', vendorsController.addVendor);

// Updating One
router.put('/:id', vendorsController.getVendor, vendorsController.updateVendor);

// Patch Vendor
router.patch('/:id', vendorsController.getVendor, vendorsController.patchVendor);

// Deleting One
router.delete('/:id', vendorsController.getVendor, vendorsController.deleteVendor);

module.exports = router;
