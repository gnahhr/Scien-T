const express = require ('express')
const { get } = require('mongoose')
const router = express.Router()

const { mixElements, getME, electronConfiguration, getEC, intelliment, getIntellimentRankings, getElectronConfigRankings, getIntellimentData, getIntellimentCounter, getUserProgTestBattle, testBattle, buyTestBattleStage, getTestBattleRankings, mixDash, buyMixDashStage, getUserProgMixDash, getCoins, saveCharacter, getCharacter, getCharacterHit, buyAccessories, getAccessoriesOwned
} = require('../controllers/general')

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


//BATTLE
router.route('/testBattle/:access/:username/:topic/:stage').post(testBattle)
router.route('/buyTestBattleStage/:access/:topic').post(buyTestBattleStage)
router.route('/userProgTestBattle/:access/:topic').get(getUserProgTestBattle)

//MIXDASH
router.route('/mixDash/:access').post(mixDash)
router.route('/buyMixDashStage/:access').post(buyMixDashStage)
router.route('/userProgMixDash/:access').get(getUserProgMixDash)



//RANKINGS
router.route('/getIntellimentRankings/:difficulty').get(getIntellimentRankings)//get overall rankings of Intelliment
router.route('/getElectronConfigRankings').get(getElectronConfigRankings)//get overall rankings of Electron Configuration
router.route('/getTestBattleRankings/:topic').get(getTestBattleRankings)

//Shop
router.route('/getCoins/:access').get(getCoins)
router.route('/getAccessoriesOwned/:access').get(getAccessoriesOwned)
router.route('/buyAccessories/:access').post(buyAccessories)



//
router.route('/saveCharacter/:access/:gender').post(saveCharacter)
router.route('/getCharacter/:access/:gender').get(getCharacter)
router.route('/getCharacterHit/:access/:gender').get(getCharacterHit)





module.exports = router


