const mongoose = require('mongoose')

const IntellimentEasyRankings = new mongoose.Schema(
    {
        username: {type: String},
        points: {type: Number, default: 0},
    },
    { collection: 'IntellimentEasyRankings' }
)

const model = mongoose.model('IntellimentEasyRankings', IntellimentEasyRankings)

module.exports = model