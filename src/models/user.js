const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(input){
            if( input.length < 6 ){
                throw new Error('Minimum password length is 6')
            }else if(input.toLowerCase() === 'password'){
                throw new Error(`cannot use ${input} as password`)
            }else if(input.toString().toLowerCase().includes('password')){
                throw new Error(`your password cannot contain ${input}`)
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate( value ){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }
})

module.exports = User;