//CRUD create, read, update, delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'



MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => { //connect to server
    if(error) {
        return console.log('unable to connect to database')
    }

    const db = client.db(databaseName) //calling the database used
    
    db.collection('users').updateOne({
        _id: new ObjectID('5d10dac31485f372b1533e6a')
    }, {
        $inc: {
            age : 1
        }
    }).then( result => console.log(result)).catch(err => console.log(err))
   
})