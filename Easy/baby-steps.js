process.argv.shift(); process.argv.shift()
let sum = process.argv.reduce((a,b) => Number(a)+Number(b))
console.log(sum)