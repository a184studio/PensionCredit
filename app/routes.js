const express = require('express')
const { numbersToWords, moneyToWords } = require('./numbers-to-words')
const router = express.Router()

router.use((req, res, next) => {
  const today = new Date()
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() -3, today.getDate())
  res.locals.threeMonthsAgo = threeMonthsAgo
  next()
})

router.use((req, res, next) => {
  const today = new Date()
  const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() -6, today.getDate())
  res.locals.sixMonthsAgo = sixMonthsAgo
  next()
})

router.post('/session-clear-route', (req, res, next) => {
  const nextPage = req.session.data['session-clear-redirect-url']
  req.session.data = {}
  res.redirect(nextPage)
})

const sanitse = (number) => String(number).replace(/[^0-9.]/g, '');

router.get('/number-test', (req, res, next) => {
  const { numberToConvert, moneyToConvert, numberLanguage } = req.query

  res.locals.numberToConvert = numberToConvert
  res.locals.moneyToConvert = moneyToConvert
  res.locals.numberLanguage = numberLanguage

  const number = sanitse(numberToConvert)
  const money = sanitse(moneyToConvert)

  const lang = { en: 'en', cy: 'cy'}[numberLanguage]

  if (number) {
    res.locals.numberWords = number.indexOf('.') > -1
      ? 'has to be a whole number'
      : numbersToWords(number, lang)
  }

  if (money) {
    res.locals.moneyWords = moneyToWords(money, lang)
  }

  next()
})

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
router.use(require('./routes/version-15/index-2'))
router.use(require('./routes/citizen-version-1/mvp'))
router.use(require('./routes/citizen-version-1/work-list-1-2'))
router.use(require('./routes/citizen-version-1/work-list-1-2-UR'))
router.use(require('./routes/citizen-version-1-1/mvp'))
router.use(require('./routes/agent-worklist-v2/worklist'))
router.use(require('./routes/citizen-version-2/mvp'))
router.use(require('./routes/citizen-version-2-1/mvp'))
router.use(require('./routes/citizen-version-2-2/mvp'))
router.use(require('./routes/citizen-version-2-3/mvp'))
router.use(require('./routes/citizen-version-2-4/mvp'))
router.use(require('./routes/agent-worklist-2-1/worklist'))
router.use(require('./routes/citizen-version-2-5-ur/mvp'))
router.use(require('./routes/citizen-version-2-6/mvp'))
router.use(require('./routes/g4s-0-1/mvp'))
router.use(require('./routes/citizen-version-2-7/mvp'))
router.use(require('./routes/agent-worklist-2-3/worklist'))
router.use(require('./routes/citizen-version-2-7-ur/mvp'))
router.use(require('./routes/citizen-version-2-8/mvp'))
router.use(require('./routes/g4s-0-2-ur/mvp'))
router.use(require('./routes/citizen-version-2-8-ur/mvp'))
router.use(require('./routes/citizen-version-2-9/mvp'))
router.use(require('./routes/g4s-0-3/mvp'))
router.use(require('./routes/idv-0-1/mvp'))
router.use(require('./routes/g4s-0-4/mvp'))
router.use(require('./routes/agent-worklist-2-4/worklist'))
router.use(require('./routes/citizen-version-2-9-ur/mvp'))
router.use(require('./routes/citizen-version-2-10/mvp'))
router.use(require('./routes/g4s-0-5/mvp'))
router.use(require('./routes/g4s-0-6/mvp'))
router.use(require('./routes/searchlight/sl-1'))
router.use(require('./routes/g4s-0-6-5/mvp'))
router.use(require('./routes/g4s-0-7/mvp'))
router.use(require('./routes/citizen-version-2-11/mvp'))
router.use(require('./routes/citizen-version-2-12/mvp'))


module.exports = router
