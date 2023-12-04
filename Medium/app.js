const fs = require('fs')
const file = fs.readFileSync('./planets.txt').toString()
console.log(file.replaceAll(',','\n'))