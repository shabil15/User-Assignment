const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/home", userController.getAllUsers);
router.post("/update/:id", userController.updateUser);
router.post("/delete/:id", userController.deleteUser);

module.exports = router;
