const express = require ('express')
const router = express.Router()

const { mixElements, getME, electronConfiguration, getEC, intelliment, getIntellimentRankings, getElectronConfigRankings, getIntellimentData, getIntellimentCounter} = require('../controllers/general')

//MIXING TABLE
router.route('/mixElements').post(mixElements)// route for posting data from Mixing Table
router.route('/userProgME/:access').get(getME)// get user's data on Mixing Table

//ELECTRON CONFIGURATION
router.route('/electronConfiguration').post(electronConfiguration)// route for posting data from Electron Configuration
router.route('/userProgEC/:access').get(getEC)// get user's data on Electron Configuration

//INTELLIMENT
router.route('/intelliment').post(intelliment)// route for posting data from Intelliment
router.route('/getIntellimentData/:access/:difficulty').get(getIntellimentData)//get user's data on Intelliment
router.route('/getIntellimentCounter/:access/:difficulty').get(getIntellimentCounter)//get user's data on Intelliment



//RANKINGS
router.route('/getIntellimentRankings/:difficulty').get(getIntellimentRankings)//get overall rankings of Intelliment
router.route('/getElectronConfigRankings').get(getElectronConfigRankings)//get overall rankings of Electron Configuration


module.exports = router


