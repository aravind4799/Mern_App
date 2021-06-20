const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema({
    "salutation": {
      "type": "String"
    },
    "first_name": {
      "type": "String"
    },
    "last_name": {
      "type": "String"
    },
    "display_name": {
      "type": "String"
    },
    "company_name": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "work_number": {
      "type": "Number"
    },
    "mobile_number": {
      "type": "Number"
    },
    "BA_attention": {
      "type": "String"
    },
    "BA_country": {
      "type": "String"
    },
    "BA_state": {
      "type": "String"
    },
    "BA_address_street1": {
      "type": "String"
    },
    "BA_address_street2": {
      "type": "String"
    },
    "BA_city": {
      "type": "String"
    },
    "BA_zipcode": {
      "type": "String"
    },
    "BA_phone": {
      "type": "Number"
    },
    "SP_attention": {
      "type": "String"
    },
    "SP_country": {
      "type": "String"
    },
    "SP_state": {
      "type": "String"
    },
    "SP_address_street1": {
      "type": "String"
    },
    "SP_address_street2": {
      "type": "String"
    },
    "SP_city": {
      "type": "String"
    },
    "SP_zipcode": {
      "type": "String"
    },
    "SP_phone": {
      "type": "Number"
    },
    "place_of_supply": {
      "type": "String"
    },
    "gst_treatment": {
      "type": "String"
    },
    "tax_preference": {
      "type": "String"
    },
    "currency": {
      "type": "String"
    },
    "opening_balance": {
      "type": "Number"
    },
    "payment_terms": {
      "type": "String"
    },
    "gstin_uni":{
      "type":"Number"
    }
  });


let vendorsModel = mongoose.model("vendors", vendorSchema);
module.exports = vendorsModel