const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
var mongoDB = process.env.MONGODB_URI;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection established"))
  .catch((err) => console.log(err));
const person = require(__dirname + "/models/person.js");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/add-info", (req, res) => {
  //  console.log(req.body);
  person.create(req.body);
  res.status(200);
  res.end();
});
app.get("/read-info", async (req, res) => {
  const peoples = await person.find();
  res.json(peoples);
});
app.get("/read-info/:fn", async (req, res) => {
  const peoples = await person.findOne({ FirstName: req.params.fn });
  res.json(peoples);
});
app.put("/update-info/:fn", async (req, res) => {
  // console.log(req.params);
  const peoples = await person.findOneAndUpdate(
    { FirstName: req.params.fn },
    req.body,
    { new: true }
  );
  res.send(peoples);
});
app.delete("/delete-info/:FN", async (req, res) => {
  const fn = req.params.FN;
  //console.log(req.params);
  await person.deleteOne({ FirstName: fn });
  res.json({ message: "deleted" });
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on " + port);
});
