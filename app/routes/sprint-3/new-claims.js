const express = require('express')
const {getStatePensionDate} = require('get-uk-state-pension-date');

const router = new express.Router()
const baseUrl = '/sprint-3/new-claims'

router.post(`${baseUrl}/who-is-caller-router`, (req, res) => {
  const claimingFor = req.session.data['claiming-for']

  if (claimingFor === 'Myself') {
    res.redirect(`${baseUrl}/over-spa`)
  } else {
    res.redirect(`${baseUrl}/who-are-you`)
  }
})

router.post(`${baseUrl}/over-spa-router`, (req, res) => {
  try {
    const sex = req.session.data['sex']
    const dob = req.session.data['dob-year'] + '-' +
      req.session.data['dob-month'].padStart(2, '0') + '-' +
      req.session.data['dob-day'].padStart(2, '0')

    const spaDate = getStatePensionDate(dob, sex);

    if (new Date(spaDate) <= new Date()) {
      res.redirect(`${baseUrl}/reside-in-uk`)
    } else {
      res.redirect(`${baseUrl}/not-eligible`)
    }
  } catch (err) {
    res.redirect(`${baseUrl}/reside-in-uk`)
  }
})

router.post(`${baseUrl}/reside-in-uk-router`, (req, res) => {
  const residesInUk = req.session.data['resides-in-uk']

  if (residesInUk === 'Yes') {
    res.redirect(`${baseUrl}/lived-abroad`)
  } else {
    res.redirect(`${baseUrl}/not-eligible`)
  }
})

router.post(`${baseUrl}/lived-abroad-router`, (req, res) => {
  const livedAbroad = req.session.data['lived-abroad']

  if (livedAbroad === 'Yes') {
    res.redirect(`${baseUrl}/hrt`)
  } else {
    res.redirect(`${baseUrl}/uk-national`)
  }
})

router.post(`${baseUrl}/uk-national-router`, (req, res) => {
  const ukNational = req.session.data['uk-national']

  if (ukNational === 'Yes') {
    res.redirect(`${baseUrl}/claim-date`)
  } else {
    res.redirect(`${baseUrl}/hrt`)
  }
})

router.post(`${baseUrl}/security-router`, (req, res) => {
  const passedSecurity = req.session.data['passed-security']

  if (passedSecurity === 'Yes') {
    res.redirect(`${baseUrl}/eligibility-summary`)
  } else {
    res.redirect(`${baseUrl}/agent-action`)
  }
})

router.post(`${baseUrl}/can-contact-router`, (req, res) => {
  const contactOptions = req.session.data['contact-options']

  if (contactOptions.includes('Text') &&  contactOptions.includes('Phone call')) {
    res.redirect(`${baseUrl}/mobile-call`)
  } else if (contactOptions.includes('Text')) {
    res.redirect(`${baseUrl}/mobile`)
  } else if (contactOptions.includes('Phone call')) {
    res.redirect(`${baseUrl}/landline`)
  } else if (contactOptions.includes('Email')) {
    res.redirect(`${baseUrl}/email`)
  } else {
    res.redirect(`${baseUrl}/disability`)
  }
})

router.post(`${baseUrl}/mobile-call-router`, (req, res) => {
  const contactOptions = req.session.data['contact-options']

  if (contactOptions.includes('Email')) {
    res.redirect(`${baseUrl}/email`)
  } else {
    res.redirect(`${baseUrl}/disability`)
  }
})

router.post(`${baseUrl}/home-ownership-router`, (req, res) => {
  const homeOwnership = req.session.data['home-ownership']

  if (homeOwnership === 'Owns') {
    res.redirect(`${baseUrl}/service-charges`)
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

router.post(`${baseUrl}/has-partner-router`, (req, res) => {
  const hasPartner = req.session.data['has-partner']
  const homeOwnership = req.session.data['home-ownership']

  if (hasPartner === 'Yes') {
    res.redirect(`${baseUrl}/about-partner`)
  } else if (homeOwnership === 'Owns') {
    res.redirect(`${baseUrl}/anyone-living-with-you`)
  } else {
    res.redirect(`${baseUrl}/household-summary`)
  }
})

router.post(`${baseUrl}/about-partner-router`, (req, res) => {
  const homeOwnership = req.session.data['home-ownership']

  if (homeOwnership === 'Owns') {
    res.redirect(`${baseUrl}/anyone-living-with-you`)
  } else {
    res.redirect(`${baseUrl}/household-summary`)
  }
})

router.post(`${baseUrl}/anyone-living-with-you-router`, (req, res) => {
  const homeOwnership = req.session.data['home-ownership']

  if (homeOwnership === 'Owns') {
    res.redirect(`${baseUrl}/other-people-who-live-with-you`)
  } else {
    res.redirect(`${baseUrl}/household-summary`)
  }
})

router.post(`${baseUrl}/other-people-who-live-with-you-router`, (req, res) => {
  const personType = req.session.data['person-type']

  if (personType === 'Child under 16') {
    res.redirect(`${baseUrl}/about-child`)
  } else {
    res.redirect(`${baseUrl}/household-summary`)
  }
})

module.exports = router
