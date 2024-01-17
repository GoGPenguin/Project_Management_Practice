const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Client/Pages/Home/index')
})

module.exports = router;