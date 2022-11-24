const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const { Parser } = require('json2csv')
const { getDate } = require('./utils/helpers')
var cron = require('node-cron')
const getUuid = require('uuid-by-string')
const { handleNewCheerio } = require('./utils/helpers')

const fn = async () => {
  const date = getDate()
  if (!fs.existsSync(`./savedCsvFiles/${date}.csv`)) {
    let news = await handleNewCheerio(false)

    const parserObj = new Parser()
    const csv = parserObj.parse(news)
    fs.appendFileSync(`./savedCsvFiles/${date}.csv`, csv)
    fs.appendFileSync(`./savedCsvFiles/${date}.csv`, '\r\n')
  } else {
    let news = await handleNewCheerio(true)
    const parserObj = new Parser({ header: false })
    const csv = parserObj.parse(news)
    fs.appendFileSync(`./savedCsvFiles/${date}.csv`, csv)
  }
}

module.exports.task = cron.schedule('*/15 * * * *', () => {
  console.log('Checking Latest News')
  fn()
})
