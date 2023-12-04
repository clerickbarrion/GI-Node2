const fs = require('fs')
fs.readFile(process.argv[2], (err, data) => {
    data = data.toString()
    console.log(data.split('\n').length - 1)
})