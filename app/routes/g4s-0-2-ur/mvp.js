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

router.post(`${baseUrl}/claimant-dob-router`, (req, res) => {
  try {
    const dob = req.session.data['dob-year'] + '-' +
      req.session.data['dob-month'].padStart(2, '0') + '-' +
      req.session.data['dob-day'].padStart(2, '0')

    const today = startOfDay(new Date())
    const maleSpaDate = getStatePensionDate(dob, 'M')
    const femaleSpaDate = getStatePensionDate(dob, 'F')
    const daysSinceMaleSPA = differenceInDays(today, maleSpaDate)
    const daysSinceFemaleSPA = differenceInDays(today, femaleSpaDate)

    if (daysSinceMaleSPA >= 0 && daysSinceFemaleSPA >= 0) {
      const threeMonthsAgo = subMonths(today, 3)
      req.session.data['back-dating-date'] = maleSpaDate < threeMonthsAgo ? threeMonthsAgo : maleSpaDate
      req.session.data['spa-date'] = maleSpaDate

      res.redirect(`${baseUrl}/reside-in-uk`)
    } else if (daysSinceMaleSPA < 0 && daysSinceFemaleSPA < 0) {
      res.redirect(`${baseUrl}/reside-in-uk`)
    } else {
      res.redirect(`${baseUrl}/sex`)
    }
  } catch (err) {
    res.redirect(`${baseUrl}/children-check-yn`)
  }
})

// router.post(`${baseUrl}/state-pension-check-yn-router`, (req, res) => {
//   const statePensionCheck = req.session.data['state-pension-check-yn']
//
//   if (statePensionCheck === 'Yes') {
//     res.redirect(`${baseUrl}/children-check-yn`)
//   } else {
//     res.redirect(`${baseUrl}/done-not-getting-sp`)
//   }
// })

router.post(`${baseUrl}/children-check-yn-router`, (req, res) => {
  const childrenCheck = req.session.data['children-check-yn']

  if (childrenCheck === 'No') {
    res.redirect(`${baseUrl}/claimant-national-insurance`)
  } else {
    res.redirect(`${baseUrl}/done-children`)
  }
})

router.post(`${baseUrl}/housing-costs-router`, (req, res) => {
  const housingCosts = req.session.data['housing-costs']

  if (housingCosts === 'Yes') {
    res.redirect(`${baseUrl}/outcome-likely`)
  } else {
    res.redirect(`${baseUrl}/state-pension-amount`)
  }
})

router.post(`${baseUrl}/benefit-check-router`, (req, res) => {
  const benefitCheck = req.session.data['benefit-check']

  if (benefitCheck == 'SP') {
    res.redirect(`${baseUrl}/outcome`)
  } else {
    res.redirect(`${baseUrl}/pensions`)
  }
})

router.post(`${baseUrl}/pensions-router`, (req, res) => {
  const pensions = req.session.data['pensions']

  if (pensions === 'Yes') {
    res.redirect(`${baseUrl}/outcome`)
  } else {
    res.redirect(`${baseUrl}/earnings`)
  }
})

router.post(`${baseUrl}/earnings-router`, (req, res) => {
  const earnings = req.session.data['earnings']

  if (earnings === 'Yes') {
    res.redirect(`${baseUrl}/outcome`)
  } else {
    res.redirect(`${baseUrl}/outcome`)
  }
})


router.post(`${baseUrl}/outcome-yn-router`, (req, res) => {
  const outcomeYN = req.session.data['outcome-yn']

  if (outcomeYN === 'Yes') {
    res.redirect(`${baseUrl}/handover`)
  } else {
    res.redirect(`${baseUrl}/exit`)
  }
})





module.exports = router
