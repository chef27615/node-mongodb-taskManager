const express = require('express')
require('./db/mongoose')
const taskRouter = require('./routers/taskRouter')
const userRouter = require('./routers/userRouter')
const app = express()
const port =process.env.PORT || 3000

app.use(express.json());

app.use(userRouter)

app.use(taskRouter)

app.listen(port, () => {
    console.log(`app started on ${port}`)
})

// const bcrypt = require('bcryptjs')

// const myfn = async () => {
//     const password = 'Red123456!'
//     const hashedPassword = await bcrypt.hash(password, 8)
//     console.log(password)
//     console.log(hashedPassword)
//     const isMatch = await bcrypt.compare('Red1234!', hashedPassword)
//     console.log(isMatch)
// }

// myfn()