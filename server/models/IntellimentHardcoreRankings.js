const mongoose = require('mongoose')

const IntellimentHardcoreRankings = new mongoose.Schema(
    {
        username: {type: String},
        points: {type: Number, default: 0},
    },
    { collection: 'IntellimentHardcoreRankings' }
)

const model = mongoose.model('IntellimentHardcoreRankings', IntellimentHardcoreRankings)

module.exports = model