const express = require('express');
const router = express.Router();

const collegeController = require("../controller/collegeController")
const internController = require("../controller/internController")

router.post("/functionup/colleges", collegeController.createCollege);

router.post("/functionup/interns", internController);

// router.get("/functionup/collegeDetails", collegeController.getCollege);


module.exports = router;

