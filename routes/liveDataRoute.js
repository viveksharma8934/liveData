const {getAllData, avgCount }=require('../controllers/liveData');
const router = require('express').Router();

router.post("/user",getAllData);
router.get("/count",avgCount);

module.exports = router;