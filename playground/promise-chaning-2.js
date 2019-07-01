require('../src/db/mongoose')
const Tasks = require('../src/models/task')

Tasks.findByIdAndDelete('5d1629aa761f4605ff51a981', {completed: false}).then(task => {
    console.log(task)
    return Tasks.countDocuments({ completed: false })
}).then(result => console.log(result)).catch(e => console.log(e))