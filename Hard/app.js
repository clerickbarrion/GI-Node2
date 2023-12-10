const express = require('express')
const app = express()
const fs = require('fs')

const port = 3000

// reads the json file and parses it
let file = JSON.parse(fs.readFileSync('./db.json').toString())

// opens server on local host and writes employee data from json file
app.get('/', (req,res)=>{
    res.writeHead(200,{"Content-Type": "text/html"})
    res.write('<h1 style="text-align:center">Employees</h1>')
    // writes all the employees
    file.employees.forEach(employee => {
        res.write(`
        <ul style="float:left; text-align:center; list-style-type: none; padding: 0; width: 25%;flex-direction: column;">
            <li>Id: ${employee.id}</li>
            <li>Name: ${employee.name}</li>
            <li>Salary: $${employee.salary}</li>
            <li>Department: ${employee.department}</li>
            <hr>
        </ul>
        `)
    })
    res.end()
})

// routes for certain employee ids
app.get('/:id', (req,res)=>{
    // finds employee id equal to the endpoint
    const employee = file.employees.find(employee => employee.id == req.params.id)
    res.writeHead(200,{"Content-Type": "text/html"})
    //writes the employee
    try {
        res.write('<h1 style="text-align:center;">Employee</h1>')
        res.write(`
            <ul style="text-align:center; list-style-type: none; padding: 0;">
                <li>Id: ${employee.id}</li>
                <li>Name: ${employee.name}</li>
                <li>Salary: $${employee.salary}</li>
                <li>Department: ${employee.department}</li>
                <hr>
            </ul>
            `)
    // writes error if employee not found
    } catch {
        res.statusCode = 404
        res.write(`<h1 style="text-align:center;">Error ${res.statusCode}: Employee ${req.params.id} not found</h1>`)
    }
    res.end()
})

app.listen(port)