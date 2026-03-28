const express = require("express");
const router = express.Router();
const User = require("../models/user");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

router.post("/uploadimage", upload.single("profile_pic"), (req, res) => {
  try {
    res.json({
      //   url: `/uploads/${req.file.filename}`,
      message: "Profile picture uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/adduser", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 IMPORTANT

    const newUser = new User({
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_dob: req.body.user_dob,
      gender: req.body.gender,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getuser", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/singleuser/:id", async (req, res) => {
  const uid = req.params.id;
  try {
    const users = await User.findById(uid);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/updateuser/:id", async (req, res) => {
  const uid = req.params.id;
  try {
    const users = await User.findByIdAndUpdate(
      uid,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  const uid = req.params.id;
  try {
    const users = await User.findByIdAndDelete(uid);
    res
      .status(200)
      .json({ msg: "User has been deleted Successfully", sts: "1" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
