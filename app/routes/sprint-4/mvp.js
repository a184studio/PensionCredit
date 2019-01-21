const express = require('express')
const { getStatePensionDate } = require('get-uk-state-pension-date')
const differenceInDays = require('date-fns/difference_in_days')
const startOfDay = require('date-fns/start_of_day')

const router = new express.Router()
const baseUrl = '/sprint-4/mvp'

router.post(`${baseUrl}/who-is-caller-router`, (req, res) => {
  const claimingFor = req.session.data['claiming-for']

  if (claimingFor === 'Myself') {
    res.redirect(`${baseUrl}/security`)
  } else {
    res.redirect(`${baseUrl}/has-help`)
  }
})

router.post(`${baseUrl}/security-router`, (req, res) => {
  const passedSecurity = req.session.data['passed-security']

  if (passedSecurity === 'Yes') {
    res.redirect(`${baseUrl}/name-and-nino`)
  } else {
    res.redirect(`${baseUrl}/agent-action`)
  }
})

router.post(`${baseUrl}/over-spa-router`, (req, res) => {
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
      req.session.data['spa-date'] = maleSpaDate
      res.redirect(`${baseUrl}/reside-in-uk`)
    } else if (daysSinceMaleSPA < 0 && daysSinceFemaleSPA < 0) {
      res.redirect(`${baseUrl}/reside-in-uk`)
    } else {
      res.redirect(`${baseUrl}/sex`)
    }
  } catch (err) {
    res.redirect(`${baseUrl}/reside-in-uk`)
  }
})

router.post(`${baseUrl}/sex-router`, (req, res) => {
  try {
    const dob = req.session.data['dob-year'] + '-' +
      req.session.data['dob-month'].padStart(2, '0') + '-' +
      req.session.data['dob-day'].padStart(2, '0')

    const sex = req.session.data['sex'] || 'M'
    const spaDate = getStatePensionDate(dob, sex)

    req.session.data['spa-date'] = spaDate
    res.redirect(`${baseUrl}/reside-in-uk`)
  } catch (err) {
    res.redirect(`${baseUrl}/reside-in-uk`)
  }
})

router.post(`${baseUrl}/home-ownership-router`, (req, res) => {
  const homeOwnership = req.session.data['home-ownership']

  if (homeOwnership === 'Owned') {
    res.redirect(`${baseUrl}/service-charges`)
  } else if (homeOwnership === 'Care home') {
    res.redirect(`${baseUrl}/is-care-home-permanent`)
  } else if (homeOwnership === 'Rented') {
    res.redirect(`${baseUrl}/rent-housing-council-tax`)
  } else {
    res.redirect(`${baseUrl}/address-summary`)
  }
})

router.post(`${baseUrl}/mortgage-router`, (req, res) => {
  const hasMortgage = req.session.data['has-mortgage']

  if (hasMortgage === 'Yes') {
    res.redirect(`${baseUrl}/mortgage-yes`)
  } else {
    res.redirect(`${baseUrl}/address-summary`)
  }
})


router.post(`${baseUrl}/has-work-router`, (req, res) => {
  const hasWork = req.session.data['has-work']

  if (hasWork === 'yes') {
    res.redirect(`${baseUrl}/about-your-employment`)
  } else {
    res.redirect(`${baseUrl}/self-employed`)
  }
})

router.post(`${baseUrl}/self-employed-router`, (req, res) => {
  const selfEmployed = req.session.data['self-employed']

  if (selfEmployed === 'yes') {
    res.redirect(`${baseUrl}/about-your-self-employment`)
  } else {
    res.redirect(`${baseUrl}/other-income`)
  }
})

router.post(`${baseUrl}/other-income-router`, (req, res) => {
  const otherIncome = req.session.data['other-income']

  if (otherIncome === 'yes') {
    res.redirect(`${baseUrl}/about-your-other-income`)
  } else {
    res.redirect(`${baseUrl}/money-summary`)
  }
})

router.post(`${baseUrl}/type-of-account-router`, (req, res) => {
  const accountType = req.session.data['account-type']

  if (accountType === 'uk') {
    res.redirect(`${baseUrl}/uk-account`)
  } else {
    res.redirect(`${baseUrl}/international-account`)
  }
})

router.post(`${baseUrl}/type-of-account-router`, (req, res) => {
  const accountType = req.session.data['account-type']

  if (accountType === 'uk') {
    res.redirect(`${baseUrl}/uk-account`)
  } else {
    res.redirect(`${baseUrl}/international-account`)
  }
})

router.post(`${baseUrl}/home-ownership-router`, (req, res) => {
  const homeOwnership = req.session.data['home-ownership']

  if (homeOwnership === 'Owned') {
    res.redirect(`${baseUrl}/service-charges`)
  } else if (homeOwnership === 'Care home') {
    res.redirect(`${baseUrl}/is-care-home-permanent`)
  } else {
    res.redirect(`${baseUrl}/address-summary`)
  }
})

router.post(`${baseUrl}/mortgage-router`, (req, res) => {
  const hasMortgage = req.session.data['has-mortgage']

  if (hasMortgage === 'Yes') {
    res.redirect(`${baseUrl}/mortgage-yes`)
  } else {
    res.redirect(`${baseUrl}/owns-council-tax`)
  }
})

router.post(`${baseUrl}/money-you-have-router`, (req, res) => {
  const hasOver10k = req.session.data['over-10k']

  if (hasOver10k === 'yes') {
    res.redirect(`${baseUrl}/has-current-account`)
  } else {
    res.redirect(`${baseUrl}/money-summary`)
  }
})

router.post(`${baseUrl}/hospital-time-router`, (req, res) => {
  const accountType = req.session.data['hospital-yn']

  if (accountType === 'Yes') {
    res.redirect(`${baseUrl}/add-hospital-dates`)
  } else {
    res.redirect(`${baseUrl}/address-summary`)
  }
})



module.exports = router
