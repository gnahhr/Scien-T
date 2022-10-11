const mongoose = require('mongoose')

const UserTimeout = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            index: { unique: true }
        },
        
        createdAt: {
            type: Date,
            expires: 120,
            default: Date.now()
        }
    },
    { collection: 'UserTimeout' }
)


const model = mongoose.model('UserTimeout', UserTimeout)

module.exports = model