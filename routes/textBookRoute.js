const express = require("express");
const textBookController = require("./../controllers/textBookController");
const authController = require("../controllers/authController");
const router = express.Router();

// router.use("/image/:imageName", textBookController.getImage);
// router.use("/search", textBookController.searchPhones);
router.route("/").get(textBookController.getAllTextBooks).post(
  authController.protect,
  // textBookController.uploadPhoneImages,
  // textBookController.resizePhoneImages,
  textBookController.createOneTextBook
);
router
  .route("/:id")
  .get(textBookController.getOneTextBook)
  .patch(
    authController.protect,
    // textBookController.uploadPhoneImages,
    // textBookController.resizePhoneImages,
    textBookController.updateTextBook
  )
  .delete(authController.protect, textBookController.deleteTextBook);

module.exports = router;
