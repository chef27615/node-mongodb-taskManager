const express = require('express')
const router = new express.Router()
const User = require('../models/user')

// router.get('/test', (req, res) => {
//     res.send('dif file')
// })

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
   const { email, password } = req.body
   
    try{
        const user = await User.findByCreds(email, password)
        res.send(user)
    }catch(e){
        res.status(400).send('login failed')
    }
})


router.get('/users', async (req, res) => {
    
    try{
        const users = await User.find({})
        users ? res.status(200).send(users) : res.status(404).send('no users here')
        
    }catch(e){
        res.status(500).send(e)
    }

})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        user ? res.status(200).send(user) : res.status(404).send('user does not exist')
    }catch(e){
        res.status(500).send(e)
    }

})

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    try{
        const user = await User.findByIdAndDelete(id)
        user ? res.status(200).send(user) : res.status(404).send()
    }catch(e){
        res.status(500).send()
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
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        // const newUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!user){
            return res.status(404).send()
        }
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router