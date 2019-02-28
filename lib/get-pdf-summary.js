'use strict'

const getPDF = require('./get-pdf')

const toDefinitionList = data => {
  return Object.keys(data)
    .reduce((str, key) => data[key] ? `${str}<dt>${key}</dt><dd>${data[key]}</dd>` : str, '<dl>') +
    '</dl>';
}

const getPDFSummary = async data => getPDF(
  `<html>
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
        <h1>${data.heading}</h1>
        <dl>
          ${toDefinitionList(data.summary)}
        </dl>
    </body>
  </html>`
)

module.exports = getPDFSummary
