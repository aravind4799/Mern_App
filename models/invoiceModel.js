const mongoose = require("mongoose");
const customer_detailsSchema = new mongoose.Schema({
  name:String,
  id:String
})
const invoiceSchema = new mongoose.Schema({
    "customer_details": {
      "name":{"type":"String"},
      "id":{"type":"String"},
      "billing_address":{
        "ba_country":{"type":"String"},
        "ba_state":{"type":"String"},
        "ba_address":{"type":"String"},
        "ba_city":{"type":"String"},
        "ba_zipcode":{"type":"Number"}
      },
      "shipping_address":{
        "sp_country":{"type":"String"},
        "sp_state":{"type":"String"},
        "sp_address":{"type":"String"},
        "sp_city":{"type":"String"},
        "sp_zipcode":{"type":"Number"}
      },
      "place_of_supply":{"type":"String"}
    },
    "invoice_number": {
      "type": "String"
    },
    "order_number": {
      "type": "String"
    },
    "invoice_date": {
      "type": "Date"
    },
    "invoice_terms": {
      "type": "String"
    },
    "invoice_due_date": {
      "type": "Date"
    },
    "invoice_amount":{
      "type":"Number"
    },
    "items": {
      "type": [
        "Mixed"
      ]
    },
    "sub_total":{
      "type": "Number"
    },
    "shipping_charges":{
      "type":"Number"
    },
    "discount_amount":{
      "type":'Number'
    },
    "discount_type":{
      "type":'String'
    },
    "gst":{
      "type":"Number"
    },
    "round_off":{
      "type":"Number"
    },
    "adjustment_amount":{
      "type":"Number"
    },
    "adjustment_type":{
      "type":"String"
    },
    "adjustment_title":{
      "type":"String"
    },
    "tax_preference":{
      "type":"String"
    },
    "rate_tax_array":{
      "type":["mixed"]
    },
    "updated_place_of_supply":{"type":"String"}
  });

let invoiceModel = mongoose.model("invoice", invoiceSchema);
module.exports = invoiceModel