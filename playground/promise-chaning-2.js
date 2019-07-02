require('../src/db/mongoose')
const Tasks = require('../src/models/task')

// Tasks.findByIdAndDelete('5d1629aa761f4605ff51a981', {completed: false}).then(task => {
//     console.log(task)
//     return Tasks.countDocuments({ completed: false })
// }).then(result => console.log(result)).catch(e => console.log(e))

const deleteTaskAndCount = async (_id) => {
    const task = await Tasks.findByIdAndDelete({_id});
    const count = await Tasks.countDocuments({ completed: false});
    return count;
}

deleteTaskAndCount('5d141866954b2f01c340b3b5').then(count => {
    console.log(count)
}).catch(e => console.log(e))