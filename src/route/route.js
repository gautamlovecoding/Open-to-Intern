const express = require('express');
const router = express.Router();

const collegeController = require("../controller/collegeController")
// const internController = require("../controller/internController")

router.post("/functionup/colleges", collegeController);

// router.post("/functionup/interns", authorController);

// router.get("/functionup/collegeDetails", authorController);


module.exports = router;

