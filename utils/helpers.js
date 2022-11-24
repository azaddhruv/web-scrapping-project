const axios = require('axios')
const cheerio = require('cheerio')
const getUuid = require('uuid-by-string')
const csvToJSON = require('csvtojson')

const getDate = () => {
  let date = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
  })
  date = date.split(',')[0]
  date = date.split('/')
  date = date.join('-')
  return date
}

const handleNewCheerio = async (update) => {
  const date = getDate()
  const news = []
  if (!update) {
    const res = await axios('https://news.ycombinator.com/newest')
    const $ = cheerio.load(res.data)
    $('.athing').each((i, el) => {
      const title = $(el).find('.titleline').text().replaceAll(',', '')
      const next = $(el).next()
      const votes = $(next).find('.score').text().split(' ')[0]
      const author = $(next).find('.hnuser').text()
      const time = $(next).find('.age').attr('title').split('T')[0]
      const comment = $(next).find('.hnpast+a').text().split(' ')[0]
      const simplifyComment = comment === 'discuss' ? '0' : comment
      const id = getUuid(`${author}${time}`)
      news.push({ id, title, author, time, votes, simplifyComment })
    })
    return news
  } else {
    const oldNews = await csvToJSON().fromFile(`./savedCsvFiles/${date}.csv`)
    const latestNews = await axios('https://news.ycombinator.com/newest')
    const $ = cheerio.load(latestNews.data)
    $('.athing').each((i, el) => {
      const title = $(el).find('.titleline').text().replaceAll(',', '')
      const next = $(el).next()
      const votes = $(next).find('.score').text().split(' ')[0]
      const author = $(next).find('.hnuser').text()
      const time = $(next).find('.age').attr('title').split('T')[0]
      const comments = $(next).find('.hnpast+a').text().split(' ')[0]
      const simplifyComment = comments === 'discuss' ? '0' : comments
      const id = getUuid(`${author}${time}`)
      let present = false
      for (let posts of oldNews) {
        if (posts.id === id) {
          present = true
          break
        }
      }
      if (present === false) {
        news.push({ id, title, author, time, votes, simplifyComment })
      }
    })
    return news
  }
}

module.exports = { getDate, handleNewCheerio }
