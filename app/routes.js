const express = require('express')
const router = express.Router()

router.use(require('./routes/new-claims'));

module.exports = router
