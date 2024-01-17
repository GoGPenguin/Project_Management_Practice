const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Client/Pages/Home/Products/index')
})

module.exports = router;