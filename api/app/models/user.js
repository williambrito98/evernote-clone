const mongoose = require('mongoose')
const { hash } = require('bcrypt')
const { compare } = require('bcrypt')
let userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true
    },
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
})

userSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {

        hash(this.password, 10, (err, hashed) => {
            if (err) return next(err)
            this.password = hashed
            next()
        })
    }
})

userSchema.methods.isCorrectPassword = function (password, callback) {
    compare(password, this.password, function (err, success) {
        if (err) return callback()

        callback(err, success)
    })
}

module.exports = mongoose.model('User', userSchema)