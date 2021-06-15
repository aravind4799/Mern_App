const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  type: String,
  name: String,
  SKU: String,
  unit: String,
  HSN_Code: String,
  tax_preference: String,
  category: String,
  selling_price: Number,
  sales_account: String,
  sales_description: String,
  cost_price: Number,
  purchase_account: String,
  purchase_description: String,
  intra_tax_rate: Number,
  inter_tax_rate: Number,
  opening_stock: Number,
  reorder_point: Number,
  opening_stock_rateperunit: Number,
  preferred_vendor: String,
  inventory_account: String,
  bar_code: Number,
  //trackInventory: Boolean
});

let itemModel = mongoose.model("items", itemSchema);
module.exports = itemModel