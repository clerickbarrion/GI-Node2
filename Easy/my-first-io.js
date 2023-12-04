const fs = require('fs')
let file = fs.readFileSync(process.argv[2]).toString()
console.log(file.split('\n').length - 1)