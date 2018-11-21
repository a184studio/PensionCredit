const express = require('express')

const router = new express.Router()
const baseUrl = '/sprint-2/monolith'

router.post(`${baseUrl}/add-admission`, (req, res) => {
  req.session.data.admissions = req.session.data.admissions || []
  req.session.data.admissions.push(req.body)
  res.redirect(`${baseUrl}/index#admissions`)
})

router.get(`${baseUrl}/change-admission/:admission`, (req, res) => {
  req.session.data.admissions = req.session.data.admissions || []
  const admissionIndex = parseInt(req.params.admission, 10)
  const admission = req.session.data.admissions[admissionIndex]

  if (!admission) {
    return res.redirect(`${baseUrl}/index`)
  }

  res.render(`sprint-2/monolith/add-admission.html`, {
    admissionType: admission['admission-type'],
    dateInDay: admission['date-in-day'],
    dateInMonth: admission['date-in-month'],
    dateInYear: admission['date-in-year'],
    dateOutDay: admission['date-out-day'],
    dateOutMonth: admission['date-out-month'],
    dateOutYear: admission['date-out-year']
  })
})

router.post(`${baseUrl}/change-admission/:admission`, (req, res) => {
  const admissionIndex = parseInt(req.params.admission, 10)
  req.session.data.admissions = req.session.data.admissions || []
  req.session.data.admissions[admissionIndex] = req.body
  res.redirect(`${baseUrl}/index#admissions`)
})

module.exports = router
