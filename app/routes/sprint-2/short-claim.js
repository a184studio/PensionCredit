const express = require('express')

const router = new express.Router()
const baseUrl = '/sprint-2/short-claim'

router.post(`${baseUrl}/has-partner-router`, (req, res) => {
  const hasPartner = req.session.data['has-partner']

  if (hasPartner === 'yes') {
    res.redirect(`${baseUrl}/about-partner`)
  } else {
    res.redirect(`${baseUrl}/self-employed`)
  }
})

router.post(`${baseUrl}/self-employed-router`, (req, res) => {
  const selfEmployed = req.session.data['self-employed']

  if (selfEmployed === 'yes') {
    res.redirect(`${baseUrl}/notify-cas`)
  } else {
    res.redirect(`${baseUrl}/right-to-abode`)
  }
})

router.post(`${baseUrl}/right-to-abode-router`, (req, res) => {
  const rightToAbode = req.session.data['right-to-abode']

  if (rightToAbode === 'yes') {
    res.redirect(`${baseUrl}/money-you-have`)
  } else {
    res.redirect(`${baseUrl}/not-eligible`)
  }
})

router.post(`${baseUrl}/money-you-have-router`, (req, res) => {
  const over10k = req.session.data['over-10k']

  if (over10k === 'yes') {
    res.redirect(`${baseUrl}/capital`)
  } else {
    res.redirect(`${baseUrl}/second-property`)
  }
})

router.post(`${baseUrl}/second-property-router`, (req, res) => {
  const hasSecondProperty = req.session.data['second-property']

  if (hasSecondProperty === 'yes') {
    res.redirect(`${baseUrl}/not-eligible`)
  } else {
    res.redirect(`${baseUrl}/check-your-answers`)
  }
})

module.exports = router
