require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const formidable = require("express-formidable");
app.use(formidable());
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MODEL
const CrewMember = mongoose.model("CrewMember", {
  name: String,
});

//CREATE ROUTE
app.post("/Add-CrewMember", async (req, res) => {
  try {
    const newCrewMember = new CrewMember({
      name: req.fields.name,
    });
    await newCrewMember.save();
    res.status(200).json({ message: "Crew member created" });
  } catch (error) {
    console.error(error.message);
  }
});

//READ ROUTE
app.get("/", async (req, res) => {
  try {
    const CrewMembers = await CrewMember.find();
    res.status(200).json(CrewMembers);
  } catch (error) {
    console.error(error.message);
  }
});

app.all("*", (req, res) => {
  res.json({ message: "Page not found" });
});


//START SERVER

app.listen(process.env.PORT || 3100, () => {
  console.log(`Server  started on port ${process.env.PORT}`);
});
