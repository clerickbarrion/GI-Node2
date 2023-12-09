const express = require('express')
const app = express()
const https = require('https')

// contains json
let endpoint = 'https://my-json-server.typicode.com/clerickbarrion/GI-Node2/employees'
const port = 3000

// gets the json data
let data = ''
https.get(endpoint, (res)=>{
    res.on('data', chunk => {
        data += chunk.toString()
    })
    res.on('end', ()=>{
        data = JSON.parse(data)
    })
})

// opens server on local host and writes employee data from json file
app.get('/', (req,res)=>{
    res.writeHead(200,{"Content-Type": "text/html"})
    res.write('<h1 style="text-align:center">Employees</h1>')
    data.forEach(employee => {
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
    const employee = (Array.from(data).filter(employee => employee.id == req.params.id))[0]
    res.writeHead(200,{"Content-Type": "text/html"})
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
        res.end()
    } catch(err){
        res.statusCode = 404
        res.write(`<h1 style="text-align:center;">Error ${res.statusCode}: Employee ${req.params.id} not found</h1>`)
        res.end()
    }
    
})

app.listen(port)