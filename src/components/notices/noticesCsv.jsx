const fs = require('fs')

const content = 'Some content!'

Window.fs.writeFile('test.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})