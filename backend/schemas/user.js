const mongoose  = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const validRoles = {
    values: ["ADMIN", 'USER'],
    message: '{VALUE}, is not valid role.'
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: 'USER',
        required: [true],
        enum: validRoles
    }
});

userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    
    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique.'
})

module.exports = mongoose.model('users', userSchema);