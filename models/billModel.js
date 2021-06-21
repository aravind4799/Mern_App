const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    "vendor_details": {
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
    "bill_number": {
      "type": "String"
    },
    "order_number": {
      "type": "String"
    },
    "bill_date": {
      "type": "Date"
    },
    "bill_terms": {
      "type": "String"
    },
    "bill_due_date": {
      "type": "Date"
    },
    "bill_amount":{
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

let billModel = mongoose.model("bill", billSchema);
module.exports = billModel