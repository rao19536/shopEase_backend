const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const upload = require("../middlewares/upload.middleware");

router.post("/", upload.single("image"), productController.create);
router.get("/", productController.findAll);
router.get("/:id", productController.findById);
router.put("/:id", upload.single("image"), productController.update);
router.delete("/:id", productController.delete);

module.exports = router;
