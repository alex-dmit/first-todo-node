const express = require('express')
const fs = require('fs')
const app = express()
let db = require('./db.json')

// API - application programming interface

app.use(express.json())

// route
// pathname
// TODO getone, editone
// RESTfull API
// CRUD (Create, Read, Update, Delete)

app.get('/api/tasks', function (req, res) {
    res.send(db)
})

app.post('/api/tasks', function (req, res) {
    const task = req.body
    db.push(task)
    saveDb()
    res.send(db)
})

app.delete('/api/tasks/:taskid', function (req, res) {
    const id = req.params.taskid
    db = db.filter((task) => {
        return task.id !== +id
    })
    saveDb()
    res.send(db)
})

app.patch('/api/tasks/:taskid', function (req, res) {
    const editedTask = req.body
    const id = req.params.taskid
    // ...
    res.send(db)
})

app.listen(3000)

function saveDb() {
    fs.writeFileSync('./db.json',
        JSON.stringify(db, null, 2),
        { encoding: 'utf8' })
}
