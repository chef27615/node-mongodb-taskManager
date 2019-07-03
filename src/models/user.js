const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
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
        unique: true,
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

userSchema.statics.findByCreds = async (email, password) => {
    const user = await User.findOne({ email })
   
    if(!user){
        throw new Error('Unable to login')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

//hash plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User;