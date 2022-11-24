const express = require('express')
const app = express()
const fs = require('fs')
const csvToJSON = require('csvtojson')
const { task } = require('./scrape')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Executing in every 15 mins
task.start()

app.get('/news/:date', async (req, res) => {
  const { date } = req.params
  if (fs.existsSync(`./savedCsvFiles/${date}.csv`)) {
    const arr = await csvToJSON().fromFile(`./savedCsvFiles/${date}.csv`)
    console.log(arr)
    res.json(arr)
  } else {
    res.send('Data not available')
  }
})

app.get('*', (req, res) => {
  res.status(404).send('Not Avaialable')
})

app.listen(3000, () => {
  console.log('started listining on port 3000')
})
