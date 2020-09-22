const express = require('express')
const { getStatePensionDate } = require('get-state-pension-date')
const differenceInDays = require('date-fns/difference_in_days')
const startOfDay = require('date-fns/start_of_day')
const subMonths = require('date-fns/sub_months')
const got = require('got')
const fs = require('fs')
const {getMonth} = require('../../filters')()

const router = new express.Router()
const baseUrl = '/g4s-1-0/mvp'

function makeAStay(data) {
  const admission = new Date(`${data['admission-year']}-${data['admission-month']}-${data['admission-day']}`)
  const discharge = new Date(`${data['discharge-year']}-${data['discharge-month']}-${data['discharge-day']}`)
  const totalDays = Math.max(differenceInDays(discharge, admission) - 1, 0)
  return {admission, discharge, totalDays}
}


router.post(`${baseUrl}/login-router`, (req, res) => {
  const loginCheck = req.session.data['user-full-name']

  if (loginCheck === 'Pete Bates') {
    res.redirect(`${baseUrl}/case-load`)
  }
  else if (loginCheck === 'Admin') {
    res.redirect(`${baseUrl}/admin-case-load`)
  }
   else {
    res.redirect(`${baseUrl}/XXX`)
  }
})




module.exports = router
