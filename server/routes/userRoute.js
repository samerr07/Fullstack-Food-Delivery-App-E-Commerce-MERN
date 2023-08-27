const express = require("express");
const { createUser, login } = require("../controllers/userController");
const router = express.Router();


router.post("/createUser",createUser)
router.post("/login",login )


exports.router = router;