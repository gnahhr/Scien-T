const mongoose = require('mongoose')

const BattleAtomicMassEndlessRankings = new mongoose.Schema(
    {
        username: {type: String},
        points: {type: Number, default: 0},
    },
    { collection: 'BattleAtomicMassEndlessRankings' }
)

const model = mongoose.model('BattleAtomicMassEndlessRankings', BattleAtomicMassEndlessRankings)

module.exports = model