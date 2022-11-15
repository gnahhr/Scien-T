const mongoose = require('mongoose')

const UserData = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        gender: {type: String, required: true},
        email: {type: String, required: true, index: { unique: true }},
        username: {type: String, required: true, index: { unique: true }},
        password: {type: String, required: true},

        topEquipped: {type: Array},
        bottomEquipped: {type: Array},
        accessoryEquipped: {type: Array},
        
        topOwned: {type: Array},
        bottomOwned: {type: Array},
        accessoryOwned: {type: Array},

        mixingElements : {type : Array},
        
        pointsEC: {type: Number, default: 0},

        intellimentEasyHS:{type: Number, default: 0},
        intellimentNormalHS:{type: Number, default: 0},
        intellimentHardHS:{type: Number, default: 0},
        intellimentHardcoreHS:{type: Number, default: 0},

        intellimentEasy:{type: Array},
        intellimentNormal:{type: Array},
        intellimentHard:{type: Array},
        intellimentHardcore:{type: Array},

        intellimentEasyCounter:{type: Array},
        intellimentNormalCounter:{type: Array},
        intellimentHardCounter:{type: Array},
        intellimentHardcoreCounter:{type: Array},

        battleElementName:{type: Number, default: 3},
        battleAtomicNumber:{type: Number, default: 3},
        battleAtomicMass:{type: Number, default: 3},
        battleCategory:{type: Number, default: 3},

        battleElementNameEndlessHS:{type: Number, default: 0},
        battleAtomicNumberEndlessHS:{type: Number, default: 0},
        battleAtomicMassEndlessHS:{type: Number, default: 0},
        battleCategoryEndlessHS:{type: Number, default: 0},

        mixDash:{type: Number, default: 3},

        coins: {type: Number, default: 0},

        isVerified: {type: Boolean, default: false, required: true, }
    },
    { collection: 'UserData' }
)


const model = mongoose.model('UserData', UserData)

module.exports = model

//electronConfigPoints: {type: Number, default: 0},
//electronConfigAtomicNumber: {type: Array},