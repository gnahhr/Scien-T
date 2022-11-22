const mongoose = require('mongoose')

const VerificationToken = new mongoose.Schema(
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
    { collection: 'VerificationToken' }
)


const model = mongoose.model('VerificationToken', VerificationToken)

module.exports = model