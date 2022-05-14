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

app.delete('/api/tasks/:param1/:param2/:param3', async function (req, res) {
    req.params.param1
    req.params.param3
    const id = req.params.taskid
    const task = await db.task.delete({
        where: {
            id: +id
        }
    })
    res.send(task)
})

app.get('/api/tasks/:taskid', async function (req, res) {
    const id = req.params.taskid
    const task = await db.task.findUnique({
        where: {
            id: +id
        }
    })
    res.send(task)
})

app.patch('/api/tasks/:taskid', async function (req, res) {
    const editedTask = req.body
    const id = req.params.taskid
    const taskFromDb = await db.task.update({
        where: {
            id: +id
        },
        data: editedTask
    })
    res.send(taskFromDb)
})

app.listen(3000)