const mongoose = require('mongoose')

const UserData = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, index: { unique: true }},
        username: {type: String, required: true, index: { unique: true }},
        password: {type: String, required: true},

        mixingElements : {type : Array},
        
        pointsEC: {type: Number, default: 0},
        atomicNumberEC:{type: Array},

        intellimentEasyHS:{type: Number, default: 0},
        intellimentNormalHS:{type: Number, default: 0},
        intellimentHardHS:{type: Number, default: 0},
        intellimentHardcoreHS:{type: Number, default: 0},

        intellimentEasy:{type: Array, default: 0},
        intellimentNormal:{type: Array, default: 0},
        intellimentHard:{type: Array, default: 0},
        intellimentHardcore:{type: Array, default: 0},

        isVerified: {type: Boolean, default: false, required: true, }
    },
    { collection: 'UserData' }
)


const model = mongoose.model('UserData', UserData)

module.exports = model

//electronConfigPoints: {type: Number, default: 0},
//electronConfigAtomicNumber: {type: Array},