const mongoose = require('mongoose')

const BattleElementNameEndlessRankings = new mongoose.Schema(
    {
        username: {type: String},
        points: {type: Number, default: 0},
    },
    { collection: 'BattleElementNameEndlessRankings' }
)

const model = mongoose.model('BattleElementNameEndlessRankings', BattleElementNameEndlessRankings)

module.exports = model