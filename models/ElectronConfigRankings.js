const mongoose = require('mongoose')

const ElectronConfigRankings = new mongoose.Schema(
    {
        username: {type: String},
        points: {type: Number, default: 0},
    },
    { collection: 'ElectronConfigRankings' }
)

const model = mongoose.model('ElectronConfigRankings', ElectronConfigRankings)

module.exports = model