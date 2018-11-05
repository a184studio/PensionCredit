const express = require('express');

const router = new express.Router();

router.post('/new-claims/has-partner-router', (req, res) => {
  const hasPartner = req.session.data['has-partner']

  if (hasPartner === 'yes') {
    res.redirect('/new-claims/partner-right-to-abode')
  } else {
    res.redirect('/new-claims/benefits')
  }
})

router.post('/new-claims/care-home-router', (req, res) => {
  const inCareHome = req.session.data['care-home']

  if (inCareHome === 'yes') {
    res.redirect('/new-claims/from-hospital')
  } else {
    res.redirect('/new-claims/postcode-lookup')
  }
})

router.post('/new-claims/care-home-permanence-router', (req, res) => {
  const permanence = req.session.data['care-home-permanence']

  if (permanence === 'yes') {
    res.redirect('/new-claims/care-home-funding')
  } else {
    res.redirect('/new-claims/postcode-lookup')
  }
})

router.post('/new-claims/address-choice-router', (req, res) => {
  const inCareHome = req.session.data['care-home']

  if (inCareHome === 'no') {
    res.redirect('/new-claims/home-ownership')
  } else {
    res.redirect('/new-claims/money-you-have')
  }
})

router.post('/new-claims/home-ownership-router', (req, res) => {
  const homeOwnership = req.session.data['home-ownership']

  if (homeOwnership === 'own') {
    res.redirect('/new-claims/ground-rent')
  } else if (homeOwnership === 'rent') {
    res.redirect('/new-claims/shared-tenancy')
  } else if (homeOwnership === 'neither') {
    res.redirect('/new-claims/other-people-you-live-with')
  }
})

router.post('/new-claims/money-you-have-router', (req, res) => {
  const hasMoney = req.session.data['has-money']

  if (hasMoney === 'yes') {
    res.redirect('/new-claims/cash')
  } else {
    res.redirect('/new-claims/has-private-pension')
  }
})

router.post('/new-claims/has-private-pension-router', (req, res) => {
  const hasPensions = req.session.data['has-private-pensions']

  if (hasPensions === 'yes') {
    res.redirect('/new-claims/about-your-pensions')
  } else {
    res.redirect('/new-claims/has-work')
  }
})

router.post('/new-claims/has-work-router', (req, res) => {
  const hasWork = req.session.data['has-work']

  if (hasWork === 'yes') {
    res.redirect('/new-claims/about-your-employment')
  } else {
    res.redirect('/new-claims/self-employed')
  }
})

router.post('/new-claims/self-employed-router', (req, res) => {
  const selfEmployed = req.session.data['self-employed']

  if (selfEmployed === 'yes') {
    res.redirect('/new-claims/about-your-self-employment')
  } else {
    res.redirect('/new-claims/other-income')
  }
})

router.post('/new-claims/other-income-router', (req, res) => {
  const otherIncome = req.session.data['other-income']

  if (otherIncome === 'yes') {
    res.redirect('/new-claims/about-your-other-income')
  } else {
    res.redirect('/new-claims/type-of-account')
  }
})

router.post('/new-claims/type-of-account-router', (req, res) => {
  const accountType = req.session.data['account-type']

  if (accountType === 'uk') {
    res.redirect('/new-claims/uk-account')
  } else {
    res.redirect('/new-claims/international-account')
  }
})

module.exports = router;
