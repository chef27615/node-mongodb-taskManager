const express = require('express');
const Tasks = require('../models/task')
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Tasks.find({})
        tasks ? res.status(200).send(tasks) : res.status(404).send('no tasks listed')
    }catch(e){
        res.status(500).json(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const task = await Tasks.findById(_id)
        task ? res.status(200).send(task) : res.status(404).send('task id does not exist')
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) =>{
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

router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params
    try{
        const task = await Tasks.findByIdAndDelete(id)
        task ? res.status(200).send(task) : res.status(404).send()
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router