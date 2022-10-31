const mongoose = require('mongoose')

const BattleCategoryEndlessRankings = new mongoose.Schema(
    {
        username: {type: String},
        points: {type: Number, default: 0},
    },
    { collection: 'BattleCategoryEndlessRankings' }
)

const model = mongoose.model('BattleCategoryEndlessRankings', BattleCategoryEndlessRankings)

module.exports = model