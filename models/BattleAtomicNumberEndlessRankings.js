const mongoose = require('mongoose')

const BattleAtomicNumberEndlessRankings = new mongoose.Schema(
    {
        username: {type: String},
        points: {type: Number, default: 0},
    },
    { collection: 'BattleAtomicNumberEndlessRankings' }
)

const model = mongoose.model('BattleAtomicNumberEndlessRankings', BattleAtomicNumberEndlessRankings)

module.exports = model