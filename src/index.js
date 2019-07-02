const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Tasks = require('./models/task')

const app = express()
const port =process.env.PORT || 3000

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    
    try{
        const users = await User.find({})
        users ? res.status(200).send(users) : res.status(404).send('no users here')
        
    }catch(e){
        res.status(500).send(e)
    }

})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        user ? res.status(200).send(user) : res.status(404).send('user does not exist')
    }catch(e){
        res.status(500).send(e)
    }

})

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    try{
        const user = await User.findByIdAndDelete(id)
        user ? res.status(200).send(user) : res.status(404).send()
    }catch(e){
        res.status(500).send()
    }
})

app.get('/tasks', async (req, res) => {
    try{
        const tasks = await Tasks.find({})
        tasks ? res.status(200).send(tasks) : res.status(404).send('no tasks listed')
    }catch(e){
        res.status(500).json(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const task = await Tasks.findById(_id)
        task ? res.status(200).send(task) : res.status(404).send('task id does not exist')
    }catch(e){
        res.status(500).send(e)
    }
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOp = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOp){
        return res.status(400).send({error: 'invalid updates'})
    }

    try{
        const newUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!newUser){
            return res.status(404).send()
        }
        res.status(201).send(newUser)
    }catch(e){
        res.status(400).send(e)
    }
})

app.patch('/tasks/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'description', 'completed' ]
    const isValidOp = updates.every(update => allowedUpdates.includes(update))
    if(!isValidOp){
        res.status(400).send({error:'not a valid update'})
    }
    try{
        const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, req.body, { runValidators:true, new:true })
        updatedTask? res.status(201).send(updatedTask) : res.status(404).send('task does not exist')
    }catch(e){
        res.status(400).send(e)
    }

})

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params
    try{
        const task = await Tasks.findByIdAndDelete(id)
        task ? res.status(200).send(task) : res.status(404).send()
    }catch(e){
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log(`app started on ${port}`)
})