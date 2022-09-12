const mongoose = require('mongoose')

const UserData = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, index: { unique: true }},
        username: {type: String, required: true, index: { unique: true }},
        password: {type: String, required: true},
        mixingElements : { type : Array},
        isVerified: {type: Boolean, default: false, required: true, }
    },
    { collection: 'UserData' }
)


const model = mongoose.model('UserData', UserData)

module.exports = model