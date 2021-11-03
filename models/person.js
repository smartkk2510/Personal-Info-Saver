const mongoose = require("mongoose");

let schema = mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Phone_number: Number,
  Address: String,
  Qualification: String,
});

const personModal = mongoose.model("peoples", schema);

module.exports = personModal;
