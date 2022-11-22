const mongoose = require('mongoose')

const FailedAttempts = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true
        },

        counter: {
            type: Number,
            default: 0
        },

        createdAt: {
            type: Date,
            expires: 3600,
            default: Date.now()
        }
    },
    { collection: 'FailedAttempts' }
)


const model = mongoose.model('FailedAttempts', FailedAttempts)

module.exports = model