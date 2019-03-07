const fs = require('fs')
const path = require('path')
const express = require('express')
const getPdf = require('../get-pdf')
const {getMonth, formatDate, formatNINO} = require('../filters')()

const router = new express.Router()

router.get('/get-eligibility-pdf', async (req, res, next) => {
  const formData = req.session.data

  const pdfData = {
    heading: `Pension Credit claim for: ${formData['full-name']}`,
    date: formatDate(),
    agent: formData['agent'] || 'Dave',
    sections: [
      {
        heading: 'Eligibility',
        fields: [
          {
            key: 'Who are you claiming pension credit for?',
            value: formData['claiming-for']
          },
          {
            key: 'PC1 Notes',
            value: formData['pc1-more-detail']
          },
          {
            key: 'Name',
            value: formData['full-name']
          },
          {
            key: 'National Insurace number',
            value: formatNINO(formData['nino'])
          },
          {
            key: 'Telephone number you called on',
            value: formData['telephone-number']
          },
          {
            key: 'Date of birth',
            value: `${formData['dob-day']} ${getMonth(formData['dob-month'])} ${formData['dob-year']}`
          }
        ]
      }
    ]
  }

  res.setHeader('Content-disposition', 'attachment; filename=eligibility.pdf')
  res.setHeader('Content-type', 'application/pdf')

  try {
    const pdf = await getPdf(pdfData)
    res.send(pdf)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
