const fs = require('fs')
const path = require('path')

const yaml = require('yaml')

const dataDir = path.join(__dirname, '../../../data')
const entriesDir = path.join(dataDir, 'entries')

fs.readdir(entriesDir, (err, filenames) => {
  if (err) {
    console.error(err)
    return
  }
  filenames.forEach((filename) => {
    const date = new Date(filename.split('.')[0])
    const dateText = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    console.log(`Reading data for ${dateText}`)
    const file = fs.readFileSync(path.join(entriesDir, filename), 'utf-8')
    const docs = yaml.parseAllDocuments(file)
    docs.forEach((doc) => {
      const entry = doc.toJSON()
      if (entry.date) {
        console.log(`\tFound a dated entry ${entry.date}`)
      }
      if (entry.signature) {
        console.log(`\tFound a page end signed ${entry.signature}`)
      }
    })
  })
})