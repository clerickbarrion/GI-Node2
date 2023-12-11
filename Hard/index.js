const express = require('express')
const app = express()

const port = 4000
const endpoint = 'http://localhost:3000'

// gets json file from api
async function getData(endpoint){ return fetch(endpoint).then(res=>res.json()) } 

// welcome page
app.get('/', (req,res)=>{
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write('<h1 style="text-align:center">Welcome to the employee database</h1>')
    res.end()
})

// gets employee array from api
app.get('/employees', async (req,res)=>{
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write('<h1 style="text-align:center">Employees</h1>')
    // waits for the promise to be resolved
    const employees = await getData(endpoint+req.url)
    // writes and formats the employees 
    employees.forEach(employee => {
        res.write(`
        <ul style="float:left; text-align:center; list-style-type: none; padding: 0; width: 25%;flex-direction: column;>
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

// gets specific employee from api
app.get('/employees/:id', async (req,res)=>{
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write('<h1 style="text-align:center;">Employee</h1>')
    // writes employee if exists
    try {
        const employee = await getData(endpoint+req.url)
        res.write(`
        <ul style="text-align:center; list-style-type: none; padding: 0;">
            <li>Id: ${employee.id}</li>
            <li>Name: ${employee.name}</li>
            <li>Salary: $${employee.salary}</li>
            <li>Department: ${employee.department}</li>
            <hr>
        </ul>
        `)
    // writes error if not
    } catch {
        res.write(`<h1 style="text-align:center;">Error 404: Employee ${req.params.id} not found</h1>`)
    }
    res.end()
})

app.listen(port)