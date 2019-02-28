'use strict'

const fs = require('fs')
const path = require('path')
const got = require('got')

const freeSans = fs.readFileSync(path.join(__dirname, '../app/assets/fonts/FreeSans.ttf'))
const freeSansBold = fs.readFileSync(path.join(__dirname, '../app/assets/fonts/FreeSansBold.ttf'))
const freeSansBase64 = Buffer.from(freeSans).toString('base64')
const freeSansBoldBase64 = Buffer.from(freeSansBold).toString('base64')

const getPDF = async html => {
  const base64html = Buffer.from(html).toString('base64')

  const body = `{"font_map": {"FreeSans": "${freeSansBase64}","FreeSansBold": "${freeSansBoldBase64}"},"page_html": "${base64html}","conformance_level": "PDFA_1_A"}`

  const response = await got.post('https://do-a-pdf.herokuapp.com/generatePdf', {body})

  const pdf = Buffer.from(response.body, 'base64')

  return pdf
}

module.exports = getPDF
