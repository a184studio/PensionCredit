const express = require('express')
const { getStatePensionDate } = require('get-state-pension-date')
const differenceInDays = require('date-fns/difference_in_days')
const startOfDay = require('date-fns/start_of_day')
const subMonths = require('date-fns/sub_months')
const got = require('got')
const fs = require('fs')
const {getMonth} = require('../../filters')()

const router = new express.Router()
const baseUrl = '/version-15/APIs'

function makeAStay(data) {
  const admission = new Date(`${data['admission-year']}-${data['admission-month']}-${data['admission-day']}`)
  const discharge = new Date(`${data['discharge-year']}-${data['discharge-month']}-${data['discharge-day']}`)
  const totalDays = Math.max(differenceInDays(discharge, admission) - 1, 0)
  return {admission, discharge, totalDays}
}


router.post(`${baseUrl}/pc-done-yn-router`, (req, res) => { // router name
  const pcDoneYn = req.session.data['pc-done-yn']  // name of data / id name

  if (pcDoneYn === 'Agree') { // name of data / + answer
    res.redirect(`${baseUrl}/pc-done-yn`)
  } else {
    res.redirect(`${baseUrl}/done-declaration`)
  }
})


module.exports = router
