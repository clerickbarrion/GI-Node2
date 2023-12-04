const fs = require('fs')
fs.readdir(process.argv[2],(err, files)=>{
    files = files.filter(file => file.includes('.'+process.argv[3]))
    files.forEach(file => console.log(file))
})