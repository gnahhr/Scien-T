const express = require ('express')
const router = express.Router()

const { mixElements, getME, electronConfiguration, intelliment} = require('../controllers/general')

router.route('/mixElements').post(mixElements)

router.route('/electronConfiguration').post(electronConfiguration)

router.route('/intelliment').post(intelliment)

router.route('/userProgME').get(getME)

module.exports = router