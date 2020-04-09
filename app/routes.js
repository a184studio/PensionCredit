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
router.use(require('./routes/sprint-9/end-to-end'))
router.use(require('./routes/sprint-9/sept-3-2019'))
router.use(require('./routes/sprint-9/sept-12-2019'))
router.use(require('./routes/sprint-10/mvp'))
router.use(require('./routes/sprint-10/pc-payment-a'))
router.use(require('./routes/sprint-10/pc-payment-b'))
router.use(require('./routes/sprint-10/agent-actions'))
router.use(require('./routes/sprint-10/backdating'))
router.use(require('./routes/sprint-10/pc-payment-c'))
router.use(require('./routes/sprint-11/mvp'))
router.use(require('./routes/sprint-12/mvp'))
router.use(require('./routes/sprint-12/contact'))
router.use(require('./routes/version-13/mvp'))
router.use(require('./routes/version-13/gci-pensions'))
router.use(require('./routes/version-13/cis-benefits'))
router.use(require('./routes/version-13/context'))
router.use(require('./routes/version-14/APIs'))
router.use(require('./routes/version-15/APIs'))
router.use(require('./routes/version-15/survey'))
router.use(require('./routes/version-15/index'))
router.use(require('./routes/citizen-version-1/mvp'))



module.exports = router
