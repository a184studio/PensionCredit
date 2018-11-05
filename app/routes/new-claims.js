const express = require('express');

const router = new express.Router();

router.post('/new-claims/has-partner-router', function (req, res) {
  const hasPartner = req.session.data['has-partner']

  if (hasPartner === 'yes') {
    res.redirect('/new-claims/partner-right-to-abode')
  } else {
    res.redirect('/new-claims/benefits')
  }
})

router.post('/new-claims/care-home-router', function (req, res) {
  const inCareHome = req.session.data['care-home']

  if (inCareHome === 'yes') {
    res.redirect('/new-claims/from-hospital')
  } else {
    res.redirect('/new-claims/postcode-lookup')
  }
})

router.post('/new-claims/care-home-permanence-router', function (req, res) {
  const permanence = req.session.data['care-home-permanence']

  if (permanence === 'yes') {
    res.redirect('/new-claims/care-home-funding')
  } else {
    res.redirect('/new-claims/postcode-lookup')
  }
})

router.post('/new-claims/address-choice-router', function (req, res) {
  const inCareHome = req.session.data['care-home']

  if (inCareHome === 'no') {
    res.redirect('/new-claims/home-ownership')
  } else {
    res.redirect('/new-claims/bbc')
  }
})

router.post('/new-claims/home-ownership-router', function (req, res) {
  const homeOwnership = req.session.data['home-ownership']

  if (homeOwnership === 'own') {
    res.redirect('/new-claims/ground-rent')
  } else if (homeOwnership === 'rent') {
    res.redirect('/new-claims/shared-tenancy')
  } else if (homeOwnership === 'neither') {
    res.redirect('/new-claims/other-people-you-live-with')
  }
})

router.post('/new-claims/money-you-have-router', function (req, res) {
  const hasMoney = req.session.data['has-money']

  if (hasMoney === 'yes') {
    res.redirect('/new-claims/cash')
  } else {
    res.redirect('/new-claims/earnings')
  }
})

module.exports = router;
