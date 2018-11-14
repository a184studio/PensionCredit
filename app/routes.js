const express = require('express')
const router = express.Router()

router.use(require('./routes/sprint-1/new-claims'))
router.use(require('./routes/sprint-2/new-claims'))

module.exports = router
