const mongoose = require('mongoose')

const IntellimentNormalRankings = new mongoose.Schema(
    {
        username: {type: String},
        points: {type: Number, default: 0},
    },
    { collection: 'IntellimentNormalRankings' }
)

const model = mongoose.model('IntellimentNormalRankings', IntellimentNormalRankings)

module.exports = model