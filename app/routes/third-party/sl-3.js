const express = require('express')
const { getStatePensionDate } = require('get-state-pension-date')
const differenceInDays = require('date-fns/differenceInDays')
const startOfDay = require('date-fns/startOfDay')
const subMonths = require('date-fns/subMonths')
const got = require('got')
const fs = require('fs')
const {getMonth} = require('../../filters')()

const router = new express.Router()
const baseUrl = '/third-party/sl-3'

function makeAStay(data) {
  const admission = new Date(`${data['admission-year']}-${data['admission-month']}-${data['admission-day']}`)
  const discharge = new Date(`${data['discharge-year']}-${data['discharge-month']}-${data['discharge-day']}`)
  const totalDays = Math.max(differenceInDays(discharge, admission) - 1, 0)
  return {admission, discharge, totalDays}
}


// AB ROUTER

router.post(`${baseUrl}/ab-check-pension-router`, (req, res) => {
  const abRouter = req.session.data['sl-find-a-claim']

  if (abRouter === 'SS 22 00 00 B') {
    res.redirect(`${baseUrl}/earnings`)
  } else if (abRouter === 'SS220000B') {
    res.redirect(`${baseUrl}/earnings`)

  } else if (abRouter === 'SS 33 00 00 C') {
    res.redirect(`${baseUrl}/outcome`)
  } else if (abRouter === 'SS330000C') {
    res.redirect(`${baseUrl}/outcome`)


  } else {
    res.redirect(`${baseUrl}/no-ni-selected`)
  }
})


// AB ROUTER END
//
// router.post(`${baseUrl}/sl-find-a-claim-router`, (req, res) => {
//   const slFindAClaim = req.session.data['sl-find-a-claim']
//
//   if (slFindAClaim === 'P1') {
//     res.redirect(`${baseUrl}/sl-claim-a`)
//   } else if (slFindAClaim === 'P2') {
//     res.redirect(`${baseUrl}/sl-claim-b`)
//   } else {
//     res.redirect(`${baseUrl}/sl-claim-b`)
//   }
// })


// NINO ROUTER

router.post(`${baseUrl}/sl-find-a-claim-router`, (req, res) => {
  const slFindClaims = req.session.data['sl-find-claims']

  if (slFindClaims === '') {
    res.redirect(`${baseUrl}/`)
  } else if (slFindClaims === 'ZZ439386T') {
    res.redirect(`${baseUrl}/sl-claim-d`)
  } else if (slFindClaims === 'AB987654C') {
    res.redirect(`${baseUrl}/sl-claim-c`)
  } else if (slFindClaims === 'QQ457741A') {
    res.redirect(`${baseUrl}/sl-claim-B`)
  } else {
    res.redirect(`${baseUrl}/sl-claim-a`)
  }
})




module.exports = router
