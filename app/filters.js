const differenceInDays = require('date-fns/difference_in_days')

const months = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const GBP = new Intl.NumberFormat('en-GB', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: 'currency',
  currency: 'GBP'
})

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {
    upperCaseFirst (string) {
      return string && string[0].toUpperCase() + string.slice(1)
    },
    getMonth (month) {
      const monthIndex = parseInt(month, 10) - 1
      return months[monthIndex]
    },
    formatDate (input) {
      const date = input ? new Date(input) : new Date()
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
      return day + ' ' + months[month] + ' ' + year
    },
    formatMoney (money) {
      const sanitised = money ? String(money).replace(/[^0-9.]/g, '') : 0
      return GBP.format(sanitised)
    },
    formatNINO (nino) {
      if (!nino) {
        return ''
      }

      const noSpacesUppercase = nino.replace(/\s+/g, '').toUpperCase()
      return [...noSpacesUppercase].reduce((a, b, i) => i % 2 ? a + b : a + ' ' + b)
    },
    formatJSON (object) {
      return JSON.stringify(object, null, '  ')
    },
    dayDiff (arr) {
      return differenceInDays(...arr.map(v => new Date(v.reduce((a, b) => a + '-' + b))))
    },
    removeAlreadyPickedBenefits (benefitRadios, benefitsChosen = [], excluded) {
      return benefitRadios.filter(benefit => !(excluded ? benefitsChosen.filter(b => b['benefit-type'] !== excluded) : benefitsChosen).some(b => b['benefit-type'] === benefit.value))
    }
  }

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
