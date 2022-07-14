const express = require("express");
const { register, login } = require("../Controllers/Auth");
const { checkUser } = require("../Middlewares/Auth");

const router = express.Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
