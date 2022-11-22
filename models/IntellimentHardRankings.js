const mongoose = require('mongoose')

const IntellimentHardRankings = new mongoose.Schema(
    {
        username: {type: String},
        points: {type: Number, default: 0},
    },
    { collection: 'IntellimentHardRankings' }
)

const model = mongoose.model('IntellimentHardRankings', IntellimentHardRankings)

module.exports = model