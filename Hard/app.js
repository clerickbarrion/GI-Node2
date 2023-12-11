const express = require('express')
const app = express()
const fs = require('fs')

const port = 3000

// reads the json file and parses it
let file = JSON.parse(fs.readFileSync('./db.json').toString())

// writes raw json file
app.get('/', (req,res)=>{
    res.writeHead(200,{"Content-Type": "application/json"})
    res.write(JSON.stringify(file))
    res.end()
})

// writes employee array
app.get('/employees', (req,res)=>{
    res.writeHead(200,{"Content-Type": "application/json"})
    // writes all the employees
    res.write(JSON.stringify(file.employees))
    res.end()
})

// routes for certain employee ids
app.get('/employees/:id', (req,res)=>{
    // finds employee id equal to the endpoint
    const employee = file.employees.find(employee => employee.id == req.params.id)
    res.writeHead(200,{"Content-Type": "application/json"})
    //writes the employee
    try {
        res.write(JSON.stringify(employee))
    // writes error if employee not found
    } catch {
        res.statusCode = 404
        res.write(`Error ${res.statusCode}: Employee ${req.params.id} not found`)
    }
    res.end()
})

app.listen(port)