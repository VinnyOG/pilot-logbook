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
    const file = fs.readFileSync(path.join(entriesDir, filename), 'utf-8')
    const docs = yaml.parseAllDocuments(file)
    docs.forEach((doc) => {
      const entry = doc.toJSON()
      if (entry.date) {
        console.log(`Found a dated entry ${entry.date}`)
      }
      if (entry.signature) {
        console.log(`Found a page end signed ${entry.signature}`)
      }
    })
  })
})