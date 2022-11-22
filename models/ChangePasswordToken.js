const mongoose = require('mongoose')

const ChangePasswordToken = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },

        token: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            expires: 3600,
            default: Date.now()
        }
    },
    { collection: 'ChangePasswordToken' }
)


const model = mongoose.model('ChangePasswordToken', ChangePasswordToken)

module.exports = model