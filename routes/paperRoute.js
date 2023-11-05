const express = require("express");
const paperController = require("./../controllers/paperController");
const authController = require("../controllers/authController");
const router = express.Router();

// router.use("/image/:imageName", paperController.getImage);
// router.use("/search", paperController.searchPhones);
router.route("/").get(paperController.getAllPapers).post(
  authController.protect,
  // paperController.uploadPhoneImages,
  // paperController.resizePhoneImages,
  paperController.createOnePaper
);
router
  .route("/:id")
  .get(paperController.getOnePaper)
  .patch(
    authController.protect,
    // paperController.uploadPhoneImages,
    // paperController.resizePhoneImages,
    paperController.updatePaper
  )
  .delete(authController.protect, paperController.deletePaper);

module.exports = router;
