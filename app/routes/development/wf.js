const express = require('express')
const { getStatePensionDate } = require('get-uk-state-pension-date')
const differenceInDays = require('date-fns/difference_in_days')
const startOfDay = require('date-fns/start_of_day')
const subMonths = require('date-fns/sub_months')
const got = require('got')
const fs = require('fs')
const {getMonth} = require('../../filters')()

const router = new express.Router()
const baseUrl = '/development/winter-fuel'


router.post(`${baseUrl}/payment-letter-router`, (req, res) => { // router name
  const privacyPolicy = req.session.data['payment-letter-yn']  // name of data / id name

  if (privacyPolicy === 'Yes') { // name of data / + answer
    res.redirect(`${baseUrl}/has-letter`)
  } else {
    res.redirect(`${baseUrl}/post-code-lookup`)
  }
})


module.exports = router
