const express = require('express')
const fs = require('fs')
const app = express()
// let db = require('./db.json')

const PrismaClient = require('@prisma/client').PrismaClient

const db = new PrismaClient()

// API - application programming interface

app.use(express.json())

// route
// pathname
// TODO getone, editone
// RESTfull API
// CRUD (Create, Read, Update, Delete)

app.get('/api/tasks', async function (req, res) {
    const allTasks = await db.task.findMany()
    res.send(allTasks)
})

app.post('/api/tasks', async function (req, res) {
    const task = req.body
    const taskFromDb = await db.task.create({
        data: task
    })
    res.send(taskFromDb)
})

app.delete('/api/tasks/:taskid', async function (req, res) {
    const id = req.params.taskid
    const task = await db.task.delete({
        where: {
            id: +id
        }
    })
    res.send(task)
})

// ############## DZ ##############
app.get('/api/tasks:id', async function (req, res) {
    const id = req.params.taskid
    // ...
})

app.patch('/api/tasks/:taskid', async function (req, res) {
    const editedTask = req.body
    const id = req.params.taskid
    // ...
    // res.send(db)
})
// ############## DZ ##############


app.listen(3000)

function saveDb() {
    fs.writeFileSync('./db.json',
        JSON.stringify(db, null, 2),
        { encoding: 'utf8' })
}
