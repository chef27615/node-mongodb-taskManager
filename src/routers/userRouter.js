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

module.exports = router