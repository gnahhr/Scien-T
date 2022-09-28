const express = require ('express')
const router = express.Router()

const { mixElements, getME, electronConfiguration, getEC, intelliment, getIntellimentRankings, getElectronConfigRankings, getIntellimentData, getIntellimentCounter} = require('../controllers/general')

router.route('/mixElements').post(mixElements)

router.route('/electronConfiguration').post(electronConfiguration)

router.route('/userProgEC/:access').get(getEC)

router.route('/intelliment').post(intelliment)

router.route('/userProgME/:access').get(getME)

router.route('/getIntellimentRankings/:difficulty').get(getIntellimentRankings)//rankings for intelliment || will modify later

router.route('/getElectronConfigRankings').get(getElectronConfigRankings)

router.route('/getIntellimentData/:access/:difficulty').get(getIntellimentData)

router.route('/getIntellimentCounter/:access/:difficulty').get(getIntellimentCounter)

module.exports = router


//arrOTP, setArrOTP