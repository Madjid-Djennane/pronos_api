const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const { Users } = require('../../../helpers/constants')

const userSchema = new mongoose.Schema(
    {
        username: { type: String, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false,
            minlength: [6, 'Password too short (min 6 chars.)']
        },
        role: {type: String, enum: [Users.ADMIN, Users.BASIC], default: Users.BASIC}
    }
)

userSchema.pre('save', function (next) {
    // password
    const user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, null, function (error, hash) {
                if (error) {
                    return next(error)
                }
                user.password = hash
            })
        })
    }
    return next()
})

userSchema.methods.generateJwt = function () {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 7)
    const payload = {
        _id: this._id,
        exp: parseInt(expiry.getTime() / 1000)
    }
    return jwt.sign(payload, process.env.SECRET)
}

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

// Handle 11000 duplicate key
userSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        const err = new Error('User already exists')
        err.code = 400
        next(err)
    } else {
        next(error)
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }