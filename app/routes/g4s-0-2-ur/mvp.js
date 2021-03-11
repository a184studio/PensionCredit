const express = require('express')
const { getStatePensionDate } = require('get-state-pension-date')
const differenceInDays = require('date-fns/difference_in_days')
const startOfDay = require('date-fns/start_of_day')
const subMonths = require('date-fns/sub_months')
const got = require('got')
const fs = require('fs')
const {getMonth} = require('../../filters')()

const router = new express.Router()
const baseUrl = '/g4s-0-2-ur/mvp'

function makeAStay(data) {
  const admission = new Date(`${data['admission-year']}-${data['admission-month']}-${data['admission-day']}`)
  const discharge = new Date(`${data['discharge-year']}-${data['discharge-month']}-${data['discharge-day']}`)
  const totalDays = Math.max(differenceInDays(discharge, admission) - 1, 0)
  return {admission, discharge, totalDays}
}

router.post(`${baseUrl}/reside-in-uk-router`, (req, res) => {
  const residesInUk = req.session.data['resides-in-uk']

  if (residesInUk === 'England') {
    res.redirect(`${baseUrl}/claimant-dob`)
  } else if (residesInUk === 'Scotland') {
    res.redirect(`${baseUrl}/claimant-dob`)
  } else if (residesInUk === 'Wales') {
    res.redirect(`${baseUrl}/claimant-dob`)
  } else if (residesInUk === 'Northern-Ireland') {
    res.redirect(`${baseUrl}/claimant-dob`)
  } else {
    res.redirect(`${baseUrl}/done-none-uk`)
  }
})





module.exports = router
