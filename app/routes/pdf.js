const got = require('got')
const fs = require('fs')
const path = require('path')
const express = require('express')
const {getMonth} = require('../filters')()

const router = new express.Router()

const freeSans = fs.readFileSync(path.join(__dirname, '../assets/fonts/FreeSans.ttf'))
const freeSansBold = fs.readFileSync(path.join(__dirname, '../assets/fonts/FreeSansBold.ttf'))
const freeSansBase64 = Buffer.from(freeSans).toString('base64')
const freeSansBoldBase64 = Buffer.from(freeSansBold).toString('base64')

const row = (type, definition) => definition ? `<dt>${type}</dt><dd>${definition}</dd>` : '';

router.get('/get-eligibility-pdf', async (req, res, next) => {
  const {data = {}} = req.session
  const html = `<html>
    <head>
        <style>
            body {
              font-family: 'FreeSans', sans-serif;
              padding: 5px;
            }
            h1 {
              font-family: 'FreeSansBold', sans-serif;
              font-weight: 400;
              border-bottom: 5px solid #005ea5;
              padding-bottom: 15px;
              margin-bottom: 2em;
            }
            dl {
              border-bottom: 1px solid #bfc1c3;
              padding-right: 4em;
              word-break: break-word;
              margin-bottom: 2em;
              padding: 0;
            }
            dl::after {
              content: "";
              display: block;
              clear: both;
            }
            dt,
            dd {
              border-top: 1px solid #bfc1c3;
              box-sizing: border-box;
              float: left;
              margin-left: 0;
              padding: .63158em 1.05263em .47368em 0;
              width: 50%;
            }
            dt {
              font-family: 'FreeSansBold', sans-serif;
              clear: left;
            }
        </style>
    </head>
    <body>
        <h1>Eligibility summary</h1>
        <dl>
          ${row('Who are you claiming pension credit for?', data['claiming-for'])}
          ${row('PC1 notepad', data['pc1-more-detail'])}
          ${row('Name', data['full-name'])}
          ${row('National Insurance number', data['nino'])}
          ${row('Telephone number', data['telephone-number'])}
          ${row('Date of birth', `${data['dob-day']} ${getMonth(data['dob-month'])} ${data['dob-year']}`)}
          ${row('Do you live in the UK?', data['resides-in-uk'])}
          ${row('Have you lived permanently in the UK for the last 2 years?', data['lived-abroad'])}
          ${row('Are you a UK national?', data['uk-national'])}
          ${row('Do you have a partner?', data['has-partner'])}
          ${row('Partner notes', data['partner-more-detail'])}
        </dl>
    </body>
</html>`

  res.setHeader('Content-disposition', 'attachment; filename=eligibility.pdf');
  res.setHeader('Content-type', 'application/pdf');

  const base64html = Buffer.from(html).toString('base64')

  try {
    const response = await got.post('https://do-a-pdf.herokuapp.com/generatePdf', {
      body: JSON.stringify({
        font_map: {
          "FreeSans": freeSansBase64,
          "FreeSansBold": freeSansBoldBase64
        },
        page_html: base64html,
        conformance_level: "PDFA_1_A"
      })
    })

    const pdf = Buffer.from(response.body, 'base64')

    res.send(pdf)
  } catch (error) {
    next(error)
  }
})

module.exports = router
