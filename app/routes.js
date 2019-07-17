const express = require('express')
const router = express.Router()

router.use(require('./routes/development/wf'))
router.use(require('./routes/sprint-1/new-claims'))
router.use(require('./routes/sprint-2/new-claims'))
router.use(require('./routes/sprint-2/short-claim'))
router.use(require('./routes/sprint-2/monolith'))
router.use(require('./routes/sprint-3/new-claims'))
router.use(require('./routes/sprint-4/new-claims'))
router.use(require('./routes/sprint-4/mvp'))
router.use(require('./routes/sprint-5/new-claims'))
router.use(require('./routes/sprint-5/mvp'))
router.use(require('./routes/declaration-test/dec'))
router.use(require('./routes/pdf'))
router.use(require('./routes/pdf-summary'))
router.use(require('./routes/sprint-5/msic/a-single'))
router.use(require('./routes/sprint-5/msic/b-list'))
router.use(require('./routes/sprint-6/mvp'))
router.use(require('./routes/sprint-6/eligibility'))
router.use(require('./routes/sprint-7/mvp'))
router.use(require('./routes/sprint-7/msic-loop'))
router.use(require('./routes/sprint-8/mvp'))
router.use(require('./routes/sprint-8/end-2-end'))
router.use(require('./routes/sprint-9/mvp'))



module.exports = router
