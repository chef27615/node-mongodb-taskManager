const express = require('express')
require('./db/mongoose')
const taskRouter = require('./routers/taskRouter')
const userRouter = require('./routers/userRouter')
const app = express()
const port =process.env.PORT || 3000

app.use(express.json());

app.use(userRouter, taskRouter)

app.listen(port, () => {
    console.log(`app started on ${port}`)
})