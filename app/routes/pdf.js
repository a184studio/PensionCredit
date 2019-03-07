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
      },
      {
        heading: 'Partner',
        fields: [
          {
            key: 'Do you have a partner?',
            value: formData['has-partner']
          },
          {
            key: 'Partner notes',
            value: formData['partner-more-detail']
          }
        ]
      },
      {
        heading: 'Residency',
        fields: [
          {
            key: 'Do you live in the UK?',
            value: formData['resides-in-uk']
          },
          {
            key: 'Have you lived in UK for 2 years?',
            value: formData['lived-abroad']
          },
          {
            key: 'Are you a UK National?',
            value: formData['uk-national']
          }
        ]
      }
    ]
  }

  try {
    const pdf = await getPdf(pdfData)
    res.setHeader('Content-disposition', 'attachment; filename=eligibility.pdf')
    res.setHeader('Content-type', 'application/pdf')
    res.send(pdf)
  } catch (error) {
    next(error)
  }
})

module.exports = router
