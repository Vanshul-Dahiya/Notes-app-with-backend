const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

// all app routes are here , accessed from mainController
router.get("/", mainController.homepage);
router.get("/about", mainController.about);

module.exports = router;
