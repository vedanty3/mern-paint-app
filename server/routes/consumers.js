const express = require("express");
const router = express.Router();
const { Consumer, validate } = require("../models/consumer.js");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const consumer = await Consumer.findOne({ email: req.body.email });

    if (consumer) {
      return res
        .status(409)
        .send({ message: "An account with this email already exist." });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await new Consumer({ ...req.body, password: hashedPassword });

    res.status(201).send({ message: "Account created successfully." });
  } catch (error) {
    res.status(500).send({ message: "An internal error encountered." });
  }
});

module.exports = router;
