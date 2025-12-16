const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", userController.findById);
router.put("/:id", userController.update);
router.patch("/status/:id", userController.updateUserStatus);
router.delete("/:id", userController.delete);

module.exports = router;
